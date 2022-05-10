import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { TimeEntry } from '../_models/time-entry.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  baseUrl = environment.apiUrl;

  timeEntryChanged = new Subject<TimeEntry>();
  timeEntriesChanged = new Subject<TimeEntry[]>();

  private timeEntry: TimeEntry;
  private timeEntries: TimeEntry[] = [];

  constructor(private http: HttpClient) {}

  getTimeEntry() {
    return this.timeEntry;
  }

  setTimeEntry(timeEntry: TimeEntry) {
    this.timeEntry = timeEntry;
    this.timeEntryChanged.next(this.timeEntry);
  }

  getTimeEntries() {
    return this.timeEntries.slice();
  }

  setTimeEntries(timeEntries: TimeEntry[]) {
    this.timeEntries = timeEntries;
    this.timeEntriesChanged.next(this.timeEntries.slice());
  }

  fetchTimeEntries(): void {
    this.http
      .get<TimeEntry[]>(`${this.baseUrl}/time-entries`)
      .subscribe((timeEntries) => {
        this.setTimeEntries(timeEntries);
      });
  }

  updateTimeEntry(updateTimeEntry: TimeEntry) {
    this.http
      .post<TimeEntry>(`${this.baseUrl}/time-entries`, updateTimeEntry)
      .subscribe((timeEntry) => {
        this.setTimeEntry(timeEntry);
        const index = this.timeEntries.findIndex(
          (te) => te.id === timeEntry.id
        );
        this.timeEntries[index] = timeEntry;
        this.timeEntriesChanged.next(this.timeEntries.slice());
      });
  }

  deleteTimeEntry(id: number) {
    this.http
      .delete<Boolean>(`${this.baseUrl}/time-entries`)
      .subscribe((isDeleted) => {
        if (isDeleted) {
          const index = this.timeEntries.findIndex((te) => te.id === id);
          this.timeEntries.splice(index, 1);
          this.timeEntriesChanged.next(this.timeEntries.slice());
        }
      });
  }
}
