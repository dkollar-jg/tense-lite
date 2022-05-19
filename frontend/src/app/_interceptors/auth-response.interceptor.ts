import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AuthResponseInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // TODO: update deprecated tap
      tap(
        (_) => {},
        (error: any) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            console.log('Session expired');
            this.authService.logout();
          } else if (
            error instanceof HttpErrorResponse &&
            error.status === 403
          ) {
            console.log('Unauthorized request');
          } else if (
            error instanceof HttpErrorResponse &&
            error.status === 503
          ) {
            console.log('Server is down...');
            this.authService.logout();
          }
        }
      )
    );
  }
}
