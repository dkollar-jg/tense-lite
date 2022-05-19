package com.jahnelgroup.tenselite.security

import com.jahnelgroup.tenselite.models.User

data class JwtAuthenticationResponse(
    val accessToken: String,
    val user: User
) {
    val tokenType: String
        get() = "Bearer"
}