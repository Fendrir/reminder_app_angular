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

  searchText: string;

  constructor(
    public  dataService: DataService,
  ) { }

  ngOnInit() {
    this.reminders = this.dataService.getReminders();
    
    //subscribing on changes of search text
    this.dataService.currentSearch.subscribe(message => this.searchText = message);
  }

  removeReminder(reminder) {
    this.dataService.removeReminder(reminder);
  }
}
