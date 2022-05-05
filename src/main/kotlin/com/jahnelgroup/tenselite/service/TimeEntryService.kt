package com.jahnelgroup.tenselite.service

import com.jahnelgroup.tenselite.dtos.UpdateTimeEntryDto
import com.jahnelgroup.tenselite.exceptions.NotFoundException
import com.jahnelgroup.tenselite.models.ProjectUserId
import com.jahnelgroup.tenselite.models.TimeEntry
import com.jahnelgroup.tenselite.repository.TimeEntryRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

interface TimeEntryService {
    fun findAll(): List<TimeEntry>
    fun findByUserId(userId: Long): List<TimeEntry>
    fun findByProjectId(projectId: Long): List<TimeEntry>
    fun findById(id: Long): TimeEntry
    fun create(timeEntry: TimeEntry): TimeEntry
    fun update(timeEntry: UpdateTimeEntryDto, id: Long): TimeEntry
    fun delete(id: Long)
}

@Service
class TimeEntryServiceImpl(
    val projectUserService: ProjectUserService,
    val timeEntryRepository: TimeEntryRepository
): TimeEntryService {
    override fun findAll(): List<TimeEntry> {
        return timeEntryRepository.findAll()
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
        val projectUser = projectUserService.findById(ProjectUserId(timeEntry.projectId, timeEntry.userId))
        timeEntry.hourlyRate = projectUser.hourlyRate
        timeEntry.entryDollarValue = timeEntry.hourlyRate?.let { timeEntry.hours?.times(it) }
        return timeEntryRepository.save(timeEntry)
    }

    override fun update(timeEntry: UpdateTimeEntryDto, id: Long): TimeEntry {
        val originalTimeEntry = timeEntryRepository.findByIdOrNull(id) ?: throw NotFoundException("TimeEntry with id $id does not exist.")

        timeEntry.projectId?.also { originalTimeEntry.projectId = it }
        timeEntry.entryDate?.also { originalTimeEntry.entryDate = it }
        timeEntry.entryNotes?.also { originalTimeEntry.entryNotes = it }
        timeEntry.hours?.also { originalTimeEntry.hours = it }
        originalTimeEntry.entryDollarValue = originalTimeEntry.hourlyRate?.let { originalTimeEntry.hours?.times(it) }

        return timeEntryRepository.save(originalTimeEntry)
    }

    override fun delete(id: Long) {
        timeEntryRepository.findByIdOrNull(id) ?: throw NotFoundException("TimeEntry with id $id does not exist")
        timeEntryRepository.deleteById(id)
    }
}
