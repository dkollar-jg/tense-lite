import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ProjectUser } from '../_models/project-user.model';
import { AuthService } from '../_services/auth.service';
import { ProjectUsersService } from '../_services/project-users.service';

@Injectable()
export class ProjectUserListByUserResolver
  implements Resolve<ProjectUser[] | null>
{
  constructor(
    private authService: AuthService,
    private projectUsersService: ProjectUsersService
  ) {}

  resolve(): Observable<ProjectUser[] | null> {
    const userId = this.authService.getCurrentUser()?.id || 0;
    return this.projectUsersService.fetchProjectUsersByUser(+userId).pipe(
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }
}
