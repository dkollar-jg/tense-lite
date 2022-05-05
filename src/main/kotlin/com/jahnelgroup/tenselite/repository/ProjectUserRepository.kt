package com.jahnelgroup.tenselite.repository

import com.jahnelgroup.tenselite.models.ProjectUser
import com.jahnelgroup.tenselite.models.ProjectUserId
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ProjectUserRepository: JpaRepository<ProjectUser, ProjectUserId> {
    fun findByProjectUserIdProjectId(projectId: Long): List<ProjectUser>
    fun findByProjectUserIdUserId(userId: Long): List<ProjectUser>
}