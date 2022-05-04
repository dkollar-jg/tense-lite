package com.jahnelgroup.tenselite.service

import com.jahnelgroup.tenselite.dtos.UpdateUserDto
import com.jahnelgroup.tenselite.exceptions.UserNotFoundException
import com.jahnelgroup.tenselite.models.User
import com.jahnelgroup.tenselite.repository.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

interface UserService {
    fun findAll(): List<User>
    fun findById(id: Long): User
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
        return userRepository.findByIdOrNull(id) ?: throw UserNotFoundException("User with id $id does not exist.")
    }

    override fun create(user: User): User {
        return userRepository.save(user)
    }

    override fun update(user: UpdateUserDto, id: Long): User {
        val originalUser = userRepository.findByIdOrNull(id) ?: throw UserNotFoundException("User with id $id does not exist.")

        user.username?.also { originalUser.username = it }
        user.firstName?.also { originalUser.firstName = it }
        user.lastName?.also { originalUser.lastName = it }
        user.email?.also { originalUser.email = it }
        user.isAdmin?.also {originalUser.isAdmin = it }

        return userRepository.save(originalUser)
    }

    override fun delete(id: Long) {
        userRepository.findByIdOrNull(id) ?: throw UserNotFoundException("User with id $id does not exist.")
        userRepository.deleteById(id)
    }
}
