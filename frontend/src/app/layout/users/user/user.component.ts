import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { User } from '../../../_models/user.model';
import { UsersService } from '../../../_services/users.service';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  bsModalRef: BsModalRef;
  subscription: Subscription;
  user: User;

  constructor(
    private modalService: BsModalService,
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

  openUserModal() {
    const initialState: ModalOptions = {
      initialState: {
        user: this.user,
      },
    };
    this.bsModalRef = this.modalService.show(UserModalComponent, initialState);
    this.bsModalRef.content.userEvent.subscribe((user: User) => {
      this.usersService.updateUser(user);
    });
  }
}
