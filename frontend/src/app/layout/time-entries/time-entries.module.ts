import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DirectivesModule } from '../../_directives/directives.module';
import { PipesModule } from '../../_pipes/pipes.module';
import { ProjectListResolver } from '../../_resolvers/project-list.resolver';
import { ProjectUserListByCurrentUserResolver } from '../../_resolvers/project-user-list-by-current-user.resolver';
import { TimeEntryListByUserResolver } from '../../_resolvers/time-entry-list-by-user.resolver';
import { TimeEntriesComponent } from './time-entries.component';
import { TimeEntriesRoutingModule } from './time-entry-list/time-entries-routing.module';
import { TimeEntryListComponent } from './time-entry-list/time-entry-list.component';
import { TimeEntryModalComponent } from './time-entry-modal/time-entry-modal.component';

@NgModule({
  declarations: [
    TimeEntriesComponent,
    TimeEntryListComponent,
    TimeEntryModalComponent,
  ],
  imports: [
    BsDatepickerModule.forRoot(),
    CommonModule,
    DirectivesModule,
    FormsModule,
    ModalModule.forRoot(),
    PipesModule,
    ReactiveFormsModule,
    TimeEntriesRoutingModule,
  ],
  providers: [
    ProjectListResolver,
    ProjectUserListByCurrentUserResolver,
    TimeEntryListByUserResolver,
  ],
})
export class TimeEntriesModule {}
