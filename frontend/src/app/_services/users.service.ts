import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl = environment.apiUrl;

  userChanged = new Subject<User>();
  usersChanged = new Subject<User[]>();

  private user: User;
  private users: User[] = [];

  constructor(private http: HttpClient) {}

  getUser() {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
    this.userChanged.next(this.user);
  }

  getUsers() {
    return this.users.slice();
  }

  setUsers(users: User[]) {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  fetchUser(id: number): Observable<User> {
    return this.http
      .get<User>(`${this.baseUrl}/users/${id}`)
      .pipe(tap((user) => this.setUser(user)));
  }

  fetchUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.baseUrl}/users`)
      .pipe(tap((users) => this.setUsers(users)));
  }

  updateUser(updateUser: User) {
    this.http
      .post<User>(`${this.baseUrl}/users`, updateUser)
      .subscribe((user) => {
        this.setUser(user);
        const index = this.users.findIndex((u) => u.id === user.id);
        this.users[index] = user;
        this.usersChanged.next(this.users.slice());
      });
  }

  deleteUser(id: number) {
    this.http
      .delete<Boolean>(`${this.baseUrl}/users`)
      .subscribe((isDeleted) => {
        if (isDeleted) {
          const index = this.users.findIndex((u) => u.id === id);
          this.users.splice(index, 1);
          this.usersChanged.next(this.users.slice());
        }
      });
  }
}
