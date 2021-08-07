import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/shared/services/firebase/firebase-auth.service';
import { EMAIL_REGEX, SIMPLE_PASSWORD_REGEX } from 'src/app/shared/utils/utils';

@Component({
  selector: 'nm-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form!: FormGroup;
  showPassword!: boolean;
  showConfirmPassword!: boolean;
  isLoading!: boolean;
  hasSignUpError!: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(
    private fb: FormBuilder,
    private auth: FirebaseAuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', [Validators.required, Validators.pattern(SIMPLE_PASSWORD_REGEX)]],
      confirm: ['', [Validators.required, Validators.pattern(SIMPLE_PASSWORD_REGEX)]],
    });
  }

  async onSubmit(): Promise<void> {
    this.hasSignUpError = false;
    this.validateFormFields();
    this.isLoading = true;

    const { email, password } = this.form.value;
    const credentials = await this.auth.createUserWithEmailAndPassword(email, password);
    this.isLoading = false;

    if (!credentials) {
      this.hasSignUpError = true;
      return;
    }
    this.router.navigate(['/auth/sign-up-success']);
  }

  validateFormFields(): void {
    if (this.form.invalid) {
      return;
    }
    const { password: passwordControl, confirm: confirmControl } = this.form.controls;
    if (passwordControl.value !== confirmControl.value) {
      confirmControl.setErrors({ hasPasswordMismatch: true });
      return;
    }
  }

}
