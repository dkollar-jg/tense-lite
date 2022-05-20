import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DirectivesModule } from '../../_directives/directives.module';
import { PipesModule } from '../../_pipes/pipes.module';
import { ProjectListResolver } from '../../_resolvers/project-list.resolver';
import { ProjectUserListByProjectResolver } from '../../_resolvers/project-user-list-by-project.resolver';
import { ProjectResolver } from '../../_resolvers/project.resolver';
import { UserListResolver } from '../../_resolvers/user-list.resolver';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsRoutingModule } from './project-list/projects-routing.module';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { ProjectUserListComponent } from './project-user-list/project-user-list.component';
import { ProjectUserModalComponent } from './project-user-modal/project-user-modal.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects.component';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectsComponent,
    ProjectListComponent,
    ProjectModalComponent,
    ProjectUserListComponent,
    ProjectUserModalComponent,
  ],
  imports: [
    BsDatepickerModule.forRoot(),
    CommonModule,
    DirectivesModule,
    FormsModule,
    ModalModule.forRoot(),
    PipesModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    ProjectResolver,
    ProjectListResolver,
    ProjectUserListByProjectResolver,
    UserListResolver,
  ],
})
export class ProjectsModule {}
