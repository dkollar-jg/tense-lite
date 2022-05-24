import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ProjectUser } from '../../../_models/project-user.model';
import { Project } from '../../../_models/project.model';
import { User } from '../../../_models/user.model';
import { ProjectUsersService } from '../../../_services/project-users.service';
import { ProjectUserModalComponent } from '../project-user-modal/project-user-modal.component';

@Component({
  selector: 'app-project-user-list',
  templateUrl: './project-user-list.component.html',
  styleUrls: ['./project-user-list.component.scss'],
})
export class ProjectUserListComponent implements OnInit {
  @Input() project: Project;
  @Input() projects: Project[];
  @Input() projectUsers: ProjectUser[];
  @Input() users: User[];

  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private projectUsersService: ProjectUsersService
  ) {}

  ngOnInit(): void {}

  openProjectUserCreateModal() {
    const newProjectUser = {
      projectId: this.project.id,
      userId: null,
      hourlyRate: 0,
      startDate: null,
      endDate: null,
    };
    const modalOptions: ModalOptions = {
      initialState: {
        project: this.project,
        projects: this.projects,
        projectUser: newProjectUser,
        projectUsers: this.projectUsers,
        source: 'project',
        users: this.users.filter((u) => u.enabled),
      },
    };
    this.bsModalRef = this.modalService.show(
      ProjectUserModalComponent,
      modalOptions
    );
    this.bsModalRef.content.projectUserEvent.subscribe(
      (projectUser: ProjectUser) => {
        this.projectUsersService.createProjectUser(projectUser);
      }
    );
  }

  openProjectUserEditModal(projectUser: ProjectUser) {
    const modalOptions: ModalOptions = {
      initialState: {
        project: this.project,
        projects: this.projects,
        projectUser: projectUser,
        projectUsers: this.projectUsers,
        source: 'project-user',
        users: this.users,
      },
    };
    this.bsModalRef = this.modalService.show(
      ProjectUserModalComponent,
      modalOptions
    );
    this.bsModalRef.content.projectUserEvent.subscribe(
      (projectUser: ProjectUser) => {
        this.projectUsersService.updateProjectUser(projectUser);
      }
    );
  }

  removeProjectUser(projectUser: ProjectUser) {
    projectUser.enabled = false;
    this.projectUsersService.updateProjectUser(projectUser);
  }

  enableProjectUser(projectUser: ProjectUser) {
    projectUser.enabled = true;
    this.projectUsersService.updateProjectUser(projectUser);
  }
}
