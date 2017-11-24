import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { DataService } from '../../services/data.service';
import { Reminder } from '../../models/Reminder';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ScheduleComponent implements OnInit {
  private subscription: Subscription;

  private reminders: Reminder[];
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
    //check every minute of availability current reminder
    this.subscription = TimerObservable.create(1000, 60000).subscribe(t => {
      this.showCurrentReminder();
    });
  }


  showCurrentReminder() {
    let nowDateTime: Date = new Date(new Date().getFullYear(), new Date().getMonth(),
                            new Date().getDate(), new Date().getHours(), new Date().getMinutes()); //create current date

    //searching of current reminder
    this.dataService.getReminders().forEach(reminder => {

      if (new Date(reminder.dateTimeOfRemind).getTime() == nowDateTime.getTime()) {
        alert("ALARM!!!" + "\n\nTitle: " + reminder.title + "\n\nDescription: " + reminder.description + "\n\nNow: " + new Date(reminder.dateTimeOfRemind).toString());
      }

    });
  }
}
