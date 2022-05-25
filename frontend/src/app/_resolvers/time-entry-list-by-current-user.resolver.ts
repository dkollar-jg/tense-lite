import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { TimeEntry } from '../_models/time-entry.model';
import { AuthService } from '../_services/auth.service';
import { TimeEntriesService } from '../_services/time-entries.service';

@Injectable()
export class TimeEntryListByCurrentUserResolver
  implements Resolve<TimeEntry[] | null>
{
  constructor(
    private authService: AuthService,
    private timeEntriesService: TimeEntriesService
  ) {}

  resolve(): Observable<TimeEntry[] | null> {
    const userId = this.authService.getCurrentUser()?.id || 0;
    const criteria = JSON.parse(
      localStorage.getItem('currentUserTimeEntryCriteria') || '{}'
    );
    if (!criteria.userId) {
      criteria.userId = userId;
      criteria.enabled = true;
    }
    this.timeEntriesService.setTimeEntryCriteria(criteria);
    return this.timeEntriesService.searchTimeEntries(criteria).pipe(
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }
}
