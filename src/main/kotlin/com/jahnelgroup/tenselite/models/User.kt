package com.jahnelgroup.tenselite.models

import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.data.annotation.CreatedBy
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedBy
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import java.time.LocalDateTime
import javax.persistence.*
import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank
import javax.validation.constraints.Size

@Entity
@Table(name = "user")
@EntityListeners(AuditingEntityListener::class)
class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0L

    @field:Size(min = 1, max = 120, message = "'firstName' must be between 1 and 120 characters.")
    @Column(name = "first_name")
    var firstName = ""

    @field:Size(min = 1, max = 120, message = "'lastName' must be between 1 and 120 characters.")
    @Column(name = "last_name")
    var lastName = ""

    @field:NotBlank(message = "'email' is required")
    @field:Size(max = 255, message = "'email' must be between 2 and 255 characters.")
    @field:Email(message = "'email' is invalid")
    @Column(name = "email", unique = true)
    var email = ""

    @JsonIgnore
    @Column(name = "password")
    var password = ""
        get() = field
        set(value) {
            val passwordEncoder = BCryptPasswordEncoder()
            field = passwordEncoder.encode(value)
        }

    @Column(name = "is_admin")
    var isAdmin: Boolean = false

    @Column(name = "enabled")
    var enabled: Boolean = true

    @CreatedBy
    @Column(name = "created_by_user_id")
    var createdByUserId: Long = 0L

    @CreatedDate
    @Column(name = "created_date")
    var createdDate: LocalDateTime = LocalDateTime.now()

    @LastModifiedBy
    @Column(name = "updated_by_user_id")
    var updatedByUserId: Long = 0L

    @LastModifiedDate
    @Column(name = "updated_date")
    var updatedDate: LocalDateTime = LocalDateTime.now()

    fun comparePassword(password: String): Boolean {
        return BCryptPasswordEncoder().matches(password, this.password)
    }
}