import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Reminder } from '../../models/Reminder';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ReminderComponent implements OnInit {
  // form validators
  titleFormControl = new FormControl('', [
    Validators.required,
  ]);
  descriptionFormControl = new FormControl('', [
    Validators.required,
  ]);
  dateFormControl = new FormControl('', [
    Validators.required,
  ]);
  timeFormControl = new FormControl('', [
    Validators.required,
  ]);

  //variables
  reminder: Reminder = {
    title: '',
    description: '',
    dateTimeOfRemind: null
  };
  reminderDate: Date; //binding with datetimepicker
  reminderTime: string; //binding with input of "time" type
  minDate = new Date(); //a minimum date (today) for datetimepicker (because it can't create a reminder in the past)


  constructor(
    private dataService: DataService,
    private router: Router
  ) {  }

  ngOnInit() {
  }

  //to create a date for the property "Reminder.dateTimeOfRemind"
  createFullDateReminder(reminderDate: Date, reminderTime: string) {
      return new Date(Date.parse(reminderDate.toDateString() + " " + reminderTime));
  }

  onSubmit({ value, valid }: { value: Reminder, valid: boolean }) {
    //checking for an empty value in input of "time" type. This is for to create a valid date
    if (this.reminderTime !== undefined) {
      this.reminder.dateTimeOfRemind = this.createFullDateReminder(this.reminderDate, this.reminderTime);

      this.dataService.addReminder(this.reminder)
      this.router.navigate(['/']);
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

}
