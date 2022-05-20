package com.jahnelgroup.tenselite.security

import org.springframework.context.annotation.Configuration
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
class GlobalMethodWebSecurityConfig: GlobalMethodSecurityConfiguration() {

    override fun createExpressionHandler(): MethodSecurityExpressionHandler {
        val expressionHandler = CustomMethodSecurityExpressionHandler()
        expressionHandler.setPermissionEvaluator(CustomPermissionEvaluator())
        return expressionHandler
    }
}