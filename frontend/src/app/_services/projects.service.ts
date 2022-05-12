import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Project } from '../_models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  baseUrl = environment.apiUrl;

  projectChanged = new Subject<Project>();
  projectsChanged = new Subject<Project[]>();

  private project: Project;
  private projects: Project[] = [];

  constructor(private http: HttpClient) {}

  getProject() {
    return this.project;
  }

  setProject(project: Project) {
    this.project = project;
    this.projectChanged.next(this.project);
  }

  getProjects() {
    return this.projects.slice();
  }

  setProjects(projects: Project[]) {
    this.projects = projects;
    this.projectsChanged.next(this.projects.slice());
  }

  fetchProject(id: number): Observable<Project> {
    return this.http
      .get<Project>(`${this.baseUrl}/projects/${id}`)
      .pipe(tap((project) => this.setProject(project)));
  }

  fetchProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/projects`).pipe(
      tap((projects) => {
        this.setProjects(projects);
      })
    );
  }

  createProject(createProject: Project) {
    this.http
      .post<Project>(`${this.baseUrl}/projects`, createProject)
      .subscribe((project) => {
        this.projects.push(project);
        this.projectsChanged.next(this.projects.slice());
      });
  }

  updateProject(updateProject: Project) {
    this.http
      .post<Project>(`${this.baseUrl}/projects`, updateProject)
      .subscribe((project) => {
        this.setProject(project);
        const index = this.projects.findIndex((p) => p.id === project.id);
        this.projects[index] = project;
        this.projectsChanged.next(this.projects.slice());
      });
  }

  deleteProject(id: number) {
    this.http
      .delete<Boolean>(`${this.baseUrl}/projects`)
      .subscribe((isDeleted) => {
        if (isDeleted) {
          const index = this.projects.findIndex((p) => p.id === id);
          this.projects.splice(index, 1);
          this.projectsChanged.next(this.projects.slice());
        }
      });
  }
}
