import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { ReminderFbService } from '../../services/reminder-fb.service';
import { Reminder } from '../../models/Reminder';
import { AuthService } from '../../services/auth.service';
import { DataService } from "../../services/data.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ScheduleComponent implements OnInit {
  private subscription: Subscription;

  private reminders: any[] = [];
  reminder: Reminder;
  notificationGranted: boolean;

  constructor(
    private reminderService: ReminderFbService,
    public dialog: MatDialog,
    private authService: AuthService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    //subscribing on changes of notificationGranted
    this.dataService.currentnNotificationGranted.subscribe(granted => this.notificationGranted = granted);

    this.authService.afAuth.authState.subscribe(user => {
      if (user) { // check authorized of user
        //check every minute of availability current reminder
        this.subscription = TimerObservable.create(1000, 60000).subscribe(t => {
          console.log('tick');
          this.reminderService.getReminders().subscribe(reminders => { //get list of reminders
            this.reminders = reminders;
          });

          this.showCurrentReminder();
        });
      }
    });

  }


  showCurrentReminder() {
    let nowDateTime: Date = new Date(new Date().getFullYear(), new Date().getMonth(),
      new Date().getDate(), new Date().getHours(), new Date().getMinutes()); //create current date

    //searching of current reminder
    this.reminders.forEach(reminder => {
      if (reminder.dateTimeOfRemind === nowDateTime.getTime()) {
        this.reminder = reminder;
        this.notify(this.reminder.title, this.reminder.description);
        this.openDialog();
      }
    });
  }

  //show notification
  notify(title: string, description: string) {

    var options = {
      body: description,
      icon: '/assets/icons/reminder-notify.png',
    }

    if (this.notificationGranted) {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification(title, options);
      });
    }
    console.log(this.notificationGranted);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ScheduleDialog, {
      width: '250px',
      data: { reminder: this.reminder }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}


//Component of dialog (entry component)
@Component({
  selector: 'schedule-dialog',
  templateUrl: './schedule-dialog.html',
  encapsulation: ViewEncapsulation.None
})
export class ScheduleDialog {

  constructor(
    public dialogRef: MatDialogRef<ScheduleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}