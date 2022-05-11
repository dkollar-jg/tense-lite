import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
          { path: '', component: TimeEntryListComponent },
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
