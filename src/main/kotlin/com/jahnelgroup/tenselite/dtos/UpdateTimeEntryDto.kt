package com.jahnelgroup.tenselite.dtos

import java.time.LocalDate
import javax.validation.constraints.Size

data class UpdateTimeEntryDto(
    var projectId: Long?,

    var entryDate: LocalDate?,

    var entryNotes: String?,

    var hours: Double?,
)