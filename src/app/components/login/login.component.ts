import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  errorMessage = '';
  error: {name: string, message: string} = {name: '', message: ''};
  resetPassword = false;

  hide = true; // for password input

  email: string;
  password: string;

  // form validators
  emailFormControl = new FormControl('', [
    Validators.email
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = {name: '', message: ''};
  }

  onSubmit() {
    if (this.emailFormControl.valid && this.passwordFormControl.valid) {

      this.authService.login(this.email, this.password)
        .then((res) => {
          console.log('Loged in');
          this.router.navigate(['/']);
        })
        .catch((err) => {
          console.log('Error');
          this.router.navigate(['/login']);
        });
    }
  }

  gmailLogin() {
    this.authService.gmailLogin();
  }

  sendResetEmail() {
    this.clearErrorMessage();

    this.authService.resetPassword(this.email)
      .then(() => this.resetPassword = true)
      .catch(_error => {
        this.error = _error;
      });
  }

}
