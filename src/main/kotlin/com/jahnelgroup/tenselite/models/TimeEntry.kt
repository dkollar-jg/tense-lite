package com.jahnelgroup.tenselite.models

import java.time.LocalDate
import javax.persistence.*
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

@Entity
@Table(name = "time_entry")
class TimeEntry (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long?,

    @field:NotNull(message = "'userId' is required")
    @Column
    var userId: Long?,

    @field:NotNull(message = "'projectId' is required")
    @Column
    var projectId: Long?,

    @field:NotNull(message = "'entryDate' is required")
    @Column
    var entryDate: LocalDate?,

    @field:NotBlank(message = "'entryNotes', is required")
    @field:Size(min = 1, max = 2000, message = "'entryNotes' must be between 1 and 2000 characters.")
    @Column
    var entryNotes: String?,

    @field:NotNull(message = "'hours' is required")
    @Column
    var hours: Double? = null,

    @Column
    var hourlyRate: Double? = null,

    @Column
    var entryDollarValue: Double? = null,
)