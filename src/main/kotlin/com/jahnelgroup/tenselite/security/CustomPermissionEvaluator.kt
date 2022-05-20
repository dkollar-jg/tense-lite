package com.jahnelgroup.tenselite.security

import org.springframework.security.access.PermissionEvaluator
import org.springframework.security.core.Authentication
import java.io.Serializable
import java.util.*

class CustomPermissionEvaluator: PermissionEvaluator {
    override fun hasPermission(authentication: Authentication?, targetDomainObject: Any?, permission: Any?): Boolean {
        if ((authentication == null) || (targetDomainObject == null) || permission !is String) {
            return false
        }
        val targetType = targetDomainObject.javaClass.simpleName.uppercase(Locale.getDefault())
        return hasPrivilege(authentication, targetType.uppercase(Locale.getDefault()),
            permission.toString().uppercase(Locale.getDefault())
        )
    }

    override fun hasPermission(
        authentication: Authentication?,
        targetId: Serializable?,
        targetType: String?,
        permission: Any?
    ): Boolean {
        if ((authentication == null) || (targetType == null) || permission !is String) {
            return false
        }
        return hasPrivilege(authentication, targetType.uppercase(Locale.getDefault()),
            permission.toString().uppercase(Locale.getDefault())
        )
    }

    private fun hasPrivilege(authentication: Authentication, targetType: String, permission: String): Boolean {
        for (authority in authentication.authorities) {
            if (authority.authority.startsWith(targetType) && authority.authority.contains(permission)) {
                return true
            }
        }
        return false
    }
}