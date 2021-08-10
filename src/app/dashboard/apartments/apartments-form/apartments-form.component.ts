import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Subscription } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { Apartment } from 'src/app/shared/models/apartments.model';
import { Note } from 'src/app/shared/models/notes.model';
import { TimeFormatPipe } from 'src/app/shared/pipes/time-format.pipe';
import { ApartmentsService } from 'src/app/shared/services/firebase/apartments.service';
import { NotesService } from 'src/app/shared/services/firebase/notes.service';
import { LocalizationService } from 'src/app/shared/services/localization/localization.service';
import { ThemeService } from 'src/app/shared/services/themes/theme.service';

@Component({
  selector: 'nm-apartments-form',
  templateUrl: './apartments-form.component.html',
  styleUrls: ['./apartments-form.component.scss']
})
export class ApartmentsFormComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  isLoading!: boolean;
  isDesktop!: boolean;
  _route$: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    public themeConfig: ThemeService,
    private router: Router,
    private aptoService: ApartmentsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getParameters();
  }

  ngOnDestroy(): void {
    this._route$.unsubscribe();
  }

  getParameters(): void {
    this._route$ = this.route.params
      .subscribe((params) => {
        this.isLoading = true;
        this.handleApartmentID(params?.id);
      });
  }

  handleApartmentID(id: string): void {
    if (id === undefined) {
      this.isLoading = false;
      return;
    }
    this.aptoService.get(id).subscribe((apto) => {
      this.form.controls['aptoNumber'].setValue(apto.aptoNumber);
      this.form.updateValueAndValidity();
      this.isLoading = false;
    });
  }


  createForm(): void {
    this.form = this.fb.group({
      aptoNumber: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    let item: Apartment = {
      ...this.form.value,
    };
    await this.aptoService.add(item);
    this.isLoading = false;
    this.router.navigate(['/home/apartments']);
  }

}
