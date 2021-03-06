import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../_models/user.model';
import { ProjectUsersService } from './project-users.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl = environment.apiUrl;

  userChanged = new Subject<User>();
  usersChanged = new Subject<User[]>();

  private user: User;
  private users: User[] = [];

  constructor(
    private http: HttpClient,
    private projectUsersService: ProjectUsersService
  ) {}

  getUser() {
    return { ...this.user };
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

  createUser(createUser: User) {
    this.http
      .post<User>(`${this.baseUrl}/users`, createUser)
      .subscribe((user) => {
        this.users.push(user);
        this.usersChanged.next(this.users.slice());
      });
  }

  updateUser(updateUser: User) {
    this.http
      .patch<User>(`${this.baseUrl}/users/${updateUser.id}`, updateUser)
      .subscribe((user) => {
        // Refresh project users if user is deactivated
        if (this.user.enabled && user.enabled === false) {
          this.projectUsersService.fetchProjectUsersByUser(user.id).subscribe();
        }
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
          this.users = this.users.filter(u => u.id !== id);
          this.usersChanged.next(this.users.slice());
        }
      });
  }
}
