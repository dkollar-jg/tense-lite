import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProjectUser } from '../_models/project-user.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectUsersService {
  baseUrl = environment.apiUrl;

  projectUsersChanged = new Subject<ProjectUser[]>();

  private projectUsers: ProjectUser[] = [];

  constructor(private http: HttpClient) {}

  getProjectUsers() {
    return this.projectUsers.slice();
  }

  setProjectUsers(projectUsers: ProjectUser[]) {
    this.projectUsers = projectUsers;
  }

  fetchProjectUsersByProject(projectId: number): Observable<ProjectUser[]> {
    return this.http
      .get<ProjectUser[]>(`${this.baseUrl}/projects/${projectId}/users`)
      .pipe(
        tap((projectUsers) => {
          this.setProjectUsers(projectUsers);
          this.projectUsersChanged.next(this.projectUsers.slice());
        })
      );
  }

  fetchProjectUsersByUser(userId: number): Observable<ProjectUser[]> {
    return this.http
      .get<ProjectUser[]>(`${this.baseUrl}/users/${userId}/projects`)
      .pipe(
        tap((projectUsers) => {
          this.setProjectUsers(projectUsers);
          this.projectUsersChanged.next(this.projectUsers.slice());
        })
      );
  }

  createProjectUser(createProjectUser: ProjectUser) {
    const { projectId, userId } = createProjectUser;
    this.http
      .post<ProjectUser>(
        `${this.baseUrl}/projects/${projectId}/users/${userId}`,
        createProjectUser
      )
      .subscribe((projectUser) => {
        const currentProjectId = this.projectUsers[0]?.projectId;
        if (currentProjectId === projectUser.projectId) {
          this.projectUsers.push(projectUser);
          this.projectUsersChanged.next(this.projectUsers.slice());
        }
      });
  }

  updateProjectUser(updateProjectUser: ProjectUser) {
    const { projectId, userId } = updateProjectUser;
    this.http
      .patch<ProjectUser>(
        `${this.baseUrl}/projects/${projectId}/users/${userId}`,
        updateProjectUser
      )
      .subscribe((projectUser) => {
        const currentProjectId = this.projectUsers[0]?.projectId;
        if (currentProjectId === projectUser.projectId) {
          const index = this.projectUsers.findIndex(
            (pu) => pu.userId === projectUser.userId
          );
          this.projectUsers[index] = projectUser;
          this.projectUsersChanged.next(this.projectUsers.slice());
        }
      });
  }
}
