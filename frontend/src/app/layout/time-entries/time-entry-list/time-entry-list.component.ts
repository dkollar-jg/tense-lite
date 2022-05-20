import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ProjectUser } from '../../../_models/project-user.model';
import { Project } from '../../../_models/project.model';
import { TimeEntry } from '../../../_models/time-entry.model';
import { AuthService } from '../../../_services/auth.service';
import { timeEntriesService } from '../../../_services/time-entries.service';
import { TimeEntryModalComponent } from '../time-entry-modal/time-entry-modal.component';

@Component({
  selector: 'app-time-entry-list',
  templateUrl: './time-entry-list.component.html',
  styleUrls: ['./time-entry-list.component.scss'],
})
export class TimeEntryListComponent implements OnInit {
  availableProjects: Project[];
  bsModalRef: BsModalRef;
  projects: Project[];
  projectUsers: ProjectUser[];
  subscription: Subscription;
  timeEntries: TimeEntry[];

  constructor(
    private authService: AuthService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private timeEntryService: timeEntriesService
  ) {}

  ngOnInit(): void {
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
  }

  setAvailableProjects() {
    const availableProjectIds = this.projectUsers.map(pu => pu.projectId);
    this.availableProjects = this.projects.slice().filter(p => availableProjectIds.includes(p.id));
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
        projects: this.projects,
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
        projects: this.projects,
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
    this.timeEntryService.deleteTimeEntry(timeEntry.id);
  }
}
