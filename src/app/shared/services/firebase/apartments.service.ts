import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Apartment } from '../../models/apartments.model';
import { BaseService } from './base.service';

@Injectable({
	providedIn: 'root',
})
export class ApartmentsService extends BaseService<Apartment> {
	constructor(afs: AngularFirestore) {
		super('apartments', afs);
	}
}
