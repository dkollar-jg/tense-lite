package com.jahnelgroup.tenselite.dtos

import java.time.LocalDate

data class UpdateProjectUserDto(
    var startDate: LocalDate?,

    var endDate: LocalDate?,

    var hourlyRate: Double?,

    var enabled: Boolean?
)