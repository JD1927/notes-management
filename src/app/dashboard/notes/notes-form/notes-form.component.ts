import { first } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/auth.model';
import { Note } from 'src/app/shared/models/notes.model';
import { TimeFormatPipe } from 'src/app/shared/pipes/time-format.pipe';
import { FirebaseAuthService } from 'src/app/shared/services/firebase/firebase-auth.service';
import { NotesService } from 'src/app/shared/services/firebase/notes.service';
import { TranslationService } from 'src/app/shared/services/translation/translation.service';
import { BasicSnackBarService } from 'src/app/shared/services/snackbar/basic-snack-bar.service';

@Component({
	selector: 'nm-notes-form',
	templateUrl: './notes-form.component.html',
	styleUrls: ['./notes-form.component.scss'],
})
export class NotesFormComponent implements OnInit, OnDestroy {
	form!: FormGroup;
	isLoading!: boolean;
	isDesktop!: boolean;
	user!: User;
	note!: Note;
	minDateValue!: Moment;
	maxDateValue!: Moment;
	isDesktop$: Subscription = new Subscription();
	_users$: Subscription = new Subscription();
	_route$: Subscription = new Subscription();

	constructor(
		private fb: FormBuilder,
		private noteService: NotesService,
		private router: Router,
		private dateAdapter: DateAdapter<Moment>,
		private translation: TranslationService,
		private breakPointObserver: BreakpointObserver,
		private timeFormat: TimeFormatPipe,
		private users: FirebaseAuthService,
		private route: ActivatedRoute,
		private basicSnackbar: BasicSnackBarService,
	) {}

	ngOnInit(): void {
		this.setLocale();
		this.createForm();
		this.getParameters();
		this.checkDesktopDevice();
		this.getCurrentUser();
		this.generateDateRanges();
	}

	ngOnDestroy(): void {
		this.isDesktop$.unsubscribe();
		this._users$.unsubscribe();
		this._route$.unsubscribe();
	}

	generateDateRanges(): void {
		this.minDateValue = moment();
		this.maxDateValue = moment().add(1, 'M');
	}

	getParameters(): void {
		this._route$ = this.route.params.subscribe(async (params) => {
			await this.handleNoteID(params?.id);
		});
	}

	async handleNoteID(id: string): Promise<void> {
		if (id === undefined) {
			return;
		}
		this.isLoading = true;
		const note = await this.noteService.get(id).pipe(first()).toPromise();
		this.setFormFields(note);
		this.isLoading = false;
	}

	setFormFields(note: Note): void {
		this.note = { ...note };
		this.form.controls['title'].setValue(note.title);
		this.form.controls['description'].setValue(note.description);
		this.form.controls['date'].setValue(new Date(note.date));
		this.form.controls['time'].setValue(note.timeFormat);
		this.form.updateValueAndValidity();
	}

	getCurrentUser(): void {
		this._users$ = this.users.auth.authState.subscribe(async (userRef) => {
			await this.getUserFromFirestore(userRef?.uid as string);
		});
	}

	async getUserFromFirestore(uid: string): Promise<void> {
		this.isLoading = true;
		const user = await this.users.get(uid).pipe(first()).toPromise();
		if (!user || user.aptoID === '') {
			this.router.navigate(['/dashboard/notes']);
			return;
		}
		this.isLoading = false;
		this.user = { ...user };
	}

	setLocale() {
		this.dateAdapter.setLocale(
			this.translation.getCurrentLanguage() ||
				this.translation.getDefaultLanguage(),
		);
	}

	createForm(): void {
		const initialDate = moment();
		this.form = this.fb.group({
			title: ['', [Validators.required, Validators.maxLength(30)]],
			description: ['', [Validators.maxLength(150)]],
			date: [initialDate, Validators.required],
			time: ['', Validators.required],
		});
	}

	checkDesktopDevice(): void {
		this.isDesktop$ = this.breakPointObserver
			.observe(['(min-width: 992px)'])
			.subscribe((result) => {
				this.isDesktop = result.matches;
			});
	}

	async onSubmit(): Promise<void> {
		if (this.form.invalid || this.user?.aptoID === '') {
			return;
		}
		this.isLoading = true;
		const item: Note = this.getNoteObject();
		if (this.note) {
			await this.noteService.update(item);
		} else {
			await this.noteService.add(item);
		}
		this.basicSnackbar.openSnackBar(
			this.translation.translate(`notes.${this.note ? 'updated' : 'added'}`),
		);
		this.router.navigate(['/dashboard/notes']);
	}

	getNoteObject(): Note {
		const { date, time } = this.form.value;
		const dateAt = moment(date).toDate().getTime();
		const newTimeFormat = this.timeFormat.transform(time);
		if (this.note) {
			return {
				...this.note,
				...this.form.value,
				date: date.toString(),
				time: newTimeFormat,
				timeFormat: time,
				dateAt,
			};
		}
		const createdAt = moment().toDate().getTime();
		return {
			...this.form.value,
			createdAt,
			dateAt,
			date: date.toString(),
			time: newTimeFormat,
			timeFormat: time,
			aptoID: this.user?.aptoID,
			apartment: this.user?.apartment,
			userID: this.user?.id,
		};
	}
}
