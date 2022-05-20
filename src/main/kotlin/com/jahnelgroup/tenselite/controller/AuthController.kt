package com.jahnelgroup.tenselite.controller

import com.jahnelgroup.tenselite.dtos.LoginDTO
import com.jahnelgroup.tenselite.dtos.Message
import com.jahnelgroup.tenselite.dtos.RegisterDTO
import com.jahnelgroup.tenselite.models.User
import com.jahnelgroup.tenselite.security.JwtAuthenticationResponse
import com.jahnelgroup.tenselite.security.JwtTokenProvider
import com.jahnelgroup.tenselite.security.UserPrincipal
import com.jahnelgroup.tenselite.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletResponse

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authenticationManager: AuthenticationManager,
    private val jwtTokenProvider: JwtTokenProvider,
    private val userService: UserService
) {

    @PostMapping("register")
    fun register(@RequestBody body: RegisterDTO): ResponseEntity<Any> {
        val existingUser = userService.findByEmail(body.email)
        if (existingUser != null) {
            return ResponseEntity.badRequest().body(Message("user with email '${body.email}' already exists!"))
        }

        val user = User()
        user.firstName = body.firstName
        user.lastName = body.lastName
        user.email = body.email
        user.password = body.password

        return ResponseEntity.ok(this.userService.save(user))
    }

    @PostMapping("/login")
    fun login(@RequestBody body: LoginDTO, response: HttpServletResponse): ResponseEntity<Any> {
        val authentication: Authentication = authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(body.email, body.password)
        )

        SecurityContextHolder.getContext().authentication = authentication

        val userPrincipal = authentication.principal as UserPrincipal
        val user = this.userService.getById(userPrincipal.id)
        val jwt = jwtTokenProvider.generateToken(authentication)

        val cookie = Cookie("jwt", jwt)
        cookie.isHttpOnly = true

        response.addCookie(cookie)

        return ResponseEntity.ok(JwtAuthenticationResponse(jwt, user))
    }
}