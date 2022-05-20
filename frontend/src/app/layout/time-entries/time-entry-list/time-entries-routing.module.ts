import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListResolver } from '../../../_resolvers/project-list.resolver';
import { ProjectUserListByUserResolver } from '../../../_resolvers/project-user-list-by-user.resolver';
import { TimeEntryListByUserResolver } from '../../../_resolvers/time-entry-list-by-user.resolver';
import { TimeEntriesComponent } from '../time-entries.component';
import { TimeEntryListComponent } from './time-entry-list.component';

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
              projectUsers: ProjectUserListByUserResolver,
              timeEntries: TimeEntryListByUserResolver,
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
