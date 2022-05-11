import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit {
  constructor(public auth: AuthService, private usersService: UsersService) {}

  ngOnInit(): void {
    // this.auth.user$.subscribe(result => {
    //   console.log(result);
    //   const user = this.usersService.getAuthenticatedUser(1).subscribe(result => {
    //     console.log(result);
    //   });
    // });
  }
}
