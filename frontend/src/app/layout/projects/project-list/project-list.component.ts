import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Project } from '../../../_models/project.model';
import { ProjectsService } from '../../../_services/projects.service';
import { ProjectModalComponent } from '../project-modal/project-modal.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit, OnDestroy {
  bsModalRef: BsModalRef;
  projects: Project[];
  subscription: Subscription;

  constructor(
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.projects = data.projects;
    });
    this.subscription = this.projectsService.projectsChanged.subscribe(
      (projects: Project[]) => {
        console.log('projects changed');
        this.projects = projects;
      }
    );
  }

  openProjectModal() {
    const newProject = {
      id: null,
      name: '',
      isBillable: false,
      startDate: null,
      endDate: null,
      enabled: true,
    };
    const modalOptions: ModalOptions = {
      initialState: {
        project: newProject,
      },
    };
    this.bsModalRef = this.modalService.show(
      ProjectModalComponent,
      modalOptions
    );
    this.bsModalRef.content.projectEvent.subscribe((project: Project) => {
      this.projectsService.createProject(project);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
