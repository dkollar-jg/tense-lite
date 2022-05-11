import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../_models/user.model';
import { UsersService } from '../../../_services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  subscription: Subscription;
  user: User;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data.user;
    });
    this.subscription = this.usersService.userChanged.subscribe(
      (user: User) => {
        console.log('user changed');
        this.user = user;
      }
    );
  }
}
