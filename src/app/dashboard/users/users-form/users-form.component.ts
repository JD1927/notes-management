import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Apartment } from 'src/app/shared/models/apartments.model';
import { ApartmentsService } from 'src/app/shared/services/firebase/apartments.service';
import { FirebaseAuthService } from 'src/app/shared/services/firebase/firebase-auth.service';
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
  _apartments$: Subscription = new Subscription();
  apartments: Apartment[] = [];

  constructor(
    private fb: FormBuilder,
    public themeConfig: ThemeService,
    private router: Router,
    private localeService: LocalizationService,
    private authService: FirebaseAuthService,
    private aptoService: ApartmentsService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getApartments();
  }

  createForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(60)]],
      aptoNumber: ['', [Validators.required]],
    });
  }

  getApartments(): void {
    this.isLoading = true;
    this._apartments$ = this.aptoService.list().subscribe(
      (res) => {
        this.apartments = [...res];
        this.isLoading = false;
      }
    )
  }

  onSubmit(): void {

  }

}
