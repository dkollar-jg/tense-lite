package com.jahnelgroup.tenselite.service

import com.jahnelgroup.tenselite.dtos.CreateProjectUserDto
import com.jahnelgroup.tenselite.dtos.UpdateProjectUserDto
import com.jahnelgroup.tenselite.exceptions.NotFoundException
import com.jahnelgroup.tenselite.models.ProjectUser
import com.jahnelgroup.tenselite.models.ProjectUserId
import com.jahnelgroup.tenselite.repository.ProjectUserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

interface ProjectUserService {
    fun findById(projectUserId: ProjectUserId): ProjectUser
    fun findByProjectId(projectId: Long): List<ProjectUser>
    fun findByUserId(userId: Long): List<ProjectUser>
    fun create(createProjectUserDto: CreateProjectUserDto): ProjectUser
    fun update(projectUser: UpdateProjectUserDto, projectUserId: ProjectUserId): ProjectUser
    fun delete(projectUserId: ProjectUserId)
}

@Service
class ProjectUserServiceImpl(
    val projectUserRepository: ProjectUserRepository
): ProjectUserService {
    override fun findById(projectUserId: ProjectUserId): ProjectUser {
        return projectUserRepository.findByIdOrNull(projectUserId) ?: throw NotFoundException("ProjectUser with projectId ${projectUserId.projectId} and userId ${projectUserId.userId} does not exist.")
    }

    override fun findByProjectId(projectId: Long): List<ProjectUser> {
        return projectUserRepository.findByProjectUserIdProjectId(projectId)
    }

    override fun findByUserId(userId: Long): List<ProjectUser> {
        return projectUserRepository.findByProjectUserIdUserId(userId)
    }

    override fun create(createProjectUserDto: CreateProjectUserDto): ProjectUser {
        val projectUser = ProjectUser(
            ProjectUserId(createProjectUserDto.projectId, createProjectUserDto.userId),
            createProjectUserDto.hourlyRate,
            createProjectUserDto.startDate,
            createProjectUserDto.endDate,
        )
        return projectUserRepository.save(projectUser)
    }

    override fun update(projectUser: UpdateProjectUserDto, projectUserId: ProjectUserId): ProjectUser {
        val originalProjectUser = projectUserRepository.findByIdOrNull(projectUserId) ?: throw NotFoundException("ProjectUser with projectId ${projectUserId.projectId} and userId ${projectUserId.userId} does not exist.")

        projectUser.startDate?.also { originalProjectUser.startDate = it }
        projectUser.endDate?.also { originalProjectUser.endDate = it }
        projectUser.hourlyRate?.also { originalProjectUser.hourlyRate = it }
        projectUser.enabled?.also { originalProjectUser.enabled = it }

        return projectUserRepository.save(originalProjectUser)
    }

    override fun delete(projectUserId: ProjectUserId) {
        projectUserRepository.findByIdOrNull(projectUserId) ?: throw NotFoundException("ProjectUser with projectId ${projectUserId.projectId} and userId ${projectUserId.userId} does not exist.")
        projectUserRepository.deleteById(projectUserId)
    }
}
