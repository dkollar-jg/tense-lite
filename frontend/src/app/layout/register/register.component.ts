import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  }

  submitHandler(): void {
    this.http
      .post(
        'http://localhost:8080/api/auth/register',
        this.registerForm.getRawValue()
      )
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
