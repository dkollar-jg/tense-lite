import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  subscription: Subscription;
  users: User[];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.subscription = this.userService.usersChanged.subscribe((users: User[]) => this.users = users);
    this.userService.fetchUsers();
  }

}
