import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../_models/project.model';
import { ProjectsService } from '../_services/projects.service';

@Injectable()
export class ProjectListResolver implements Resolve<Project[]> {
  constructor(private projectsService: ProjectsService) {}

  resolve(): Observable<Project[]> | Project[] {
    const projects = this.projectsService.getProjects();

    if (projects.length !== 0) {
      return projects;
    }
    return this.projectsService.fetchProjects();
  }
}
