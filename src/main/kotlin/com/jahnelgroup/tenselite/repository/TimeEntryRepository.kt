package com.jahnelgroup.tenselite.repository

import com.jahnelgroup.tenselite.models.TimeEntry
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TimeEntryRepository: JpaRepository<TimeEntry, Long> {
    fun findByUserId(userId: Long): List<TimeEntry>
    fun findByProjectId(projectId: Long): List<TimeEntry>
}