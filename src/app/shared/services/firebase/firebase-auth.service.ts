import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  public user!: firebase.User;

  constructor(public auth: AngularFireAuth) {
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    let result = undefined;
    try {
      result = await this.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    let result = undefined;
    try {
      result = await this.auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
    return result;
  }

  async signOut() {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrentUser() {
    return await this.auth.authState.pipe(first()).toPromise();
  }
}
