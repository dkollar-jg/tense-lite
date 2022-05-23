import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { TimeEntry } from '../_models/time-entry.model';
import { AuthService } from '../_services/auth.service';
import { timeEntriesService } from '../_services/time-entries.service';

@Injectable()
export class TimeEntryListByUserResolver
  implements Resolve<TimeEntry[] | null>
{
  constructor(
    private authService: AuthService,
    private timeEntriesService: timeEntriesService
  ) {}

  resolve(): Observable<TimeEntry[] | null> {
    const userId = this.authService.getCurrentUser()?.id || 0;
    const criteria = JSON.parse(
      localStorage.getItem('timeEntryCriteria') || '{}'
    );
    if (!criteria.userId) {
      criteria.userId = userId;
    }
    return this.timeEntriesService.searchTimeEntries(criteria).pipe(
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );
  }
}
