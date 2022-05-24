import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from '../../../_models/user.model';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {
  @Output() userEvent = new EventEmitter();

  submitted = false;
  user: User;
  userForm: FormGroup;

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createUserForm();
  }

  createUserForm() {
    this.userForm = this.fb.group({
      firstName: [
        this.user.firstName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
        ],
      ],
      lastName: [
        this.user.lastName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(120),
        ],
      ],
      email: [
        this.user.email,
        [
          Validators.required,
          Validators.email,
          Validators.minLength(2),
          Validators.maxLength(255),
        ],
      ],
      isAdmin: this.user.isAdmin,
      enabled: this.user.enabled,
    });
  }

  submitHandler() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    const userFormValue = {
      firstName: this.userForm.value.firstName.trim(),
      lastName: this.userForm.value.lastName.trim(),
      email: this.userForm.value.email.trim(),
      isAdmin: this.userForm.value.isAdmin,
      enabled: this.userForm.value.enabled,
    };
    Object.assign(this.user, userFormValue);
    this.userEvent.emit(this.user);
    this.bsModalRef.hide();
  }
}
