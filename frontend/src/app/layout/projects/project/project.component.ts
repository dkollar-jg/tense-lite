import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from '../../../_models/project.model';
import { ProjectsService } from '../../../_services/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  project: Project;
  subscription: Subscription;

  constructor(
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
}
