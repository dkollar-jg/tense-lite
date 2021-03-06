package com.jahnelgroup.tenselite.security

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service

@Service
class UserContextService {

    fun currentUser(): UserPrincipal? {
        val principal = SecurityContextHolder.getContext().authentication.principal
        return if (principal is UserPrincipal) (SecurityContextHolder.getContext().authentication.principal as UserPrincipal) else null
    }
}
