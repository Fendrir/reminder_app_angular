import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataService } from './services/data.service';

import { FilterPipe } from './pipes/filter.pipe';

//component imports
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RemindersListComponent } from './components/reminders-list/reminders-list.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { TagsBarComponent } from './components/tags-bar/tags-bar.component';
import { ScheduleComponent } from './components/schedule/schedule.component';

//Material Desigh imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatIconModule, MatInputModule,
  MatToolbarModule, MatCardModule, MatDatepickerModule, 
  MatNativeDateModule, MatChipsModule
} from '@angular/material';



const routes: Routes = [
  { path: '', component: RemindersListComponent },
  { path: 'reminder', component: ReminderComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    RemindersListComponent,
    ReminderComponent,
    TagsBarComponent,
    FilterPipe,
    ScheduleComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatIconModule, MatInputModule, MatChipsModule,
    MatToolbarModule, MatCardModule, MatNativeDateModule, MatDatepickerModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
