package com.jahnelgroup.tenselite.service

import com.jahnelgroup.tenselite.dtos.TimeEntryCriteria
import com.jahnelgroup.tenselite.dtos.UpdateTimeEntryDto
import com.jahnelgroup.tenselite.exceptions.NotFoundException
import com.jahnelgroup.tenselite.models.ProjectUserId
import com.jahnelgroup.tenselite.models.TimeEntry
import com.jahnelgroup.tenselite.repository.TimeEntryRepository
import com.jahnelgroup.tenselite.validator.TimeEntryValidator
import org.springframework.data.jpa.domain.Specification
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.util.*
import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.CriteriaQuery
import javax.persistence.criteria.Root

interface TimeEntryService {
    fun findAll(): List<TimeEntry>
    fun findAll(timeEntryCriteria: TimeEntryCriteria): List<TimeEntry>
    fun findByUserId(userId: Long): List<TimeEntry>
    fun findByProjectId(projectId: Long): List<TimeEntry>
    fun findById(id: Long): TimeEntry
    fun create(timeEntry: TimeEntry): TimeEntry
    fun update(timeEntry: UpdateTimeEntryDto, id: Long): TimeEntry
    fun delete(id: Long)
}

@Service
class TimeEntryServiceImpl(
    val projectService: ProjectService,
    val projectUserService: ProjectUserService,
    val timeEntryRepository: TimeEntryRepository,
    val timeEntryValidator: TimeEntryValidator
) : TimeEntryService {
    override fun findAll(): List<TimeEntry> {
        return timeEntryRepository.findAll()
    }

    override fun findAll(timeEntryCriteria: TimeEntryCriteria): List<TimeEntry> {
        return timeEntryRepository.findAll(
            Specification.where(hasUserId(timeEntryCriteria.userId))
                .and(hasProjectId(timeEntryCriteria.projectId))
                .and(entryDateAfter(timeEntryCriteria.startDate))
                .and(entryDateBefore(timeEntryCriteria.endDate))
                .and(entryNotesContains(timeEntryCriteria.entryNotes))
                .and(hasEnabled(timeEntryCriteria.enabled))
        )
    }

    override fun findByUserId(userId: Long): List<TimeEntry> {
        return timeEntryRepository.findByUserId(userId)
    }

    override fun findByProjectId(projectId: Long): List<TimeEntry> {
        return timeEntryRepository.findByProjectId(projectId)
    }

    override fun findById(id: Long): TimeEntry {
        return timeEntryRepository.findByIdOrNull(id) ?: throw NotFoundException("TimeEntry with $id does not exist.")
    }

    override fun create(timeEntry: TimeEntry): TimeEntry {
        timeEntryValidator.validate(timeEntry)
        val project = projectService.findById(timeEntry.projectId)
        timeEntry.isBillable = project.isBillable
        val projectUser = projectUserService.findById(ProjectUserId(timeEntry.projectId, timeEntry.userId))
        timeEntry.hourlyRate = projectUser.hourlyRate
        timeEntry.entryDollarValue = timeEntry.hourlyRate
        return timeEntryRepository.save(timeEntry)
    }

    override fun update(timeEntry: UpdateTimeEntryDto, id: Long): TimeEntry {
        val originalTimeEntry =
            timeEntryRepository.findByIdOrNull(id) ?: throw NotFoundException("TimeEntry with id $id does not exist.")

        timeEntry.projectId?.also { originalTimeEntry.projectId = it }
        timeEntry.entryDate?.also { originalTimeEntry.entryDate = it }
        timeEntry.entryNotes?.also { originalTimeEntry.entryNotes = it }
        timeEntry.hours?.also { originalTimeEntry.hours = it }
        originalTimeEntry.entryDollarValue = originalTimeEntry.hourlyRate.times(originalTimeEntry.hours)
        timeEntry.enabled?.also { originalTimeEntry.enabled = it }

        timeEntryValidator.validate(originalTimeEntry)
        return timeEntryRepository.save(originalTimeEntry)
    }

    override fun delete(id: Long) {
        val timeEntry =
            timeEntryRepository.findByIdOrNull(id) ?: throw NotFoundException("TimeEntry with id $id does not exist")
        timeEntryValidator.validate(timeEntry)
        timeEntryRepository.deleteById(id)
    }

    fun hasUserId(userId: Long?): Specification<TimeEntry?>? {
        if (userId == null) return null
        return Specification { timeEntry: Root<TimeEntry?>, _: CriteriaQuery<*>?, cb: CriteriaBuilder ->
            cb.equal(
                timeEntry.get<Long>("userId"),
                userId
            )
        }
    }

    fun hasProjectId(projectId: Long?): Specification<TimeEntry?>? {
        if (projectId == null) return null
        return Specification { timeEntry: Root<TimeEntry?>, _: CriteriaQuery<*>?, cb: CriteriaBuilder ->
            cb.equal(
                timeEntry.get<Long>("projectId"),
                projectId
            )
        }
    }

    fun entryDateAfter(startDate: LocalDate?): Specification<TimeEntry?>? {
        if (startDate == null) return null
        return Specification { timeEntry: Root<TimeEntry?>, _: CriteriaQuery<*>?, cb: CriteriaBuilder ->
            cb.greaterThan(
                timeEntry.get("entryDate"),
                startDate
            )
        }
    }

    fun entryDateBefore(endDate: LocalDate?): Specification<TimeEntry?>? {
        if (endDate == null) return null
        return Specification { timeEntry: Root<TimeEntry?>, _: CriteriaQuery<*>?, cb: CriteriaBuilder ->
            cb.lessThan(
                timeEntry.get("entryDate"),
                endDate
            )
        }
    }

    fun entryNotesContains(entryNotes: String?): Specification<TimeEntry?>? {
        if (entryNotes == null) return null
        return Specification { timeEntry: Root<TimeEntry?>, _: CriteriaQuery<*>?, cb: CriteriaBuilder ->
            cb.like(
                timeEntry.get("entryNotes"),
                "%${entryNotes.lowercase(Locale.getDefault())}%"
            )
        }
    }

    fun hasEnabled(enabled: Boolean?): Specification<TimeEntry?>? {
        if (enabled == null) return null
        return Specification { timeEntry: Root<TimeEntry?>, _: CriteriaQuery<*>?, cb: CriteriaBuilder ->
            cb.equal(
                timeEntry.get<Boolean>("enabled"),
                enabled
            )
        }
    }
}
