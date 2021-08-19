import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/auth.model';
import { Note } from 'src/app/shared/models/notes.model';
import { TimeFormatPipe } from 'src/app/shared/pipes/time-format.pipe';
import { FirebaseAuthService } from 'src/app/shared/services/firebase/firebase-auth.service';
import { NotesService } from 'src/app/shared/services/firebase/notes.service';
import { LocalizationService } from 'src/app/shared/services/localization/localization.service';
import { ThemeService } from 'src/app/shared/services/themes/theme.service';

@Component({
  selector: 'nm-notes-form',
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.scss']
})
export class NotesFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isLoading!: boolean;
  isDesktop!: boolean;
  user!: User;
  isDesktop$: Subscription = new Subscription();
  _users$: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    public themeConfig: ThemeService,
    private noteService: NotesService,
    private router: Router,
    private dateAdapter: DateAdapter<Moment>,
    private localeService: LocalizationService,
    private breakPointObserver: BreakpointObserver,
    private timeFormat: TimeFormatPipe,
    private users: FirebaseAuthService,
  ) { }

  ngOnInit(): void {
    this.setLocale();
    this.createForm();
    this.checkDesktopDevice();
    this.getCurrentUser();
  }

  ngOnDestroy(): void {
    this.isDesktop$.unsubscribe();
    this._users$.unsubscribe();
  }

  getCurrentUser(): void {
    this.isLoading = true;
    this._users$ = this.users.auth.authState.subscribe(
      (userRef) => {
        this.getUserFromFirestore(userRef?.uid as string);
      }
    );
  }

  getUserFromFirestore(uid: string): void {
    this.users.get(uid)
      .subscribe((user) => {
        if (!user || user.aptoID === '') {
          this.router.navigate(['/home/notes']);
          return;
        }
        this.user = { ...user };
        this.isLoading = false;
      });
  }

  setLocale() {
    this.dateAdapter.setLocale(this.localeService.getCurrentLanguage() || this.localeService.getDefaultLanguage());
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
    this.isDesktop$ = this.breakPointObserver.observe(['(min-width: 992px)'])
      .subscribe((result) => {
        this.isDesktop = result.matches;
      });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid || this.user?.aptoID === '') {
      return;
    }
    this.isLoading = true;
    const { date, time } = this.form.value;
    const createdAt = moment().toDate().getTime();
    const newTimeFormat = this.timeFormat.transform(time);
    let item: Note = {
      ...this.form.value,
      createdAt,
      date: date.toString(),
      time: newTimeFormat,
      aptoID: this.user?.aptoID,
      apartment: this.user?.apartment,
      userID: this.user?.id,
    };
    await this.noteService.add(item);
    this.isLoading = false;
    this.router.navigate(['/home/notes']);
  }
}
