import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PipesModule } from '../../_pipes/pipes.module';
import { AdminTimeEntryListResolver } from '../../_resolvers/admin-time-entry-list.resolver';
import { ProjectListResolver } from '../../_resolvers/project-list.resolver';
import { UserListResolver } from '../../_resolvers/user-list.resolver';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminTimeEntriesListComponent } from './admin-time-entries-list/admin-time-entries-list.component';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [AdminComponent, AdminTimeEntriesListComponent],
  imports: [
    AdminRoutingModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    PipesModule,
    ReactiveFormsModule,
  ],
  providers: [
    AdminTimeEntryListResolver,
    ProjectListResolver,
    UserListResolver,
  ]
})
export class AdminModule {}
