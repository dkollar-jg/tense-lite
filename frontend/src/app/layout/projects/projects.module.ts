import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProjectListResolver } from '../../_resolvers/project-list.resolver';
import { ProjectResolver } from '../../_resolvers/project.resolver';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsRoutingModule } from './project-list/projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectModalComponent } from './project-modal/project-modal.component';

@NgModule({
  declarations: [ProjectsComponent, ProjectListComponent, ProjectModalComponent],
  imports: [CommonModule, ProjectsRoutingModule],
  providers: [ProjectResolver, ProjectListResolver],
})
export class ProjectsModule {}
