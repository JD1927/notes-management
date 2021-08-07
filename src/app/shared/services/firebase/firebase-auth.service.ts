import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
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
    let credentials = undefined;
    try {
      credentials = await this.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      return undefined;
    }
    return credentials;
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    let credentials = undefined;
    try {
      credentials = await this.auth.createUserWithEmailAndPassword(email, password);
      await this.updateUserData(credentials.user);
      this.sendEmailVerification();
    } catch (error) {
      console.log(error)
    }
    return credentials;
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

  async updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      id: user.uid,
      name: '',
      apartment: '',
      email: user.email,
      roles: {
        isResident: false,
        isAdmin: false,
        isGuard: false,
        isSuperAdmin: false,
      }
    };
    return userRef.set(data, { merge: true });
  }

  isUserAdmin(userUid: string) {
    return this.afs.doc<User>(`users/${userUid}`).valueChanges();
  }

  async sendEmailVerification(): Promise<void> {
    return (await this.auth.currentUser)?.sendEmailVerification();
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await this.auth.sendPasswordResetEmail(email);
    } catch (error) {
      console.error(error);
    }
  }
}
