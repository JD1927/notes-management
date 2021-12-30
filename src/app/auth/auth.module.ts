import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InternationalizationModule } from '../shared/modules/internationalization/internationalization.module';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpSuccessComponent } from './sign-up-success/sign-up-success.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
	declarations: [
		AuthComponent,
		SignInComponent,
		SignUpComponent,
		SignUpSuccessComponent,
		ForgottenPasswordComponent,
	],
	imports: [
		CommonModule,
		AuthRoutingModule,
		InternationalizationModule,
		FormsModule,
		ReactiveFormsModule,
		MatCardModule,
		MatButtonModule,
		MatInputModule,
		MatDialogModule,
		MatFormFieldModule,
		MatIconModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		SharedModule,
	],
})
export class AuthModule {}
