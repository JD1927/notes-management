import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/shared/services/firebase/firebase-auth.service';
import { EMAIL_REGEX } from 'src/app/shared/utils/utils';

@Component({
  selector: 'nm-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form!: FormGroup;
  isLoading!: boolean;
  showPassword!: boolean;
  hasSignInError!: boolean;

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
      password: ['', [Validators.required]]
    });
  }

  async onSubmit(): Promise<void> {
    this.hasSignInError = false;
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    const { email, password } = this.form.value;
    const user = await this.auth.signInWithEmailAndPassword(email, password);
    this.isLoading = false;
    if (user) {
      this.router.navigate(['/home']);
    } else {
      this.hasSignInError = true;
    }
  }
}