import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTimeEntryListResolver } from '../../_resolvers/admin-time-entry-list.resolver';
import { ProjectListResolver } from '../../_resolvers/project-list.resolver';
import { UserListResolver } from '../../_resolvers/user-list.resolver';
import { AdminTimeEntriesListComponent } from './admin-time-entries-list/admin-time-entries-list.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdminTimeEntriesListComponent,
        resolve: {
          projects: ProjectListResolver,
          timeEntries: AdminTimeEntryListResolver,
          users: UserListResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
