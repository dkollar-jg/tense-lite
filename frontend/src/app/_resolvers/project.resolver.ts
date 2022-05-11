import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Project } from '../_models/project.model';
import { ProjectsService } from '../_services/projects.service';

@Injectable()
export class ProjectResolver implements Resolve<Project | null> {
  constructor(
    private router: Router,
    private projectsService: ProjectsService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Project | null> {
    const id = Number(route.paramMap.get('id'));
    return this.projectsService.fetchProject(id).pipe(
      catchError((error) => {
        console.log(error);
        this.router.navigate(['/projects']);
        return of(null);
      })
    );
  }
}
