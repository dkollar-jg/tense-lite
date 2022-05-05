package com.jahnelgroup.tenselite.dtos

import java.time.LocalDate
import javax.validation.constraints.NotNull

class CreateProjectUserDto(
    @field:NotNull(message = "'projectId' is required")
    var projectId: Long?,

    @field:NotNull(message = "'userId' is required")
    var userId: Long?,

    @field:NotNull(message = "'hourlyRate' is required")
    var hourlyRate: Double?,

    @field:NotNull(message = "'startDate' is required")
    var startDate: LocalDate?,

    var endDate: LocalDate?,
)