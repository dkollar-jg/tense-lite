import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl;
  decodedToken: any;
  jwtHelper = new JwtHelperService();

  authenticatedChanged = new Subject<boolean>();
  currentUserChanged = new Subject<User | null | undefined>();

  private authenticated = false;
  private currentUser: User | null | undefined;

  constructor(private http: HttpClient, private router: Router) {}

  setAuthenticated(isAuthenticated: boolean) {
    this.authenticated = isAuthenticated;
    this.authenticatedChanged.next(this.authenticated);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getCurrentUserId() {
    return localStorage.getItem('userId') || null;
  }

  setCurrentUser(user?: User | null | undefined) {
    this.currentUser = user;
    this.currentUserChanged.next(this.currentUser);
  }

  login(model: any) {
    return this.http
      .post(`${this.baseUrl}/auth/login`, model, { withCredentials: true })
      .subscribe((response: any) => {
        this.setAuthenticated(true);
        this.setCurrentUser(response.user);
        console.log(this.currentUser);
        this.decodedToken = this.jwtHelper.decodeToken(response.accessToken);
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('userId', response.user.id);
        this.router.navigate(['/']);
      });
  }

  logout(): void {
    this.setAuthenticated(false);
    this.setCurrentUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.decodedToken = null;
    this.router.navigate(['/login']);
  }

  isAuthorized(allowedRoles: string[]): boolean {
    let isMatch = false;
    const userRoles = ['BASIC'];
    if (this.currentUser?.isAdmin) {
      userRoles.push('ADMIN');
    }
    allowedRoles.forEach((role) => {
      if (userRoles.includes(role)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }
}
