import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FirebaseAuthService } from 'src/app/shared/services/firebase/firebase-auth.service';

@Component({
  selector: 'nm-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  form!: FormGroup;
  isLoading!: boolean;
  showPassword!: boolean;
  hasSignInError!: boolean;
  hasRoleError!: boolean;
  hasFragmentedUser!: boolean;
  hasEmailVerifiedError!: boolean;

  constructor(
    private fb: FormBuilder,
    private auth: FirebaseAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit(): Promise<void> {
    this.hasSignInError = false;
    this.hasEmailVerifiedError = false;
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    const { email, password } = this.form.value;
    const credentials = await this.auth.signInWithEmailAndPassword(
      email,
      password
    );
    await this.validateUserSignIn(credentials);
  }

  private async validateUserSignIn(credentials: any): Promise<void> {
    const user = await this.auth
      .get(credentials?.user?.uid as string)
      .pipe(first())
      .toPromise();
    this.isLoading = false;

    if (!user) {
      this.hasFragmentedUser = true;
      return;
    }
    if (!credentials) {
      this.hasSignInError = true;
      return;
    }
    const hasRole = [...Object.values(user.roles)].some(
      (value) => value === true
    );
    if (!hasRole) {
      this.hasRoleError = true;
      return;
    }
    if (!credentials.user?.emailVerified) {
      this.hasEmailVerifiedError = true;
      return;
    }
    this.router.navigate(['/dashboard']);
  }

  onSendEmailVerification(): void {
    this.router
      .navigate(['/auth/sign-up-success'])
      .then(() => this.auth.sendEmailVerification());
  }
}
