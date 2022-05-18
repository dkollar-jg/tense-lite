package com.jahnelgroup.tenselite.service

import com.jahnelgroup.tenselite.dtos.UpdateUserDto
import com.jahnelgroup.tenselite.exceptions.NotFoundException
import com.jahnelgroup.tenselite.models.User
import com.jahnelgroup.tenselite.repository.UserRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

interface UserService {
    fun findAll(): List<User>
    fun findById(id: Int): User
    fun create(user: User): User
    fun update(user: UpdateUserDto, id: Int): User
    fun delete(id: Int)
    fun save(user: User): User
    fun findByEmail(email: String): User?
    fun getById(id: Int): User
}

@Service
class UserServiceImpl(
    val userRepository: UserRepository
): UserService {
    override fun findAll(): List<User> {
        return userRepository.findAll()
    }

    override fun findById(id: Int): User {
        return userRepository.findByIdOrNull(id) ?: throw NotFoundException("User with id $id does not exist.")
    }

//    override fun findByEmail(email: String): List<User> {
//        val users = userRepository.findByEmail(email)
//        if (users.size > 1) throw RuntimeException("Duplicate user email.")
//        return users
//    }

    override fun create(user: User): User {
        return userRepository.save(user)
    }

    override fun update(user: UpdateUserDto, id: Int): User {
        val originalUser = userRepository.findByIdOrNull(id) ?: throw NotFoundException("User with id $id does not exist.")

        user.firstName?.also { originalUser.firstName = it }
        user.lastName?.also { originalUser.lastName = it }
//        user.isAdmin?.also {originalUser.isAdmin = it }

        return userRepository.save(originalUser)
    }

    override fun delete(id: Int) {
        userRepository.findByIdOrNull(id) ?: throw NotFoundException("User with id $id does not exist.")
        userRepository.deleteById(id)
    }

    override fun save(user: User): User {
        return this.userRepository.save(user)
    }

    override fun findByEmail(email: String): User? {
        return this.userRepository.findByEmail(email)
    }

    override fun getById(id: Int): User {
        return this.userRepository.findById(id).get()
    }
}
