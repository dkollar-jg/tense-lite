package com.jahnelgroup.tenselite.dtos

import javax.validation.constraints.Email
import javax.validation.constraints.Size

data class UpdateUserDto(
    @field:Size(min = 2, max = 50, message = "'username' must be between 2 and 120 characters.")
    var username: String?,

    @field:Size(min = 2, max = 60, message = "'password' must be between 2 and 120 characters.")
    var password: String?,

    @field:Size(min = 2, max = 120, message = "'firstName' must be between 2 and 120 characters.")
    var firstName: String?,

    @field:Size(min = 2, max = 120, message = "'lastName' must be between 2 and 120 characters.")
    var lastName: String?,

    @field:Size(min = 2, max = 255, message = "'email' must be between 2 and 255 characters.")
    @field:Email(message = "'email' is invalid")
    var email: String?,


    var isAdmin: Boolean?
)