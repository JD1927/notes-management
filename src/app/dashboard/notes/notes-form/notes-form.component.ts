import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/shared/models/notes.model';
import { TimeFormatPipe } from 'src/app/shared/pipes/time-format.pipe';
import { NotesService } from 'src/app/shared/services/firebase/notes.service';
import { LocalizationService } from 'src/app/shared/services/localization/localization.service';
import { ThemeService } from 'src/app/shared/services/themes/theme.service';

@Component({
  selector: 'nm-notes-form',
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.scss']
})
export class NotesFormComponent implements OnInit {
  form!: FormGroup;
  isLoading!: boolean;
  isDesktop$: Subscription = new Subscription();
  isDesktop!: boolean;

  constructor(
    private fb: FormBuilder,
    public themeConfig: ThemeService,
    private noteService: NotesService,
    private router: Router,
    private dateAdapter: DateAdapter<Moment>,
    private localeService: LocalizationService,
    private breakPointObserver: BreakpointObserver,
    private timeFormat: TimeFormatPipe,
  ) { }

  ngOnInit(): void {
    this.setLocale();
    this.createForm();
    this.checkDesktopDevice();
  }

  setLocale() {
    this.dateAdapter.setLocale(this.localeService.getCurrentLanguage() || this.localeService.getDefaultLanguage());
  }

  createForm(): void {
    const initialDate = moment();
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(60)]],
      description: ['', [Validators.maxLength(200)]],
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
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    const { date, time } = this.form.value;
    const createdAt = moment().toString();
    const newTimeFormat = this.timeFormat.transform(time);
    let item: Note = {
      ...this.form.value,
      createdAt,
      date: date.toString(),
      time: newTimeFormat,
    };
    await this.noteService.add(item);
    this.isLoading = false;
    this.router.navigate(['/home/notes']);
  }
}
