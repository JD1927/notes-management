import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
	AngularFirestore,
	AngularFirestoreDocument,
} from '@angular/fire/firestore';
import firebase from 'firebase';
import { first } from 'rxjs/operators';
import { Roles, SignUpRequest, User } from '../../models/auth.model';
import { TranslationService } from '../translation/translation.service';
import { BaseService } from './base.service';

@Injectable({
	providedIn: 'root',
})
export class FirebaseAuthService extends BaseService<User> {
	public user!: firebase.User;

	constructor(
		public auth: AngularFireAuth,
		public afs: AngularFirestore,
		private translate: TranslationService,
	) {
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

	async createUserWithEmailAndPassword(request: SignUpRequest) {
		let credentials = undefined;
		try {
			credentials = await this.auth.createUserWithEmailAndPassword(
				request.email,
				request.password,
			);
			const user = {
				...credentials.user,
				phoneNumber: request.phoneNumber,
			};
			await this.updateUserData(user);
			this.sendEmailVerification();
		} catch (e) {
			throw new Error(this.translate.translate('error.generic'));
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
		const userRef: AngularFirestoreDocument<any> = this.afs.doc(
			`users/${user.uid}`,
		);
		const data: User = {
			id: user.uid,
			name: '',
			apartment: '',
			email: user.email,
			phoneNumber: user.phoneNumber,
			roles: {
				isResident: false,
				isAdmin: false,
				isGuard: false,
				isSuperAdmin: false,
			},
		};
		return userRef.set(data, { merge: true });
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

	async checkUserRole(roles: Roles): Promise<boolean> {
		let result = false;
		const userRef = await this.getCurrentUser();
		const user = await this.get(userRef?.uid as string)
			.pipe(first())
			.toPromise();
		const rolesKeys: string[] = [...Object.keys(roles)];
		const userRoles = { ...user.roles };
		rolesKeys.forEach((role: string) => {
			if (userRoles[role as keyof Roles] === true) {
				result = true;
			}
		});
		return result;
	}
}
