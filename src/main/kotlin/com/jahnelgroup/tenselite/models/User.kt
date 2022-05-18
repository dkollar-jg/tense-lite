package com.jahnelgroup.tenselite.models

import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import javax.persistence.*
import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank
import javax.validation.constraints.Size

@Entity
@Table(name = "user")
class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int = 0

//    @field:Size(min = 2, max = 120, message = "'firstName' must be between 2 and 120 characters.")
    @Column
    var firstName = ""

//    @field:Size(min = 2, max = 120, message = "'lastName' must be between 2 and 120 characters.")
    @Column
    var lastName = ""

//    @field:NotBlank(message = "'email' is required")
//    @field:Size(min = 2, max = 255, message = "'email' must be between 2 and 255 characters.")
//    @field:Email(message = "'email' is invalid")
    @Column(unique = true)
    var email = ""

    @JsonIgnore
    @Column
    var password = ""
        get() = field
        set(value) {
            val passwordEncoder = BCryptPasswordEncoder()
            field = passwordEncoder.encode(value)
        }

    @Column
    var isAdmin: Boolean = false

    fun comparePassword(password: String): Boolean {
        return BCryptPasswordEncoder().matches(password, this.password)
    }
}