package com.jahnelgroup.tenselite.dtos

import java.time.LocalDate

data class UpdateTimeEntryDto(
    var projectId: Long?,

    var entryDate: LocalDate?,

    var entryNotes: String?,

    var hours: Double?,

    var enabled: Boolean?,
)