import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../_models/user.model';
import { UsersService } from '../_services/users.service';

@Injectable()
export class UserListResolver implements Resolve<User[]> {
  constructor(private usersService: UsersService) {}

  resolve(): Observable<User[]> | User[] {
    const users = this.usersService.getUsers();

    if (users.length !== 0) {
      return users;
    }
    return this.usersService.fetchUsers();
  }
}
