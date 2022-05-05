package com.jahnelgroup.tenselite.service

import com.jahnelgroup.tenselite.dtos.UpdateProjectDto
import com.jahnelgroup.tenselite.exceptions.NotFoundException
import com.jahnelgroup.tenselite.models.Project
import com.jahnelgroup.tenselite.repository.ProjectRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

interface ProjectService {
    fun findAll(): List<Project>
    fun findById(id: Long): Project
    fun create(project: Project): Project
    fun update(project: UpdateProjectDto, id: Long): Project
    fun delete(id: Long)
}

@Service
class ProjectServiceImpl(
    val projectRepository: ProjectRepository
): ProjectService {
    override fun findAll(): List<Project> {
        return projectRepository.findAll()
    }

    override fun findById(id: Long): Project {
        return projectRepository.findByIdOrNull(id) ?: throw NotFoundException("Project with $id does not exist.")
    }

    override fun create(project: Project): Project {
        return projectRepository.save(project)
    }

    override fun update(project: UpdateProjectDto, id: Long): Project {
        val originalProject = projectRepository.findByIdOrNull(id) ?: throw NotFoundException("Project with id $id does not exist.")

        project.name?.also { originalProject.name = it }
        project.isBillable?.also { originalProject.isBillable = it }
        project.startDate?.also { originalProject.startDate = it }
        project.endDate?.also { originalProject.endDate = it }

        return projectRepository.save(originalProject)
    }

    override fun delete(id: Long) {
        projectRepository.findByIdOrNull(id) ?: throw NotFoundException("Project with id $id does not exist")
        projectRepository.deleteById(id)
    }
}
