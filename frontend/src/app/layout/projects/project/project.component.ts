import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ProjectUser } from '../../../_models/project-user.model';
import { Project } from '../../../_models/project.model';
import { User } from '../../../_models/user.model';
import { ProjectUsersService } from '../../../_services/project-users.service';
import { ProjectsService } from '../../../_services/projects.service';
import { ProjectModalComponent } from '../project-modal/project-modal.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, OnDestroy {
  bsModalRef: BsModalRef;
  project: Project;
  projects: Project[];
  projectSubscription: Subscription;
  projectUsers: ProjectUser[];
  projectUsersSubscription: Subscription;
  users: User[];

  constructor(
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private projectUsersService: ProjectUsersService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.project = data.project;
      this.projects = data.projects;
      this.projectUsers = data.projectUsers;
      this.users = data.users;
    });
    this.projectSubscription = this.projectsService.projectChanged.subscribe(
      (project: Project) => {
        console.log('project changed');
        this.project = project;
      }
    );
    this.projectUsersSubscription =
      this.projectUsersService.projectUsersChanged.subscribe(
        (projectUsers: ProjectUser[]) => {
          console.log('project users changed');
          this.projectUsers = projectUsers;
        }
      );
  }

  openProjectModal() {
    const modalOptions: ModalOptions = {
      initialState: {
        project: this.project,
      },
    };
    this.bsModalRef = this.modalService.show(
      ProjectModalComponent,
      modalOptions
    );
    this.bsModalRef.content.projectEvent.subscribe((project: Project) => {
      this.projectsService.updateProject(project);
    });
  }

  ngOnDestroy(): void {
    this.projectSubscription.unsubscribe();
    this.projectUsersSubscription.unsubscribe();
  }
}
