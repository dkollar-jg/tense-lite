import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl = environment.apiUrl;

  usersChanged = new Subject<User[]>();

  private users: User[] = [];

  constructor(private http: HttpClient) {}

  setUsers(users: User[]) {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  getUsers() {
    return this.users.slice();
  }

  fetchUsers() {
    this.http.get<User[]>(`${this.baseUrl}/users`).subscribe((users) => {
      this.setUsers(users);
    });
  }
}
