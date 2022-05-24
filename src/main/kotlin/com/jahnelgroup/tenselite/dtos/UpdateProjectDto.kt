package com.jahnelgroup.tenselite.dtos

import java.time.LocalDate
import javax.validation.constraints.Size

data class UpdateProjectDto(
    @field:Size(min = 2, max = 50, message = "'name' must be between 2 and 120 characters.")
    var name: String?,

    var isBillable: Boolean?,

    var startDate: LocalDate?,

    var endDate: LocalDate?,

    var enabled: Boolean?,
)