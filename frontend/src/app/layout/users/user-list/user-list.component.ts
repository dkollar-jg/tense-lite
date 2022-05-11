import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { User } from '../../../_models/user.model';
import { UsersService } from '../../../_services/users.service';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  subscription: Subscription;
  users: User[];

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.users = data.users;
    });
    this.subscription = this.usersService.usersChanged.subscribe(
      (users: User[]) => {
        console.log('users changed');
        this.users = users;
      }
    );
  }

  openUserModal() {
    const modalRef = this.modalService.open(UserModalComponent);
    modalRef.componentInstance.testInput = 'Test Property';
  }
}
