import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ReminderFbService } from '../../services/reminder-fb.service';
import { Reminder } from '../../models/Reminder';
import { ActivatedRoute } from '@angular/router';
import { concat } from 'rxjs/operator/concat';

@Component({
  selector: 'app-reminders-list',
  templateUrl: './reminders-list.component.html',
  styleUrls: ['./reminders-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RemindersListComponent implements OnInit {

  reminders: any[] = [];

  searchText: string;
  period: string;

  path: string;

  constructor(
    private dataService: DataService,
    private reminderService: ReminderFbService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // subscribing on changes of period
    this.dataService.currentPeriod.subscribe(period => {
      this.period = period;

      // subscribing on geting list of reminders
      this.reminderService.getReminders().subscribe(reminders => {

        // check perio and return list of necessary reminders
        switch (this.period) {
          case 'all': {
            this.reminders = [];
            this.reminders = reminders.reverse();
            break;
          }
          case 'past': {
            this.reminders = [];
            reminders.forEach(element => {
              if (element.dateTimeOfRemind < new Date().getTime()) {// < past
                this.reminders.push(element);
              }
            });
            this.reminders.reverse();
            break;
          }
          case 'future': {
            this.reminders = [];
            reminders.forEach(element => {
              if (element.dateTimeOfRemind > new Date().getTime()) {// > future
                this.reminders.push(element);
              }
            });
            this.reminders.reverse();
            break;
          }
          default:
            this.reminders = reminders.reverse();
        }
      });
    });

    // subscribing on changes of search text
    this.dataService.currentSearch.subscribe(message => this.searchText = message);
  }

  removeReminder(id: string) {
    this.reminderService.removeReminder(id);
  }
}
