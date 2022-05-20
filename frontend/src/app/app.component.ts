import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './_models/user.model';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    let user;
    if (userString) {
      user = JSON.parse(userString);
    }
    if (token && user) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      this.authService.setCurrentUser(user);
    }
  }
}
