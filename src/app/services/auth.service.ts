import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs";
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  //Login User
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
              err => reject(err));
    });
  }
  
  //Check User Status
  getAuth() {
    return this.afAuth.authState.map(auth => auth);
  }

  //Logout User
  logout() {
    this.afAuth.auth.signOut();
  }

  //Sign in with Google
  gmailLogin() {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  


  //Register user
  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err));
    });
  }
}
