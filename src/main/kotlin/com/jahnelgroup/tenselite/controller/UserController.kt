package com.jahnelgroup.tenselite.controller

import com.jahnelgroup.tenselite.dtos.CreateUserDto
import com.jahnelgroup.tenselite.dtos.Message
import com.jahnelgroup.tenselite.dtos.UpdateUserDto
import com.jahnelgroup.tenselite.models.User
import com.jahnelgroup.tenselite.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController
@RequestMapping("/api/users")
@Validated
class UserController(
    val userService: UserService
) {

    @GetMapping
    fun findAll(): List<User> {
        return userService.findAll()
    }

    @GetMapping("/{id}")
    fun findById(
        @PathVariable(value = "id") id: Long
    ): User {
        return userService.findById(id)
    }

    @PostMapping
    fun create(
        @Valid @RequestBody createUserDto: CreateUserDto
    ): ResponseEntity<Any> {
        val existingUser = userService.findByEmail(createUserDto.email)
        if (existingUser != null) {
            return ResponseEntity.badRequest().body(Message("user with email '${createUserDto.email}' already exists!"))
        }

        val user = User()
        user.firstName = createUserDto.firstName
        user.lastName = createUserDto.lastName
        user.email = createUserDto.email
        return ResponseEntity.ok(userService.create(user))
    }

    @PatchMapping("/{id}")
    fun update(
        @PathVariable(value = "id") id: Long,
        @Valid @RequestBody user: UpdateUserDto,
    ): ResponseEntity<Any> {
        if (user.email != null) {
            val existingUser = user.email?.let { userService.findByEmail(it) }
            if (existingUser != null && existingUser.id != id) {
                return ResponseEntity.badRequest().body(Message("user with email '${user.email}' already exists!"))
            }
        }
        return ResponseEntity.ok(userService.update(user, id))
    }

    @DeleteMapping("/{id}")
    fun delete(
        @PathVariable(value = "id") id: Long
    ): ResponseEntity<Boolean> {
        userService.delete(id)
        return ResponseEntity.ok().build()
    }
}
