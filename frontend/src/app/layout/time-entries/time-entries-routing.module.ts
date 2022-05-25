import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListResolver } from '../../_resolvers/project-list.resolver';
import { ProjectUserListByCurrentUserResolver } from '../../_resolvers/project-user-list-by-current-user.resolver';
import { TimeEntryListByCurrentUserResolver } from '../../_resolvers/time-entry-list-by-current-user.resolver';
import { TimeEntriesComponent } from './time-entries.component';
import { TimeEntryListComponent } from './time-entry-list/time-entry-list.component';

const routes: Routes = [
  {
    path: '',
    component: TimeEntriesComponent,
    children: [
      {
        path: '',
        component: TimeEntriesComponent,
        children: [
          {
            path: '',
            component: TimeEntryListComponent,
            resolve: {
              projects: ProjectListResolver,
              projectUsers: ProjectUserListByCurrentUserResolver,
              timeEntries: TimeEntryListByCurrentUserResolver,
            },
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeEntriesRoutingModule {}
