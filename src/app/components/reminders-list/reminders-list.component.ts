import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Reminder } from '../../models/Reminder';

@Component({
  selector: 'app-reminders-list',
  templateUrl: './reminders-list.component.html',
  styleUrls: ['./reminders-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RemindersListComponent implements OnInit {

  reminders: Reminder[];

  constructor(
    public  dataService: DataService,
  ) { }

  ngOnInit() {
    this.reminders = this.dataService.getReminders();
  }

  removeReminder(reminder) {
    this.dataService.removeReminder(reminder);
  }
}
