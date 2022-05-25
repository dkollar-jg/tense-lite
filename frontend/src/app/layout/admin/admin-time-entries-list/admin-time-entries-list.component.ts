import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Project } from '../../../_models/project.model';
import { TimeEntryCriteria } from '../../../_models/time-entry-criteria.model';
import { TimeEntry } from '../../../_models/time-entry.model';
import { User } from '../../../_models/user.model';
import { TimeEntriesService } from '../../../_services/time-entries.service';
import { TimeEntryFilterModalComponent } from '../../time-entries/time-entry-filter-modal/time-entry-filter-modal.component';
import { TimeEntryModalComponent } from '../../time-entries/time-entry-modal/time-entry-modal.component';

@Component({
  selector: 'app-admin-time-entries-list',
  templateUrl: './admin-time-entries-list.component.html',
  styleUrls: ['./admin-time-entries-list.component.scss'],
})
export class AdminTimeEntriesListComponent implements OnInit, OnDestroy {
  bsModalRef: BsModalRef;
  criteria: TimeEntryCriteria = {} as TimeEntryCriteria;
  criteriaSubscription: Subscription;
  projects: Project[];
  subscription: Subscription;
  timeEntries: TimeEntry[];
  users: User[];

  constructor(
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private timeEntryService: TimeEntriesService
  ) {}

  ngOnInit(): void {
    this.criteria = this.timeEntryService.getTimeEntryCriteria();
    this.route.data.subscribe((data) => {
      this.projects = data.projects;
      this.timeEntries = data.timeEntries;
      this.users = data.users;
    });
    this.subscription = this.timeEntryService.timeEntriesChanged.subscribe(
      (timeEntries: TimeEntry[]) => {
        console.log('time entries changed');
        this.timeEntries = timeEntries;
      }
    );
    this.criteriaSubscription =
      this.timeEntryService.timeEntryCriteriaChanged.subscribe(
        (criteria: TimeEntryCriteria) => {
          console.log('time entry criteria changed');
          this.criteria = criteria;
        }
      );
  }

  openTimeEntryEditModal(timeEntry: TimeEntry) {
    const modalOptions: ModalOptions = {
      initialState: {
        mode: 'edit',
        projects: this.projects,
        source: 'admin',
        timeEntry: timeEntry,
      },
    };
    this.bsModalRef = this.modalService.show(
      TimeEntryModalComponent,
      modalOptions
    );
    this.bsModalRef.content.timeEntryEvent.subscribe((timeEntry: TimeEntry) => {
      this.timeEntryService.updateTimeEntry(timeEntry);
    });
  }

  openTimeEntryFilter() {
    const modalOptions: ModalOptions = {
      initialState: {
        criteria: { ...this.criteria },
        projects: this.projects,
        source: 'admin',
        users: this.users,
      },
    };
    this.bsModalRef = this.modalService.show(
      TimeEntryFilterModalComponent,
      modalOptions
    );
    this.bsModalRef.content.timeEntryFilterEvent.subscribe(
      (criteria: TimeEntryCriteria) => {
        localStorage.setItem('adminTimeEntryCriteria', JSON.stringify(criteria));
        this.timeEntryService.searchTimeEntries(criteria).subscribe();
      }
    );
  }

  deleteTimeEntry(timeEntry: TimeEntry) {
    timeEntry.enabled = false;
    this.timeEntryService.updateTimeEntry(timeEntry);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.criteriaSubscription.unsubscribe();
  }
}
