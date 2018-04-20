import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit {

  hide = true; // for password input

  email: string;
  password: string;
  pseudo: string;

  simpleUser: boolean;
  adminUser: boolean;

  // form validators
  emailFormControl = new FormControl('', [
    Validators.email
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  pseudoFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.emailFormControl.valid && this.passwordFormControl.valid && this.pseudoFormControl.valid) {
      this.simpleUser = true;
      this.adminUser = false;
      this.authService.register(this.email, this.password, this.pseudo, this.simpleUser, this.adminUser)
        .then((res) => {
          console.log('Registered and Loged in');
          this.router.navigate(['/']);
        })
        .catch((err) => {
          console.log('Error');
          this.router.navigate(['/login']);
        });
    }
  }

}
