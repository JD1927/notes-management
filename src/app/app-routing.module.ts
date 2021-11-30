import { NgModule } from '@angular/core';
import { canActivate, emailVerified } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

const redirectUnverifiedTo = (redirect: any[]) =>
  pipe(
    emailVerified,
    map((emailVerified) => emailVerified || redirect)
  );

const redirectUnauthorizedToLogin = () =>
  redirectUnverifiedTo(['/auth/sign-in']);

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard/announcements',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/dashboard/announcements',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
