package com.jahnelgroup.tenselite.repository

import com.jahnelgroup.tenselite.models.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository: JpaRepository<User, Int> {
    fun findByEmail(email: String): User?
}