import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { first } from 'rxjs/operators';
import { User } from '../../models/auth.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService extends BaseService<User> {

  public user!: firebase.User;

  constructor(public auth: AngularFireAuth, afs: AngularFirestore) {
    super('users', afs);
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    let result = undefined;
    try {
      result = await this.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      return undefined;
    }
    return result;
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    let result = undefined;
    try {
      result = await this.auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      return undefined;
    }
    return result;
  }

  async signOut(): Promise<void> {
    try {
      await this.auth.signOut();
    } catch (error) {
      return;
    }
  }

  async getCurrentUser() {
    return await this.auth.authState.pipe(first()).toPromise();
  }
}
