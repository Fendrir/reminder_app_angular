import { Pipe, PipeTransform } from '@angular/core';
import { Reminder } from "../models/Reminder";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(reminders: Reminder[], searchText: string): Reminder[] {
    if (!reminders) return [];
    if (!searchText) return reminders;
    searchText = searchText.toLowerCase();
    return reminders.filter(reminders => {
      return reminders.title.toLowerCase().includes(searchText) //search by title
            || reminders.description.toLowerCase().includes(searchText) //search by description
            || reminders.tags.toString().toLowerCase().includes(searchText);  //search by tags
    });
  }

}
