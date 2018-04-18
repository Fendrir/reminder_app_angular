import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ReminderFbService } from './services/reminder-fb.service';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';
import { MatSnackBar } from '@angular/material';
import { NgServiceWorker, NgPushRegistration } from '@angular/service-worker';    //npm install --save @angular/service-worker@"~1.0.0-beta"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loggedInPseudo: string;
  loggedInUser: string;
  period: string;
  notificationGranted: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private reminderService: ReminderFbService,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private ngsw: NgServiceWorker
  ) {}


  ngOnInit() {

    // Checking notification access
    // ask the user for permission
    Notification.requestPermission(permission => {
      if (permission === 'granted')
        this.notificationGranted = true;
        this.dataService.changeNotificationGranted(this.notificationGranted);
    });

    // Checking SW Update Status
    this.ngsw.updates.subscribe(update => {
      if (update.type == 'pending') {
        const sb = this.snackBar.open('There is an update available', 'Install Now', {duration: 4000});
        sb.onAction().subscribe( () => {
          this.ngsw.activateUpdate(update.version).subscribe(event => {
            console.log('The App was updated');
            location.reload();
          });
        });
      }
    });
    this.ngsw.checkForUpdate();

    // Cheking NetWork Status
    this.updateNetworkStatusUI();
    window.addEventListener('online', this.updateNetworkStatusUI);
    window.addEventListener('offline', this.updateNetworkStatusUI);


    // get user email
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.loggedInUser = auth.email;
      }
    });

    // subscribing on changes of period
    this.dataService.currentPeriod.subscribe(period => this.period = period);
    // subscribing on changes of notificationGranted
    this.dataService.currentnNotificationGranted.subscribe(granted => this.notificationGranted = granted);

    // ---------------------------------------
    // ----------- Installation --------------
    // ---------------------------------------
    if ((navigator as any).standalone == false ) {
      // this is an iOS device and we are  in the browser
      this.snackBar.open('You can install this App to the Home Screen', null, {duration: 5000});    
    }

    if ((navigator as any).standalone == undefined ) {
      // It's not iOS
      if (window.matchMedia('(display-mode: browser)').matches) {
        // We are in the browser
        window.addEventListener('beforeinstallprompt', event => {
          event.preventDefault();
          const sb = this.snackBar.open('Do you want to install this application', 'Install', {duration: 5000});
          sb.onAction().subscribe( () => {
            (event as any).prompt();
            (event as any).userChoice.then(result => {
              if (result.outcome == 'dismissed') {
                // TODO: Track no installation
              } else {
                // TODO: It was installed
              }
            });
          });
          return false;
        });
      }
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  setPeriod(period: string) {
    this.period = period;
    this.dataService.changePeriod(this.period);
  }

  updateNetworkStatusUI() {
    if (navigator.onLine) {
      // You might be oline
      (document.querySelector('body') as any).style = '';
    } else {
      // OFFLINE
      (document.querySelector('body') as any).style = 'filter: grayscale(1)';
    }
  }
}
