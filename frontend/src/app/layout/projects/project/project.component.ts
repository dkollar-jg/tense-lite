import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Project } from '../../../_models/project.model';
import { ProjectsService } from '../../../_services/projects.service';
import { ProjectModalComponent } from '../project-modal/project-modal.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  bsModalRef: BsModalRef;
  project: Project;
  subscription: Subscription;

  constructor(
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private projectsService: ProjectsService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.project = data.project;
    });
    this.subscription = this.projectsService.projectChanged.subscribe(
      (project: Project) => {
        console.log('project changed');
        this.project = project;
      }
    );
  }

  openProjectModal() {
    const initialState: ModalOptions = {
      initialState: {
        project: this.project,
      },
    };
    this.bsModalRef = this.modalService.show(
      ProjectModalComponent,
      initialState
    );
    this.bsModalRef.content.projectEvent.subscribe((project: Project) => {
      this.projectsService.updateProject(project);
    });
  }
}
