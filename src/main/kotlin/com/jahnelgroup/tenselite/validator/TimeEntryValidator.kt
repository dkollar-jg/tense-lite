package com.jahnelgroup.tenselite.validator

import com.jahnelgroup.tenselite.models.ProjectUserId
import com.jahnelgroup.tenselite.models.TimeEntry
import com.jahnelgroup.tenselite.security.UserContextService
import com.jahnelgroup.tenselite.service.ProjectUserService
import org.springframework.stereotype.Component

@Component
class TimeEntryValidator(
    val projectUserService: ProjectUserService,
    val userContextService: UserContextService
) {
    fun validate(timeEntry: TimeEntry) {
        val currentUser = this.userContextService.currentUser()
        if (currentUser != null) {
            // Throw error when Time Entry is not for current User and User is not admin
            if (currentUser.id != timeEntry.userId && !currentUser.isAdmin) {
                throw RuntimeException("User does not have permission to perform this action")
            }
        } else {
            throw RuntimeException("User does not have permission to perform this action")
        }

        val projectUser = timeEntry.projectId?.let { this.projectUserService.findById(ProjectUserId(timeEntry.projectId, timeEntry.userId)) }
        // Throw error when User is not assigned to Project
        if (projectUser == null || !projectUser.enabled!!) {
            throw RuntimeException("User is not currently assigned to the Project")
        }
    }
}