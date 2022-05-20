package com.jahnelgroup.tenselite.security

import io.jsonwebtoken.*
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component
import java.util.*

@Component
class JwtTokenProvider {
    @Value("\${jwt.secret}")
    private val jwtSecret: String = String()

    @Value("\${jwt.expirationInMs}")
    private val jwtExpirationInMs: Int = 0

    fun generateToken(authentication: Authentication): String {
        val userPrincipal: UserPrincipal = authentication.principal as UserPrincipal
        val now: Date = Date()
        val expiryDate = Date(now.time + jwtExpirationInMs)
        return Jwts.builder()
            .setSubject(userPrincipal.id.toString())
            .setIssuedAt(Date())
            .setExpiration(expiryDate)
            .signWith(SignatureAlgorithm.HS512, jwtSecret)
            .compact()
    }

    fun getUserIdFromJwt(token: String): Long {
        val claims = Jwts.parser()
            .setSigningKey(jwtSecret)
            .parseClaimsJws(token)
            .body
        return claims.subject.toLong()
    }

    fun validateToken(token: String): Boolean {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token)
            return true
        } catch (ex: SignatureException) {
            print("Invalid JWT signature")
        } catch (ex: MalformedJwtException) {
            print("Invalid JWT token")
        } catch (ex: ExpiredJwtException) {
            print("Expired JWT token")
        } catch (ex: UnsupportedJwtException) {
            print("Unsupported JWT token")
        } catch (ex: IllegalArgumentException) {
            print("JWT claims string is empty")
        }
        return false
    }
}