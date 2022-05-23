import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ProjectUser } from '../_models/project-user.model';
import { ProjectUsersService } from '../_services/project-users.service';

@Injectable()
export class ProjectUserListByUserResolver
  implements Resolve<ProjectUser[] | null>
{
  constructor(private projectUsersService: ProjectUsersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ProjectUser[] | null> {
    const userId = Number(route.paramMap.get('id'));
    return this.projectUsersService.fetchProjectUsersByUser(+userId).pipe(
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }
}
