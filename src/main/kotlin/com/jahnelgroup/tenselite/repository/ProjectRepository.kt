package com.jahnelgroup.tenselite.repository

import com.jahnelgroup.tenselite.models.Project
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ProjectRepository: JpaRepository<Project, Long> {}