import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { User } from '../../../_models/user.model';
import { UsersService } from '../../../_services/users.service';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  bsModalRef: BsModalRef;
  subscription: Subscription;
  users: User[];

  constructor(
    private modalService: BsModalService,
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
    const newUser = {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      isAdmin: false,
    };
    const initialState: ModalOptions = {
      initialState: {
        user: newUser,
      },
    };
    this.bsModalRef = this.modalService.show(UserModalComponent, initialState);
    this.bsModalRef.content.userEvent.subscribe((user: User) => {
      this.usersService.createUser(user);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
