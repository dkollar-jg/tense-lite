package com.jahnelgroup.tenselite.dtos

import javax.validation.constraints.Email
import javax.validation.constraints.Size

class UpdateUserDto {
    @field:Size(min = 2, max = 120, message = "'firstName' must be between 2 and 120 characters.")
    var firstName: String? = null

    @field:Size(min = 2, max = 120, message = "'lastName' must be between 2 and 120 characters.")
    var lastName: String? = null

    @field:Size(min = 2, max = 255, message = "'email' must be between 2 and 255 characters.")
    @field:Email(message = "'email' is invalid")
    var email: String? = null

    var isAdmin: Boolean? = null
}