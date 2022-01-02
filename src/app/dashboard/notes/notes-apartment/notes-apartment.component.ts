import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Apartment } from 'src/app/shared/models/apartments.model';
import { User } from 'src/app/shared/models/auth.model';
import { Note } from 'src/app/shared/models/notes.model';
import { ApartmentsService } from 'src/app/shared/services/firebase/apartments.service';
import { FirebaseAuthService } from 'src/app/shared/services/firebase/firebase-auth.service';
import { NotesService } from 'src/app/shared/services/firebase/notes.service';
import { TranslationService } from 'src/app/shared/services/translation/translation.service';

@Component({
	selector: 'nm-notes-apartment',
	templateUrl: './notes-apartment.component.html',
	styleUrls: ['./notes-apartment.component.scss'],
})
export class NotesApartmentComponent implements OnInit {
	form!: FormGroup;
	isLoading!: boolean;
	notes: Note[] = [];
	_notes$: Subscription = new Subscription();
	_apartments$: Subscription = new Subscription();
	apartments: Apartment[] = [];
	isFirstSearch!: boolean;

	constructor(
		private notesService: NotesService,
		private aptoService: ApartmentsService,
		private authService: FirebaseAuthService,
		private fb: FormBuilder,
		public translation: TranslationService,
	) {}

	ngOnInit(): void {
		this.createForm();
		this.getApartments();
	}

	createForm(): void {
		this.form = this.fb.group({
			apartment: ['', [Validators.required]],
		});
	}

	ngOnDestroy(): void {
		this._notes$.unsubscribe();
	}

	getNoteList(): void {
		this.isLoading = true;
		this._notes$ = this.notesService.list().subscribe((res) => {
			this.notes = [...res];
			this.isLoading = false;
		});
	}

	getApartments(): void {
		this.isLoading = true;
		this._apartments$ = this.aptoService.list().subscribe((res) => {
			this.apartments = [...res];
			this.isLoading = false;
		});
	}

	getNotesByApartment(aptoID: string): void {
		this.isLoading = true;
		this.notesService.getNotesByApartment(aptoID).subscribe((res) => {
			this.notes = [...res];
			this.isLoading = false;
			this.notesService.deleteNotesByApartment(aptoID);
		});
	}

	onSubmit(): void {
		if (this.form.invalid) {
			return;
		}
		this.isFirstSearch = true;
		const { apartment } = this.form.value;
		this.getNotesByApartment(apartment);
	}

	async onMessageOwner(note: Note): Promise<void> {
		const noteOwner: User = await this.authService
			.get(note?.userID)
			.pipe(first())
			.toPromise();

		if (noteOwner?.phoneNumber) {
			window.open(`https://wa.me/57${noteOwner?.phoneNumber}`, '_blank');
		}
	}
}
