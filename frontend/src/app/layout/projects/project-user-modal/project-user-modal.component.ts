import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ProjectUser } from '../../../_models/project-user.model';
import { Project } from '../../../_models/project.model';
import { User } from '../../../_models/user.model';
import { HelperService } from '../../../_services/helper.service';

@Component({
  selector: 'app-project-user-modal',
  templateUrl: './project-user-modal.component.html',
  styleUrls: ['./project-user-modal.component.scss'],
})
export class ProjectUserModalComponent implements OnInit {
  @Output() projectUserEvent = new EventEmitter();

  projects: Project[] = [];
  projectUser: ProjectUser;
  projectUsers: ProjectUser[];
  projectUserForm: FormGroup;
  submitted = false;
  source: string = 'project';
  users: User[] = [];

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private helperService: HelperService,
  ) {}

  ngOnInit(): void {
    this.createProjectUserForm();
  }

  createProjectUserForm() {
    this.projectUserForm = this.fb.group({
      projectId: [{ value: this.projectUser.projectId, disabled: ['project', 'project-user'].includes(this.source) }, [Validators.required]],
      userId: [{ value: this.projectUser.userId, disabled: ['project-user', 'user'].includes(this.source) }, [Validators.required]],
      hourlyRate: [this.projectUser.hourlyRate], // TODO: conditionally required if project is billable
      startDate: [this.helperService.stringToDate(this.projectUser.startDate)],
      endDate: [this.helperService.stringToDate(this.projectUser.endDate)],
    });
  }

  submitHandler() {
    this.submitted = true;
    if (this.projectUserForm.invalid) {
      return;
    }
    const projectUserFormValue = {
      projectId: this.projectUserForm.getRawValue().projectId,
      userId: this.projectUserForm.getRawValue().userId,
      hourlyRate: this.projectUserForm.value.hourlyRate,
      startDate: this.projectUserForm.value.startDate
        ? this.helperService.dateToString(this.projectUserForm.value.startDate)
        : null,
      endDate: this.projectUserForm.value.endDate
        ? this.helperService.dateToString(this.projectUserForm.value.endDate)
        : null,
    };
    Object.assign(this.projectUser, projectUserFormValue);
    this.projectUserEvent.emit(this.projectUser);
    this.bsModalRef.hide();
  }
}
