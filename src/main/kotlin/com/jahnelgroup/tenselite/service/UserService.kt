package com.jahnelgroup.tenselite.service

import com.jahnelgroup.tenselite.dtos.UpdateUserDto
import com.jahnelgroup.tenselite.exceptions.NotFoundException
import com.jahnelgroup.tenselite.models.User
import com.jahnelgroup.tenselite.repository.ProjectUserRepository
import com.jahnelgroup.tenselite.repository.UserRepository
import org.springframework.beans.factory.annotation.Value
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import javax.transaction.Transactional

interface UserService {
    fun findAll(): List<User>
    fun findById(id: Long): User
    fun create(user: User): User
    fun update(user: UpdateUserDto, id: Long): User
    fun delete(id: Long)
    fun save(user: User): User
    fun findByEmail(email: String): User?
    fun getById(id: Long): User
}

@Service
class UserServiceImpl(
    val projectUserRepository: ProjectUserRepository,
    val userRepository: UserRepository
) : UserService {
    @Value("\${jwt.defaultPassword}")
    private val defaultPassword: String = String()

    override fun findAll(): List<User> {
        return userRepository.findAll()
    }

    override fun findById(id: Long): User {
        return userRepository.findByIdOrNull(id) ?: throw NotFoundException("User with id $id does not exist.")
    }

    override fun create(user: User): User {
        user.password = defaultPassword
        return userRepository.save(user)
    }

    @Transactional
    override fun update(user: UpdateUserDto, id: Long): User {
        val originalUser =
            userRepository.findByIdOrNull(id) ?: throw NotFoundException("User with id $id does not exist.")

        val isDeactivating = user.enabled == false && originalUser.enabled

        user.firstName?.also { originalUser.firstName = it }
        user.lastName?.also { originalUser.lastName = it }
        user.isAdmin?.also { originalUser.isAdmin = it }
        user.enabled?.also { originalUser.enabled = it }

        val u = userRepository.save(originalUser)
        // If User is deactivating then deactivate all associated Project Users
        if (isDeactivating) {
            this.projectUserRepository.deactivateByUserId(u.id)
        }
        return u
    }

    override fun delete(id: Long) {
        userRepository.findByIdOrNull(id) ?: throw NotFoundException("User with id $id does not exist.")
        userRepository.deleteById(id)
    }

    override fun save(user: User): User {
        return this.userRepository.save(user)
    }

    override fun findByEmail(email: String): User? {
        return this.userRepository.findByEmail(email)
    }

    override fun getById(id: Long): User {
        return this.userRepository.findById(id).get()
    }
}
