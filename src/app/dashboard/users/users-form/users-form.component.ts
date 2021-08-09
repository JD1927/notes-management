import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TimeFormatPipe } from 'src/app/shared/pipes/time-format.pipe';
import { NotesService } from 'src/app/shared/services/firebase/notes.service';
import { LocalizationService } from 'src/app/shared/services/localization/localization.service';
import { ThemeService } from 'src/app/shared/services/themes/theme.service';
import { EMAIL_REGEX } from 'src/app/shared/utils/utils';

@Component({
  selector: 'nm-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {

  form!: FormGroup;
  isLoading!: boolean;
  isDesktop$: Subscription = new Subscription();
  isDesktop!: boolean;

  constructor(
    private fb: FormBuilder,
    public themeConfig: ThemeService,
    private router: Router,
    private localeService: LocalizationService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(60)]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
    });
  }

  onSubmit(): void {

  }

}
