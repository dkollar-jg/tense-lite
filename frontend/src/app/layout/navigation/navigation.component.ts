import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  authenticated = false;
  subscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authenticated = this.authService.isAuthenticated();
    this.subscription = this.authService.authenticatedChanged.subscribe(
      (isAuthenticated: boolean) => {
        this.authenticated = isAuthenticated;
      }
    );
  }

  logout(): void {
    this.authService.logout();
  }
}
