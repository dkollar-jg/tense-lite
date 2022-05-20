package com.jahnelgroup.tenselite.security

import com.jahnelgroup.tenselite.service.UserService
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service

@Service
class CustomUserDetailsService(
    val userService: UserService
): UserDetailsService {
    override fun loadUserByUsername(email: String): UserDetails {
        // email serves as username
        val user = userService.findByEmail(email)
        return user?.let { UserPrincipal(user.id, user.firstName, user.lastName, user.email, user.password, user.isAdmin) }!!
    }

    // This method is used by JWTAuthenticationFilter
    fun loadUserById(id: Long): UserDetails {
        val user = userService.findById(id)
        return user?.let { UserPrincipal(user.id, user.firstName, user.lastName, user.email, user.password, user.isAdmin) }
    }
}