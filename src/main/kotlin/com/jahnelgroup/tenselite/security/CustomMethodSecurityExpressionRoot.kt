package com.jahnelgroup.tenselite.security

import org.springframework.security.access.expression.SecurityExpressionRoot
import org.springframework.security.access.expression.method.MethodSecurityExpressionOperations
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder

class CustomMethodSecurityExpressionRoot(
    authentication: Authentication
): SecurityExpressionRoot(authentication), MethodSecurityExpressionOperations {

    fun isAdmin(): Boolean {
        val principal = SecurityContextHolder.getContext().authentication.principal
        return if (principal is UserPrincipal) (SecurityContextHolder.getContext().authentication.principal as UserPrincipal).isAdmin else false
    }

    override fun setFilterObject(filterObject: Any?) {
        TODO("Not yet implemented")
    }

    override fun getFilterObject(): Any {
        TODO("Not yet implemented")
    }

    override fun setReturnObject(returnObject: Any?) {
        TODO("Not yet implemented")
    }

    override fun getReturnObject(): Any {
        TODO("Not yet implemented")
    }

    override fun getThis(): Any {
        TODO("Not yet implemented")
    }
}
