import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { User } from '../_models/user.model';
import { UsersService } from '../_services/users.service';

@Injectable()
export class UserResolver implements Resolve<User | null> {
  constructor(private router: Router, private usersService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User | null> {
    const id = Number(route.paramMap.get('id'));
    return this.usersService.fetchUser(id).pipe(
      catchError((error) => {
        console.log(error);
        this.router.navigate(['/users']);
        return of(null);
      })
    );
  }
}
