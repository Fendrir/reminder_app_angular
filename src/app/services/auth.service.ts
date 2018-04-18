import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

import { User } from '@firebase/auth';

// test poussage de données suplémentaire sur les users
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
// fin de test

@Injectable()
export class AuthService {

  // test données utilisateur sup
  userInfoSupDb: AngularFireList<any>;
  userInfo: Observable<any[]>;
  // fin de test

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    db: AngularFireDatabase
  ) {
    // test conexion bdd
    this.userInfoSupDb = db.list(`userProfile`);
    this.userInfo = this.userInfoSupDb.snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    });
    // fin de test

   }

  // Login User
  // login(email: string, password: string) {
  //   return new Promise((resolve, reject) => {
  //     this.afAuth.auth.signInWithEmailAndPassword(email, password)
  //       .then(userData => resolve(userData),
  //             err => reject(err));
  //   });
  // }

  login(email: string, password: string): Promise<User> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  // Check User Status
  getAuth() {
    return this.afAuth.authState.map(auth => auth);
  }

  // Reset Password

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => console.log('sent Password Reset Email!'))
      .catch((error) => console.log(error));
  }

  // Logout User
  logout() {
    this.afAuth.auth.signOut();
  }

  // Sign in with Google
  // gmailLogin() {
  //   this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  // }

  async gmailLogin(): Promise<User> {
    try {
      const newUser: User = await firebase
        .auth()
        .signInWithRedirect(new firebase.auth.GoogleAuthProvider());

      await firebase
        .database()
        .ref(`/userProfile/${newUser.uid}/email`)
        .set(newUser.email);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  // Register user

  // register(email: string, password: string, pseudo: string) {
  //   return new Promise((resolve, reject) => {
  //     this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  //       .then(userData => resolve(userData), err => reject(err));
  //   });
  // }

  async register(
    email: string,
    password: string,
    pseudo: string,
    simpleUser: boolean,
    adminUser: boolean
  ): Promise<User> {
    try {
      const newUser: User = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
        // this.userInfoSupDb.push({
        //   pseudo: pseudo,
        //   simpleUser : simpleUser
        // });

      await firebase
        .database()
        .ref(`/userProfile/${newUser.uid}/email`)
        .set(email);
      await firebase
        .database()
        .ref(`/userProfile/${newUser.uid}/pseudo`)
        .set(pseudo);
      await firebase
        .database()
        .ref(`/userProfile/${newUser.uid}/simpleUser`)
        .set(simpleUser);
      await firebase
        .database()
        .ref(`/userProfile/${newUser.uid}/adminUser`)
        .set(adminUser);
      return newUser;
    } catch (error) {
      throw error;
    }
  }
}
