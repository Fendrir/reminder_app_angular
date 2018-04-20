import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Reminder } from '../models/Reminder';
import { AuthService } from '../services/auth.service';
import 'rxjs/add/operator/map';
import { query } from '@angular/core/src/animation/dsl';

@Injectable()
export class ReminderFbService {

  userId: string;

  remindersRef: AngularFireList<any>;
  reminders: Observable<any[]>;

  constructor(private afDb: AngularFireDatabase, private authService: AuthService) {

    this.authService.afAuth.authState.subscribe(user => {
      if (user) this.userId = user.uid;
    });
  }


  getReminders() {

    if (!this.userId) return;


    this.remindersRef = this.afDb.list(`reminders/${this.userId}`);

    this.reminders = this.remindersRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

    return this.reminders;
  }

  addReminder(reminder: Reminder) {
    this.remindersRef.push(reminder);
  }

  removeReminder(id: string) {
    this.remindersRef.remove(id);
  }

}
