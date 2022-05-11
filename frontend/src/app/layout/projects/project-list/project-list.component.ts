import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Project } from '../../../_models/project.model';
import { ProjectsService } from '../../../_services/projects.service';
import { ProjectModalComponent } from '../project-modal/project-modal.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  projects: Project[];
  subscription: Subscription;

  constructor(
    private modalService: NgbModal,
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
    const modalRef = this.modalService.open(ProjectModalComponent);
    modalRef.componentInstance.testInput = 'Test Property';
  }
}
