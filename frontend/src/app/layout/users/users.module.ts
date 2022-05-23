import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DirectivesModule } from '../../_directives/directives.module';
import { PipesModule } from '../../_pipes/pipes.module';
import { ProjectListResolver } from '../../_resolvers/project-list.resolver';
import { ProjectUserListByUserResolver } from '../../_resolvers/project-user-list-by-user.resolver';
import { UserListResolver } from '../../_resolvers/user-list.resolver';
import { UserResolver } from '../../_resolvers/user.resolver';
import { UserListComponent } from './user-list/user-list.component';
import { UserModalComponent } from './user-modal/user-modal.component';
import { UserProjectListComponent } from './user-project-list/user-project-list.component';
import { UserComponent } from './user/user.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [
    UserComponent,
    UsersComponent,
    UserListComponent,
    UserModalComponent,
    UserProjectListComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    FormsModule,
    ModalModule.forRoot(),
    PipesModule,
    ReactiveFormsModule,
    UsersRoutingModule,
  ],
  providers: [
    ProjectListResolver,
    ProjectUserListByUserResolver,
    UserResolver,
    UserListResolver,
  ],
})
export class UsersModule {}
