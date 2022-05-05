package com.jahnelgroup.tenselite.controller

import com.jahnelgroup.tenselite.dtos.UpdateUserDto
import com.jahnelgroup.tenselite.models.User
import com.jahnelgroup.tenselite.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController
@RequestMapping("/users")
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
        @Valid @RequestBody user: User
    ): User {
        return userService.create(user)
    }

    @PatchMapping("/{id}")
    fun update(
        @PathVariable(value = "id") id: Long,
        @Valid @RequestBody user: UpdateUserDto,
    ): User {
        return userService.update(user, id)
    }

    @DeleteMapping("/{id}")
    fun delete(
        @PathVariable(value = "id") id: Long
    ): ResponseEntity<Boolean> {
        userService.delete(id)
        return ResponseEntity.ok().build()
    }
}
