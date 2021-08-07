import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseAuthService } from 'src/app/shared/services/firebase/firebase-auth.service';

@Component({
  selector: 'nm-sign-up-success',
  templateUrl: './sign-up-success.component.html',
  styleUrls: ['./sign-up-success.component.scss'],
})
export class SignUpSuccessComponent implements OnInit {

  user$: Observable<any> = this.authService.auth.user;
  isLoading!: boolean;

  constructor(
    private authService: FirebaseAuthService,
  ) { }

  ngOnInit(): void {}

  async onSendConfirmEmail(): Promise<void> {
    this.isLoading = true;
    await this.authService.sendEmailVerification();
    this.isLoading = false;
  }
}
