package com.jahnelgroup.tenselite.dtos

import java.time.LocalDate

class TimeEntryCriteria {
    var userId: Long? = null
    var projectId: Long? = null
    var startDate: LocalDate? = null
    var endDate: LocalDate? = null
    var entryNotes: String? = null
    var enabled: Boolean? = null
}
