import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ProjectUser } from '../../../_models/project-user.model';
import { Project } from '../../../_models/project.model';
import { TimeEntryCriteria } from '../../../_models/time-entry-criteria.model';
import { TimeEntry } from '../../../_models/time-entry.model';
import { AuthService } from '../../../_services/auth.service';
import { TimeEntriesService } from '../../../_services/time-entries.service';
import { TimeEntryFilterModalComponent } from '../time-entry-filter-modal/time-entry-filter-modal.component';
import { TimeEntryModalComponent } from '../time-entry-modal/time-entry-modal.component';

@Component({
  selector: 'app-time-entry-list',
  templateUrl: './time-entry-list.component.html',
  styleUrls: ['./time-entry-list.component.scss'],
})
export class TimeEntryListComponent implements OnInit, OnDestroy {
  availableProjects: Project[];
  bsModalRef: BsModalRef;
  criteria: TimeEntryCriteria = {} as TimeEntryCriteria;
  criteriaSubscription: Subscription;
  projects: Project[];
  projectUsers: ProjectUser[];
  subscription: Subscription;
  timeEntries: TimeEntry[];

  constructor(
    private authService: AuthService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private timeEntryService: TimeEntriesService
  ) {}

  ngOnInit(): void {
    this.criteria = this.timeEntryService.getTimeEntryCriteria();
    this.route.data.subscribe((data) => {
      this.projects = data.projects;
      this.projectUsers = data.projectUsers;
      this.timeEntries = data.timeEntries;
      this.setAvailableProjects();
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
          console.log('current user time entry criteria changed');
          this.criteria = criteria;
        }
      );
  }

  setAvailableProjects() {
    const availableProjectIds = this.projectUsers.map((pu) => pu.projectId);
    this.availableProjects = this.projects
      .slice()
      .filter((p) => p.enabled && availableProjectIds.includes(p.id));
  }

  openTimeEntryCreateModal() {
    const newTimeEntry = {
      id: null,
      projectId: null,
      userId: this.authService.getCurrentUser()?.id,
      entryDate: null,
      entryNotes: null,
      hours: null,
    };
    const modalOptions: ModalOptions = {
      initialState: {
        availableProjects: this.availableProjects,
        mode: 'create',
        projects: this.projects,
        source: 'current-user',
        timeEntry: newTimeEntry,
      },
    };
    this.bsModalRef = this.modalService.show(
      TimeEntryModalComponent,
      modalOptions
    );
    this.bsModalRef.content.timeEntryEvent.subscribe((timeEntry: TimeEntry) => {
      this.timeEntryService.createTimeEntry(timeEntry);
    });
  }

  openTimeEntryEditModal(timeEntry: TimeEntry) {
    const modalOptions: ModalOptions = {
      initialState: {
        availableProjects: this.availableProjects,
        mode: 'edit',
        projects: this.projects,
        source: 'current-user',
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

  deleteTimeEntry(timeEntry: TimeEntry) {
    timeEntry.enabled = false;
    this.timeEntryService.updateTimeEntry(timeEntry);
  }

  openTimeEntryFilter() {
    const modalOptions: ModalOptions = {
      initialState: {
        criteria: { ...this.criteria },
        projects: this.projects,
        source: 'current-user',
      },
    };
    this.bsModalRef = this.modalService.show(
      TimeEntryFilterModalComponent,
      modalOptions
    );
    this.bsModalRef.content.timeEntryFilterEvent.subscribe(
      (criteria: TimeEntryCriteria) => {
        if (!criteria.userId) {
          criteria.userId = this.authService.getCurrentUser()?.id || 0;
          criteria.enabled = true;
        }
        localStorage.setItem('currentUserTimeEntryCriteria', JSON.stringify(criteria));
        this.timeEntryService.searchTimeEntries(criteria).subscribe();
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.criteriaSubscription.unsubscribe();
  }
}
