package com.jahnelgroup.tenselite.repository

import com.jahnelgroup.tenselite.models.ProjectUser
import com.jahnelgroup.tenselite.models.ProjectUserId
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface ProjectUserRepository: JpaRepository<ProjectUser, ProjectUserId> {
    fun findByProjectUserIdProjectId(projectId: Long): List<ProjectUser>
    fun findByProjectUserIdUserId(userId: Long): List<ProjectUser>

    @Modifying
    @Query("UPDATE ProjectUser pu SET pu.enabled = false WHERE pu.projectUserId.userId = ?1")
    fun deactivateByUserId(userId: Long)

    @Modifying
    @Query("UPDATE ProjectUser pu SET pu.enabled = false WHERE pu.projectUserId.projectId = ?1")
    fun deactivateByProjectId(projectId: Long)
}