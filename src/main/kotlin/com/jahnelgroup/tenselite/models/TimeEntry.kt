package com.jahnelgroup.tenselite.models

import org.springframework.data.annotation.CreatedBy
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedBy
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.Specification
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import java.time.LocalDate
import java.time.LocalDateTime
import javax.persistence.*
import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.CriteriaQuery
import javax.persistence.criteria.Root
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

@Entity
@Table(name = "time_entry")
@EntityListeners(AuditingEntityListener::class)
class TimeEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = 0L

    @field:NotNull(message = "'userId' is required")
    @Column(name = "user_id")
    var userId: Long? = null

    @field:NotNull(message = "'projectId' is required")
    @Column(name = "project_id")
    var projectId: Long? = null

    @field:NotNull(message = "'entryDate' is required")
    @Column(name = "entry_date")
    var entryDate: LocalDate? = null

    @field:NotBlank(message = "'entryNotes', is required")
    @field:Size(min = 1, max = 2000, message = "'entryNotes' must be between 1 and 2000 characters.")
    @Column(name = "entry_notes")
    var entryNotes: String? = null

    @field:NotNull(message = "'hours' is required")
    @Column(name = "hours")
    var hours: Double? = null

    @Column(name = "hourly_rate")
    var hourlyRate: Double? = null

    @Column(name = "entry_dollar_value")
    var entryDollarValue: Double? = null

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
