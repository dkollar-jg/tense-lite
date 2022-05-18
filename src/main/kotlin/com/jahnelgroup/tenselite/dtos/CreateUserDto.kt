package com.jahnelgroup.tenselite.dtos

import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

class CreateUserDto {
    @field:NotNull(message = "'firstName' is required")
    @field:Size(min = 2, max = 120, message = "'firstName' must be between 2 and 120 characters.")
    var firstName = ""

    @field:NotNull(message = "'lastName' is required")
    @field:Size(min = 2, max = 120, message = "'lastName' must be between 2 and 120 characters.")
    var lastName = ""

    @field:NotBlank(message = "'email' is required")
    @field:Size(min = 2, max = 255, message = "'email' must be between 2 and 255 characters.")
    @field:Email(message = "'email' is invalid")
    var email = ""

    var isAdmin: Boolean? = false
}