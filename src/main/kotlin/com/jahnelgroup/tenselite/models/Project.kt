package com.jahnelgroup.tenselite.models

import org.springframework.data.annotation.CreatedBy
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedBy
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDate
import java.time.LocalDateTime
import javax.persistence.*
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

@Entity
@Table(name = "project")
@EntityListeners(AuditingEntityListener::class)
class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0L

    @field:NotBlank(message = "'name' is required")
    @field:Size(min = 2, max = 50, message = "'name' must be between 2 and 120 characters.")
    @Column(name = "name")
    var name: String = ""

    @field:NotNull(message = "'isBillable' is required")
    @Column(name = "is_billable")
    var isBillable: Boolean = false

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