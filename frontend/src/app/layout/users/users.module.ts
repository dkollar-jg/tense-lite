import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DirectivesModule } from '../../_directives/directives.module';
import { UserListResolver } from '../../_resolvers/user-list.resolver';
import { UserResolver } from '../../_resolvers/user.resolver';
import { UserListComponent } from './user-list/user-list.component';
import { UserModalComponent } from './user-modal/user-modal.component';
import { UserComponent } from './user/user.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [
    UserComponent,
    UsersComponent,
    UserListComponent,
    UserModalComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    UsersRoutingModule,
  ],
  providers: [UserResolver, UserListResolver],
})
export class UsersModule {}
