import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Note } from '../../models/notes.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService extends BaseService<Note> {

  _notes$: Subscription = new Subscription();

  constructor(afs: AngularFirestore) {
    super('notes', afs);
  }

  getNotesByApartment(aptoID: string): Observable<Note[]> {
    return this.afs.collection<Note>(
      'notes', ref => ref.where('aptoID', '==', aptoID)
    ).valueChanges();
  }
}
