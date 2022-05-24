import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Project } from '../../../_models/project.model';
import { HelperService } from '../../../_services/helper.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss'],
})
export class ProjectModalComponent implements OnInit {
  @Output() projectEvent = new EventEmitter();

  project: Project;
  projectForm: FormGroup;
  submitted = false;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.createProjectForm();
  }

  createProjectForm() {
    this.projectForm = this.fb.group({
      name: [
        this.project.name,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      isBillable: [this.project.isBillable],
      startDate: [this.helperService.stringToDate(this.project.startDate)],
      endDate: [this.helperService.stringToDate(this.project.endDate)],
      enabled: [this.project.enabled],
    });
  }

  submitHandler() {
    this.submitted = true;
    if (this.projectForm.invalid) {
      return;
    }
    const projectFormValue = {
      name: this.projectForm.value.name.trim(),
      isBillable: this.projectForm.value.isBillable,
      startDate: this.projectForm.value.startDate
        ? this.helperService.dateToString(this.projectForm.value.startDate)
        : null,
      endDate: this.projectForm.value.endDate
        ? this.helperService.dateToString(this.projectForm.value.endDate)
        : null,
      enabled: this.projectForm.value.enabled,
    };
    Object.assign(this.project, projectFormValue);
    this.projectEvent.emit(this.project);
    this.bsModalRef.hide();
  }
}
