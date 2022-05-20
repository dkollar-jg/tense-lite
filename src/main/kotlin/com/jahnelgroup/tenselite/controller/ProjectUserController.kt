package com.jahnelgroup.tenselite.controller

import com.jahnelgroup.tenselite.dtos.CreateProjectUserDto
import com.jahnelgroup.tenselite.dtos.UpdateProjectUserDto
import com.jahnelgroup.tenselite.dtos.UpdateUserDto
import com.jahnelgroup.tenselite.models.Project
import com.jahnelgroup.tenselite.models.ProjectUser
import com.jahnelgroup.tenselite.models.ProjectUserId
import com.jahnelgroup.tenselite.models.User
import com.jahnelgroup.tenselite.service.ProjectUserService
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController
@RequestMapping("/api")
@Validated
class ProjectUserController(
    val projectUserService: ProjectUserService
) {

    @GetMapping("/projects/{projectId}/users/{userId}")
    fun findProjectUser(
        @PathVariable(value = "projectId") projectId: Long,
        @PathVariable(value = "userId") userId: Long
    ): ProjectUser {
        return projectUserService.findById(ProjectUserId(projectId, userId))
    }

    @GetMapping("/projects/{projectId}/users")
    fun findProjectUsersByProject(
        @PathVariable(value = "projectId") projectId: Long
    ): List<ProjectUser> {
        return projectUserService.findByProjectId(projectId)
    }

    @GetMapping("/users/{userId}/projects")
    fun findProjectUsersByUser(
        @PathVariable(value = "userId") userId: Long
    ): List<ProjectUser> {
        return projectUserService.findByUserId(userId)
    }

    @PostMapping("/projects/{projectId}/users/{userId}")
    @PreAuthorize("isAdmin()")
    fun createProjectUser(
        @PathVariable(value = "projectId") projectId: Long,
        @PathVariable(value = "userId") userId: Long,
        @Valid @RequestBody projectUser: CreateProjectUserDto
    ): ProjectUser {
        return projectUserService.create(projectUser)
    }

    @PatchMapping("/projects/{projectId}/users/{userId}")
    @PreAuthorize("isAdmin()")
    fun update(
        @PathVariable(value = "projectId") projectId: Long,
        @PathVariable(value = "userId") userId: Long,
        @Valid @RequestBody projectUser: UpdateProjectUserDto,
    ): ProjectUser {
        return projectUserService.update(projectUser, ProjectUserId(projectId, userId))
    }

    @DeleteMapping("/projects/{projectId}/users/{userId}")
    @PreAuthorize("isAdmin()")
    fun deleteProjectUser(
        @PathVariable(value = "projectId") projectId: Long,
        @PathVariable(value = "userId") userId: Long
    ): ResponseEntity<Boolean> {
        projectUserService.delete(ProjectUserId(projectId, userId))
        return ResponseEntity.ok().build()
    }
}