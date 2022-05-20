import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Project } from '../../../_models/project.model';
import { TimeEntry } from '../../../_models/time-entry.model';
import { HelperService } from '../../../_services/helper.service';

@Component({
  selector: 'app-time-entry-modal',
  templateUrl: './time-entry-modal.component.html',
  styleUrls: ['./time-entry-modal.component.scss'],
})
export class TimeEntryModalComponent implements OnInit {
  @Output() timeEntryEvent = new EventEmitter();

  availableProjects: Project[];
  projects: Project[];
  submitted = false;
  timeEntry: TimeEntry;
  timeEntryForm: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.createTimeEntryForm();
  }

  createTimeEntryForm() {
    this.timeEntryForm = this.fb.group({
      projectId: [this.timeEntry.projectId, [Validators.required]],
      entryDate: [
        this.helperService.stringToDate(this.timeEntry.entryDate),
        [Validators.required],
      ],
      entryNotes: [this.timeEntry.entryNotes, [Validators.required]],
      hours: [this.timeEntry.hours, [Validators.required]],
    });
  }

  submitHandler() {
    this.submitted = true;
    if (this.timeEntryForm.invalid) {
      return;
    }
    const timeEntryFormValue = {
      projectId: this.timeEntryForm.value.projectId,
      entryDate: this.timeEntryForm.value.entryDate
        ? this.helperService.dateToString(this.timeEntryForm.value.entryDate)
        : null,
      entryNotes: this.timeEntryForm.value.entryNotes,
      hours: this.timeEntryForm.value.hours,
    };
    Object.assign(this.timeEntry, timeEntryFormValue);
    this.timeEntryEvent.emit(this.timeEntry);
    this.bsModalRef.hide();
  }
}
