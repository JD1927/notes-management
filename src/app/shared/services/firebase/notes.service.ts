import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { Note } from '../../models/notes.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService extends BaseService<Note> {

  constructor(afs: AngularFirestore) {
    super('notes', afs);
  }
}
