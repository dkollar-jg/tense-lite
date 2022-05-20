package com.jahnelgroup.tenselite.models

import java.time.LocalDate
import javax.persistence.*
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

@Entity
@Table(name = "project")
class Project (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long?,

    @field:NotBlank(message = "'name' is required")
    @field:Size(min = 2, max = 50, message = "'name' must be between 2 and 120 characters.")
    @Column
    var name: String?,

    @field:NotNull(message = "'isBillable' is required")
    @Column
    var isBillable: Boolean?,

    @field:NotNull(message = "'startDate' is required")
    @Column
    var startDate: LocalDate?,

//    @field:NotNull(message = "'endDate' is required")
    @Column
    var endDate: LocalDate?
)