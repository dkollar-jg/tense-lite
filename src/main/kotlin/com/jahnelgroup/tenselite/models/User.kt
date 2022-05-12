package com.jahnelgroup.tenselite.models

import javax.persistence.*
import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank
import javax.validation.constraints.Size

@Entity
@Table(name = "user")
class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long?,

    @field:Size(min = 2, max = 120, message = "'firstName' must be between 2 and 120 characters.")
    @Column
    var firstName: String?,

    @field:Size(min = 2, max = 120, message = "'lastName' must be between 2 and 120 characters.")
    @Column
    var lastName: String?,

    @field:NotBlank(message = "'email' is required")
    @field:Size(min = 2, max = 255, message = "'email' must be between 2 and 255 characters.")
    @field:Email(message = "'email' is invalid")
    @Column
    var email: String?,

    @Column
    var isAdmin: Boolean? = false
)