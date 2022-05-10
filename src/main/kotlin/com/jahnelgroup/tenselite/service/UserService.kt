package com.jahnelgroup.tenselite.service

import com.jahnelgroup.tenselite.dtos.UpdateUserDto
import com.jahnelgroup.tenselite.exceptions.NotFoundException
import com.jahnelgroup.tenselite.models.User
import com.jahnelgroup.tenselite.repository.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.client.HttpClientErrorException

interface UserService {
    fun findAll(): List<User>
    fun findById(id: Long): User
    fun findByEmail(email: String): List<User>
    fun create(user: User): User
    fun update(user: UpdateUserDto, id: Long): User
    fun delete(id: Long)
}

@Service
class UserServiceImpl(
    val userRepository: UserRepository
): UserService {
    override fun findAll(): List<User> {
        return userRepository.findAll()
    }

    override fun findById(id: Long): User {
        return userRepository.findByIdOrNull(id) ?: throw NotFoundException("User with id $id does not exist.")
    }

    override fun findByEmail(email: String): List<User> {
        val users = userRepository.findByEmail(email)
        if (users.size > 1) throw RuntimeException("Duplicate user email.")
        return users
    }

    override fun create(user: User): User {
        return userRepository.save(user)
    }

    override fun update(user: UpdateUserDto, id: Long): User {
        val originalUser = userRepository.findByIdOrNull(id) ?: throw NotFoundException("User with id $id does not exist.")

        user.firstName?.also { originalUser.firstName = it }
        user.lastName?.also { originalUser.lastName = it }
        user.isAdmin?.also {originalUser.isAdmin = it }

        return userRepository.save(originalUser)
    }

    override fun delete(id: Long) {
        userRepository.findByIdOrNull(id) ?: throw NotFoundException("User with id $id does not exist.")
        userRepository.deleteById(id)
    }
}
