import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimeEntriesComponent } from './time-entries.component';
import { TimeEntriesRoutingModule } from './time-entry-list/time-entries-routing.module';
import { TimeEntryListComponent } from './time-entry-list/time-entry-list.component';

@NgModule({
  declarations: [TimeEntriesComponent, TimeEntryListComponent],
  imports: [CommonModule, TimeEntriesRoutingModule],
})
export class TimeEntriesModule {}
