import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpSuccessComponent } from './sign-up-success/sign-up-success.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
      {
        path: 'sign-up-success',
        component: SignUpSuccessComponent,
      },
      {
        path: 'forgotten-password',
        component: ForgottenPasswordComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/sign-in'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
