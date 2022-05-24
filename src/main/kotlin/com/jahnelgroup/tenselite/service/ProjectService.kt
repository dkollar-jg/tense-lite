package com.jahnelgroup.tenselite.service

import com.jahnelgroup.tenselite.dtos.UpdateProjectDto
import com.jahnelgroup.tenselite.exceptions.NotFoundException
import com.jahnelgroup.tenselite.models.Project
import com.jahnelgroup.tenselite.repository.ProjectRepository
import com.jahnelgroup.tenselite.repository.ProjectUserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import javax.transaction.Transactional

interface ProjectService {
    fun findAll(): List<Project>
    fun findById(id: Long): Project
    fun create(project: Project): Project
    fun update(project: UpdateProjectDto, id: Long): Project
    fun delete(id: Long)
}

@Service
class ProjectServiceImpl(
    val projectRepository: ProjectRepository,
    val projectUserRepository: ProjectUserRepository,
) : ProjectService {
    override fun findAll(): List<Project> {
        return projectRepository.findAll()
    }

    override fun findById(id: Long): Project {
        return projectRepository.findByIdOrNull(id) ?: throw NotFoundException("Project with $id does not exist.")
    }

    override fun create(project: Project): Project {
        return projectRepository.save(project)
    }

    @Transactional
    override fun update(project: UpdateProjectDto, id: Long): Project {
        val originalProject =
            projectRepository.findByIdOrNull(id) ?: throw NotFoundException("Project with id $id does not exist.")

        val isDeactivating = project.enabled == false && originalProject.enabled

        project.name?.also { originalProject.name = it }
        project.isBillable?.also { originalProject.isBillable = it }
        project.startDate?.also { originalProject.startDate = it }
        project.endDate?.also { originalProject.endDate = it }
        project.enabled?.also { originalProject.enabled = it }

        val p = projectRepository.save(originalProject)
        // If Project is deactivating then deactivate all associated Project Users
        if (isDeactivating) {
            this.projectUserRepository.deactivateByProjectId(p.id)
        }
        return p
    }

    override fun delete(id: Long) {
        projectRepository.findByIdOrNull(id) ?: throw NotFoundException("Project with id $id does not exist")
        projectRepository.deleteById(id)
    }
}
