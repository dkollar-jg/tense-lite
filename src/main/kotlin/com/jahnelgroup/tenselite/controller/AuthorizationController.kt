package com.jahnelgroup.tenselite.controller

import com.jahnelgroup.tenselite.models.User
import com.jahnelgroup.tenselite.service.UserService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

//@RestController
//@RequestMapping("/auth/{email}")
//class AuthorizationController(
//    val userService: UserService
//) {
//
//    @GetMapping
//    fun getAuthenticatedUser(
//        @PathVariable(value = "email") email: String
//    ): User {
//        val users = userService.findByEmail(email)
//        var user: User = if (users.size == 1) {
//            users.first()
//        } else {
//            userService.create(User(null, null, null, email, null))
//        }
//        return user
//    }
//}