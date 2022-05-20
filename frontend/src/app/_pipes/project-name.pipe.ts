import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../_models/project.model';

@Pipe({ name: 'projectName' })
export class ProjectNamePipe implements PipeTransform {
  transform(value: number, projects: Project[]) {
    const project = projects.find((p) => p.id === value);
    return project?.name;
  }
}
