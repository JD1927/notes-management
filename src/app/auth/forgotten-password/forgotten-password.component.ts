import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/shared/services/firebase/firebase-auth.service';
import { TranslationService } from 'src/app/shared/services/translation/translation.service';

@Component({
	selector: 'nm-forgotten-password',
	templateUrl: './forgotten-password.component.html',
	styleUrls: ['./forgotten-password.component.scss'],
})
export class ForgottenPasswordComponent implements OnInit {
	form!: FormGroup;
	isLoading!: boolean;

	constructor(
		private fb: FormBuilder,
		private auth: FirebaseAuthService,
		private snackBar: MatSnackBar,
		private translation: TranslationService,
		private router: Router,
	) {}

	ngOnInit(): void {
		this.createForm();
	}

	createForm(): void {
		this.form = this.fb.group({
			email: ['', [Validators.required]],
		});
	}

	async onSubmit(): Promise<void> {
		if (this.form.invalid) {
			return;
		}
		this.isLoading = true;
		const { email } = this.form.value;
		await this.auth.sendPasswordResetEmail(email);
		this.isLoading = false;
		const message = this.translation.translate('auth.password-reset-message');
		const snackBarRef = this.snackBar.open(`${message} ${email}`, undefined, {
			duration: 4000,
			horizontalPosition: 'center',
			verticalPosition: 'top',
		});
		snackBarRef
			.afterDismissed()
			.subscribe(() => this.router.navigate(['/auth/sign-in']));
	}
}
