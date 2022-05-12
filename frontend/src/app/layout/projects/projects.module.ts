import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProjectListResolver } from '../../_resolvers/project-list.resolver';
import { ProjectResolver } from '../../_resolvers/project.resolver';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsRoutingModule } from './project-list/projects-routing.module';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects.component';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectsComponent,
    ProjectListComponent,
    ProjectModalComponent,
  ],
  imports: [
    BsDatepickerModule.forRoot(),
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    ProjectsRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [ProjectResolver, ProjectListResolver],
})
export class ProjectsModule {}
