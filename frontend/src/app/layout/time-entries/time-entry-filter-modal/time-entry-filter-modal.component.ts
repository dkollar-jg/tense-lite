import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Project } from '../../../_models/project.model';
import { TimeEntryCriteria } from '../../../_models/time-entry-criteria.model';
import { HelperService } from '../../../_services/helper.service';

@Component({
  selector: 'app-time-entry-filter-modal',
  templateUrl: './time-entry-filter-modal.component.html',
  styleUrls: ['./time-entry-filter-modal.component.scss'],
})
export class TimeEntryFilterModalComponent implements OnInit {
  @Output() timeEntryFilterEvent = new EventEmitter();

  criteria: TimeEntryCriteria;
  projects: Project[];
  timeEntryFilterForm: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.createTimeEntryFilterForm();
  }

  createTimeEntryFilterForm() {
    this.timeEntryFilterForm = this.fb.group({
      projectId: [this.criteria.projectId],
      startDate: [this.helperService.stringToDate(this.criteria.startDate)],
      endDate: [this.helperService.stringToDate(this.criteria.endDate)],
      entryNotes: [this.criteria.entryNotes],
    });
  }

  clearHandler() {
    this.criteria = {} as TimeEntryCriteria;
    this.timeEntryFilterEvent.emit(this.criteria);
    this.bsModalRef.hide();
  }

  submitHandler() {
    const timeEntryFilterFormValue = {
      projectId: this.timeEntryFilterForm.value.projectId,
      startDate: this.timeEntryFilterForm.value.startDate
        ? this.helperService.dateToString(
            this.timeEntryFilterForm.value.startDate
          )
        : null,
      endDate: this.timeEntryFilterForm.value.endDate
        ? this.helperService.dateToString(
            this.timeEntryFilterForm.value.endDate
          )
        : null,
      entryNotes: this.timeEntryFilterForm.value.entryNotes
        ? this.timeEntryFilterForm.value.entryNotes.trim()
        : null,
    };
    Object.assign(this.criteria, timeEntryFilterFormValue);
    this.timeEntryFilterEvent.emit(this.criteria);
    this.bsModalRef.hide();
  }
}
