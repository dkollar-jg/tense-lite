import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { TimeEntry } from '../_models/time-entry.model';
import { TimeEntriesService } from '../_services/time-entries.service';

@Injectable()
export class AdminTimeEntryListResolver implements Resolve<TimeEntry[] | null> {
  constructor(private timeEntriesService: TimeEntriesService) {}

  resolve(): Observable<TimeEntry[] | null> {
    const criteria = JSON.parse(
      localStorage.getItem('adminTimeEntryCriteria') || '{}'
    );
    this.timeEntriesService.setTimeEntryCriteria(criteria);
    return this.timeEntriesService.searchTimeEntries(criteria).pipe(
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }
}
