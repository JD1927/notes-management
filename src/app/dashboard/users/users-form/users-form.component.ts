import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Apartment } from 'src/app/shared/models/apartments.model';
import { User } from 'src/app/shared/models/auth.model';
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
  _route$: Subscription = new Subscription();
  user!: User;

  constructor(
    private fb: FormBuilder,
    public themeConfig: ThemeService,
    private router: Router,
    private usersService: FirebaseAuthService,
    private aptoService: ApartmentsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getApartments();
    this.getParameters();
  }

  createForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(60)]],
      apartment: ['', [Validators.required]],
    });
  }

  getParameters(): void {
    this._route$ = this.route.params
      .subscribe((params) => {
        this.isLoading = true;
        this.handleUserID(params?.id);
      });
  }

  handleUserID(id: string): void {
    if (id === undefined) {
      this.isLoading = false;
      return;
    }
    this.usersService.get(id).subscribe((user) => {
      this.user = { ...user };
      this.form.controls['name'].setValue(user.name);
      this.form.controls['apartment'].setValue(user.aptoID);
      this.form.updateValueAndValidity();
      this.isLoading = false;
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

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    const { name, apartment: aptoID } = this.form.value;
    const apto = this.apartments.find((a) => a.id === aptoID);
    const item: User = {
      ...this.user,
      name,
      apartment: apto?.aptoNumber,
      aptoID: aptoID,
    }
    const result = await this.usersService.update(item);
    this.isLoading = false;
    if (!result) {
      return;
    }
    this.router.navigate(['/home/users']);
  }

}
