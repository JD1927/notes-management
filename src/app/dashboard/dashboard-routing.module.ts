import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'announcements',
        loadChildren: () =>
          import('./announcements/announcements.module').then(
            (m) => m.AnnouncementsModule
          ),
      },
      {
        path: 'notes',
        loadChildren: () =>
          import('./notes/notes.module').then((m) => m.NotesModule),
      },
      {
        path: 'apartments',
        loadChildren: () =>
          import('./apartments/apartments.module').then(
            (m) => m.ApartmentsModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
