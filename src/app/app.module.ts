import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgServiceWorker } from "@angular/service-worker";

//AngularFire imports
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth";

//Services imports
import { DataService } from './services/data.service';
import { ReminderFbService } from "./services/reminder-fb.service";
import { AuthService } from './services/auth.service';
import { AuthGuard } from "./guards/auth.guard";


import { FilterPipe } from './pipes/filter.pipe';

//component imports
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RemindersListComponent } from './components/reminders-list/reminders-list.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { TagsBarComponent } from './components/tags-bar/tags-bar.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ScheduleDialog } from './components/schedule/schedule.component';
import { LoginComponent } from './components/login/login.component';
import { TabRegLogComponent } from './components/tab-reg-log/tab-reg-log.component';
import { RegistrationComponent } from './components/registration/registration.component';

//Material Design imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatIconModule, MatInputModule,
  MatToolbarModule, MatCardModule, MatDatepickerModule, 
  MatNativeDateModule, MatChipsModule, MatSidenavModule,
  MatListModule, MatLineModule, MatDialogModule, MatTabsModule,
  MatSnackBarModule, MatProgressSpinnerModule
} from '@angular/material';



export const firebaseconfig = {
  apiKey: "AIzaSyAvBhXxG24vizj1lrptds4sjIa7KYcZMJ8",
  authDomain: "projetevent-ffe09.firebaseapp.com",
  databaseURL: "https://projetevent-ffe09.firebaseio.com",
  projectId: "projetevent-ffe09",
  storageBucket: "",
  messagingSenderId: "265431047224"

}


const routes: Routes = [
  { path: '', component: RemindersListComponent, canActivate:[AuthGuard] },
  { path: 'reminder', component: ReminderComponent, canActivate:[AuthGuard] },
  { path: 'login', component: TabRegLogComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    RemindersListComponent,
    ReminderComponent,
    TagsBarComponent,
    FilterPipe,
    ScheduleComponent,
    LoginComponent,
    ScheduleDialog,
    TabRegLogComponent,
    RegistrationComponent
  ],
  entryComponents: [
    ScheduleDialog
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseconfig),
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatIconModule, MatInputModule, MatChipsModule,
    MatToolbarModule, MatCardModule, MatNativeDateModule, MatDatepickerModule,
    FormsModule, ReactiveFormsModule, MatSidenavModule, MatListModule, MatLineModule,
    MatDialogModule, MatTabsModule, MatSnackBarModule, MatProgressSpinnerModule
  ],
  providers: [
    DataService, AngularFireDatabase, AngularFireAuth, ReminderFbService, 
    AuthService,AuthGuard, NgServiceWorker
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
