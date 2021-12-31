import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { Note } from '../../models/notes.model';
import { BaseService } from './base.service';

@Injectable({
	providedIn: 'root',
})
export class NotesService extends BaseService<Note> {
	_notes$: Subscription = new Subscription();

	constructor(afs: AngularFirestore) {
		super('notes', afs);
	}

	getNotesByApartment(aptoID: string): Observable<Note[]> {
		const createdAt: Date = moment().hours(0).minutes(0).seconds(0).toDate();
		return this.afs
			.collection<Note>('notes', (ref) =>
				ref
					.where('aptoID', '==', aptoID)
					.where('dateAt', '>=', createdAt.getTime()),
			)
			.valueChanges();
	}

	getNotesByUser(userID: string): Observable<Note[]> {
		const createdAt: Date = moment().hours(0).minutes(0).seconds(0).toDate();
		return this.afs
			.collection<Note>('notes', (ref) =>
				ref
					.where('userID', '==', userID)
					.where('dateAt', '>=', createdAt.getTime()),
			)
			.valueChanges();
	}

	async deleteNotesByApartment(aptoID: string): Promise<void> {
		const createdAt: Date = moment().hours(0).minutes(0).seconds(0).toDate();
		const notesRef = await this.afs
			.collection<Note>('notes', (ref) =>
				ref
					.where('aptoID', '==', aptoID)
					.where('dateAt', '<', createdAt.getTime()),
			)
			.get()
			.toPromise();
		notesRef.docs.forEach((doc) => this.delete(doc.id));
	}
}
