import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { TimeEntry } from '../_models/time-entry.model';
import { User } from '../_models/user.model';
import { timeEntriesService } from '../_services/time-entries.service';

@Injectable()
export class TimeEntryListByUserResolver
  implements Resolve<TimeEntry[] | null>
{
  constructor(private timeEntriesService: timeEntriesService) {}

  resolve(): Observable<TimeEntry[] | null> {
    const userId = localStorage.getItem('userId') || 0;
    return this.timeEntriesService
      .fetchTimeEntriesByUserId(+userId)
      .pipe(
        catchError((error) => {
          console.log(error);
          return of(null);
        })
      );
  }
}
