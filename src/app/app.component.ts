import { Component } from '@angular/core';
import { AuthService } from "./services/auth.service";
import { ReminderFbService } from "./services/reminder-fb.service";
import { Router } from "@angular/router";
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loggedInUser: string;
  period: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private reminderService: ReminderFbService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.loggedInUser = auth.email;
      }
    });

    //subscribing on changes of period
    this.dataService.currentPeriod.subscribe(period => this.period = period);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  setPeriod(period: string) {
    this.period = period;
    this.dataService.changePeriod(this.period);
  }
}
