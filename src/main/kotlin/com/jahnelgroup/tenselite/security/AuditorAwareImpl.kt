package com.jahnelgroup.tenselite.security

import org.springframework.data.domain.AuditorAware
import org.springframework.security.core.context.SecurityContextHolder
import java.util.*

class AuditorAwareImpl(): AuditorAware<Long> {
    override fun getCurrentAuditor(): Optional<Long> {
        val user = SecurityContextHolder.getContext().authentication.principal as UserPrincipal
        return Optional.of(user.id)
    }
}
