package com.jahnelgroup.tenselite.models

import com.fasterxml.jackson.annotation.JsonUnwrapped
import org.springframework.data.annotation.CreatedBy
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedBy
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.io.Serializable
import java.time.LocalDate
import java.time.LocalDateTime
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
@EntityListeners(AuditingEntityListener::class)
class ProjectUser {

    @EmbeddedId
    @JsonUnwrapped
    lateinit var projectUserId: ProjectUserId

    @field:NotNull(message = "'hourlyRate' is required")
    @Column(name = "hourly_rate")
    var hourlyRate: Double = 0.0

    @field:NotNull(message = "'startDate' is required")
    @Column(name = "start_date")
    var startDate: LocalDate? = null

    @Column(name = "end_date")
    var endDate: LocalDate? = null

    @Column(name = "enabled")
    var enabled: Boolean = true

    @CreatedBy
    @Column(name = "created_by_user_id")
    var createdByUserId: Long = 0L

    @CreatedDate
    @Column(name = "created_date")
    var createdDate: LocalDateTime = LocalDateTime.now()

    @LastModifiedBy
    @Column(name = "updated_by_user_id")
    var updatedByUserId: Long = 0L

    @LastModifiedDate
    @Column(name = "updated_date")
    var updatedDate: LocalDateTime = LocalDateTime.now()
}
