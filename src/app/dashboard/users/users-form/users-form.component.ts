import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Apartment } from 'src/app/shared/models/apartments.model';
import { User } from 'src/app/shared/models/auth.model';
import { ApartmentsService } from 'src/app/shared/services/firebase/apartments.service';
import { FirebaseAuthService } from 'src/app/shared/services/firebase/firebase-auth.service';

@Component({
	selector: 'nm-users-form',
	templateUrl: './users-form.component.html',
	styleUrls: ['./users-form.component.scss'],
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
		private router: Router,
		private usersService: FirebaseAuthService,
		private aptoService: ApartmentsService,
		private route: ActivatedRoute,
	) {}

	ngOnInit(): void {
		this.createForm();
		this.getApartments();
		this.getParameters();
	}

	createForm(): void {
		this.form = this.fb.group({
			name: ['', [Validators.maxLength(60)]],
			apartment: [''],
			isResident: [false],
			isGuard: [false],
			isAdmin: [false],
			isSuperAdmin: [false],
		});
	}

	getParameters(): void {
		this._route$ = this.route.params.subscribe((params) => {
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
			this.setFormValues(user);
		});
	}

	setFormValues(user: User): void {
		this.user = { ...user };
		const { roles } = user;
		this.form.controls['name'].setValue(user.name);
		this.form.controls['apartment'].setValue(user.aptoID);
		this.form.controls['isResident'].setValue(roles?.isResident);
		this.form.controls['isGuard'].setValue(roles?.isGuard);
		this.form.controls['isAdmin'].setValue(roles?.isAdmin);
		this.form.controls['isSuperAdmin'].setValue(roles?.isSuperAdmin);
		this.form.updateValueAndValidity();
		this.isLoading = false;
	}

	getApartments(): void {
		this.isLoading = true;
		this._apartments$ = this.aptoService.list().subscribe((res) => {
			this.apartments = [...res];
			this.isLoading = false;
		});
	}

	async onSubmit(): Promise<void> {
		if (this.form.invalid) {
			return;
		}
		this.isLoading = true;
		const {
			name,
			apartment: aptoID,
			isResident,
			isGuard,
			isAdmin,
			isSuperAdmin,
		} = this.form.value;
		const apto = this.apartments.find((a) => a.id === aptoID);
		const item: User = {
			...this.user,
			name: name || '',
			apartment: apto?.aptoNumber || '',
			aptoID: apto?.id || '',
			roles: {
				isResident,
				isGuard,
				isAdmin,
				isSuperAdmin,
			},
		};
		const result = await this.usersService.update(item);
		this.isLoading = false;
		if (!result) {
			return;
		}
		this.router.navigate(['/dashboard/users']);
	}
}
