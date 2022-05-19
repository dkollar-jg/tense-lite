package com.jahnelgroup.tenselite.controller

import com.jahnelgroup.tenselite.dtos.UpdateTimeEntryDto
import com.jahnelgroup.tenselite.models.TimeEntry
import com.jahnelgroup.tenselite.service.TimeEntryService
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController
@RequestMapping("/api/time-entries")
@Validated
class TimeEntryController(
    val timeEntryService: TimeEntryService
) {

    @GetMapping
    fun findAll(): List<TimeEntry> {
        return timeEntryService.findAll()
    }

    @GetMapping("/users/{userId}")
    fun findByUserId(
        @PathVariable(value = "userId") userId: Long
    ): List<TimeEntry> {
        return timeEntryService.findByUserId(userId)
    }

    @GetMapping("/projects/{projectId}")
    fun findByProjectId(
        @PathVariable(value = "projectId") projectId: Long
    ): List<TimeEntry> {
        return timeEntryService.findByProjectId(projectId)
    }

    @GetMapping("/{id}")
    fun findById(
        @PathVariable(value = "id") id: Long
    ): TimeEntry {
        return timeEntryService.findById(id)
    }

    @PostMapping
    fun create(
        @Valid @RequestBody project: TimeEntry
    ): TimeEntry {
        return timeEntryService.create(project)
    }

    @PatchMapping("/{id}")
    fun update(
        @PathVariable(value = "id") id: Long,
        @Valid @RequestBody project: UpdateTimeEntryDto,
    ): TimeEntry {
        return timeEntryService.update(project, id)
    }

    @DeleteMapping("/{id}")
    fun delete(@PathVariable(value = "id") id: Long): ResponseEntity<Boolean> {
        timeEntryService.delete(id)
        return ResponseEntity.ok().build()
    }
}
