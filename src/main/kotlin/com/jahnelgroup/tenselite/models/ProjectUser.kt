package com.jahnelgroup.tenselite.models

import com.fasterxml.jackson.annotation.JsonUnwrapped
import java.io.Serializable
import java.time.LocalDate
import javax.persistence.*
import javax.validation.constraints.NotNull

@Embeddable
data class ProjectUserId(
    @field:NotNull(message = "'projectId' is required")
    @Column(name = "project_id")
    var projectId: Long? = null,

    @field:NotNull(message = "'projectId' is required")
    @Column(name = "user_id")
    var userId: Long? = null
) : Serializable

@Entity
@Table(name = "project_x_user")
class ProjectUser (

    @EmbeddedId
    @JsonUnwrapped
    var projectUserId: ProjectUserId,

    var hourlyRate: Double?,

    var startDate: LocalDate?,

    var endDate: LocalDate?,

    var enabled: Boolean?
)