import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  hide = true;//for password input

  email: string;
  password: string;

  // form validators
  emailFormControl = new FormControl('', [
    Validators.email
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.emailFormControl.valid && this.passwordFormControl.valid) {

      this.authService.login(this.email, this.password)
        .then((res) => {
          console.log("Loged in");
          this.router.navigate(['/']);
        })
        .catch((err) => {
          console.log("Error");
          this.router.navigate(['/login']);
        });
    }
  }
}
