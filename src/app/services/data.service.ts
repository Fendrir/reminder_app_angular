import { Injectable } from '@angular/core';
import { Reminder } from '../models/Reminder';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
  private searchSource = new BehaviorSubject<string>('');//for binding between components "toolbar" and "reminders-list"
  currentSearch = this.searchSource.asObservable();//for binding between components "toolbar" and "reminders-list"

  private period = new BehaviorSubject<string>('all');//for binding between components "sideNav" and "reminders-list"
  currentPeriod = this.period.asObservable();//for binding between components "sideNav" and "reminders-list"

  private notificationGranted = new BehaviorSubject<boolean>(null);//for checking of notification granted
  currentnNotificationGranted = this.notificationGranted.asObservable();//for checking of notification granted

  constructor() {
  }


  //for binding between components "toolbar" and "reminders-list"
  changeSearchText(searchText: string) {
    this.searchSource.next(searchText);
  }

  //for binding between components "sideNav" and "reminders-list"
  changePeriod(period: string) {
    this.period.next(period);
  }

  //for checking of notification granted 
  changeNotificationGranted(notificationGranted: boolean) {
    this.notificationGranted.next(notificationGranted);
  }


  /*
  ----------------------------------------------------------------------
  --------------------- FOR LOCAL STORAGE ------------------------------
  ----------------------------------------------------------------------
  */

  reminders: Reminder[] = [];

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
