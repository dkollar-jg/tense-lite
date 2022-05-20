import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { ProjectUser } from '../_models/project-user.model';
import { Project } from '../_models/project.model';
import { ProjectUsersService } from '../_services/project-users.service';
import { ProjectsService } from '../_services/projects.service';

@Injectable()
export class ProjectListByUserResolver implements Resolve<Project[] | null> {
  constructor(
    private projectsService: ProjectsService,
    private projectUsersService: ProjectUsersService
  ) {}

  resolve(): Observable<Project[] | null> {
    const userId = localStorage.getItem('userId') || 0;
    const projectsObservable = this.projectsService.fetchProjects();
    const projectUsersObservable =
      this.projectUsersService.fetchProjectUsersByUser(+userId);
    return forkJoin([projectsObservable, projectUsersObservable]).pipe(
      map(([projects, projectUsers]) => {
        const availableProjectIds = projectUsers.map(
          (pu: ProjectUser) => pu.projectId
        );
        return projects.filter((p: Project) =>
          availableProjectIds.includes(p.id)
        );
      }),
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
    // const projectUsers = this.projectUsersService.fetchProjectUsersByUser(+userId).pipe(

    //   catchError((error) => {
    //     console.log(error);
    //     return of(null);
    //   })
    // );
  }
}
