import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs";
import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

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
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(userData => resolve(userData),
              err => reject(err));
    });
  }

  //Register user
  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err));
    });
  }
}
