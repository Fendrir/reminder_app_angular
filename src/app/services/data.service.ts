import { Injectable } from '@angular/core';
import { Reminder } from '../models/Reminder';

@Injectable()
export class DataService {

  reminders: Reminder[];

  constructor() {
  }

  //return list of reminders from local storage
  getReminders() {
    if (localStorage.getItem('reminders') === null) {
      this.reminders = [];
    } else {
      this.reminders = JSON.parse(localStorage.getItem('reminders'));
    }

    return this.reminders;
  }

  //add new reminder to local storage
  addReminder(reminder: Reminder) {
    let reminders;

    if (localStorage.getItem('reminders') === null) {
      reminders = [];
      reminders.unshift(reminder);
      localStorage.setItem('reminders', JSON.stringify(reminders));
    } else {
      reminders = JSON.parse(localStorage.getItem('reminders'));
      reminders.unshift(reminder);
      localStorage.setItem('reminders', JSON.stringify(reminders));
    }
  }

  //remove reminder from local storage
  removeReminder(reminder: Reminder) {
    for (let i = 0; i < this.reminders.length; i++) {
      if (reminder == this.reminders[i]) {
        this.reminders.splice(i, 1);
        localStorage.setItem('reminders', JSON.stringify(this.reminders));
      }
    }
  }

}
