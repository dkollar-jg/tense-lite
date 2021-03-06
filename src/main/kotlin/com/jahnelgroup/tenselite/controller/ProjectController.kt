package com.jahnelgroup.tenselite.controller

import com.jahnelgroup.tenselite.dtos.UpdateProjectDto
import com.jahnelgroup.tenselite.models.Project
import com.jahnelgroup.tenselite.service.ProjectService
import com.jahnelgroup.tenselite.service.ProjectUserService
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController
@RequestMapping("/api/projects")
@Validated
class ProjectController(
    val projectService: ProjectService,
    val projectUserService: ProjectUserService
) {

    @GetMapping
    fun findAll(): List<Project> {
        return projectService.findAll()
    }

    @GetMapping("/{id}")
    fun findById(
        @PathVariable(value = "id") id: Long
    ): Project {
        return projectService.findById(id)
    }

    @PostMapping
    @PreAuthorize("isAdmin()")
    fun create(
        @Valid @RequestBody project: Project
    ): Project {
        return projectService.create(project)
    }

    @PatchMapping("/{id}")
    @PreAuthorize("isAdmin()")
    fun update(
        @PathVariable(value = "id") id: Long,
        @Valid @RequestBody project: UpdateProjectDto,
    ): Project {
        return projectService.update(project, id)
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAdmin()")
    fun delete(
        @PathVariable(value = "id") id: Long
    ): ResponseEntity<Boolean> {
        projectService.delete(id)
        return ResponseEntity.ok().build()
    }
}
