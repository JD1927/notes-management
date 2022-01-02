import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Apartment } from 'src/app/shared/models/apartments.model';
import { ApartmentsService } from 'src/app/shared/services/firebase/apartments.service';
import { BasicSnackBarService } from 'src/app/shared/services/snackbar/basic-snack-bar.service';
import { TranslationService } from 'src/app/shared/services/translation/translation.service';

@Component({
	selector: 'nm-apartments-form',
	templateUrl: './apartments-form.component.html',
	styleUrls: ['./apartments-form.component.scss'],
})
export class ApartmentsFormComponent implements OnInit, OnDestroy {
	form!: FormGroup;
	isLoading!: boolean;
	isDesktop!: boolean;
	_route$: Subscription = new Subscription();
	apartment!: Apartment;

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private aptoService: ApartmentsService,
		private route: ActivatedRoute,
		private translation: TranslationService,
		private basicSnackbar: BasicSnackBarService,
	) {}

	ngOnInit(): void {
		this.createForm();
		this.getParameters();
	}

	ngOnDestroy(): void {
		this._route$.unsubscribe();
	}

	getParameters(): void {
		this._route$ = this.route.params.subscribe((params) => {
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
			this.apartment = { ...apto };
			this.form.controls['aptoNumber'].setValue(apto.aptoNumber);
			this.form.controls['parkingSpot'].setValue(apto.parkingSpot);
			this.form.updateValueAndValidity();
			this.isLoading = false;
		});
	}

	createForm(): void {
		this.form = this.fb.group({
			aptoNumber: [
				'',
				[Validators.required, Validators.minLength(2), Validators.maxLength(5)],
			],
			parkingSpot: ['', [Validators.minLength(3), Validators.maxLength(7)]],
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
		this.basicSnackbar.openSnackBar(
			this.translation.translate('apartments.added'),
		);
		this.isLoading = false;
		this.router.navigate(['/dashboard/apartments']);
	}

	async onUpdate(): Promise<void> {
		if (this.form.invalid) {
			return;
		}
		this.isLoading = true;
		let item: Apartment = {
			...this.apartment,
			...this.form.value,
		};
		await this.aptoService.update(item);
		this.basicSnackbar.openSnackBar(
			this.translation.translate('apartments.updated'),
		);
		this.isLoading = false;
		this.router.navigate(['/dashboard/apartments']);
	}
}
