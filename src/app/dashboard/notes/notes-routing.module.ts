import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/shared/guards/role.guard';
import { NotesApartmentComponent } from './notes-apartment/notes-apartment.component';
import { NotesFormComponent } from './notes-form/notes-form.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesComponent } from './notes.component';

const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
    children: [
      {
        path: 'list',
        component: NotesListComponent,
        canActivate: [RoleGuard],
        data: {
          isResident: true,
          isSuperAdmin: true,
        },
      },
      {
        path: 'form',
        component: NotesFormComponent,
        canActivate: [RoleGuard],
        data: {
          isResident: true,
          isSuperAdmin: true,
        },
      },
      {
        path: 'form/:id',
        component: NotesFormComponent,
        canActivate: [RoleGuard],
        data: {
          isResident: true,
          isSuperAdmin: true,
        },
      },
      {
        path: 'apartment',
        component: NotesApartmentComponent,
        canActivate: [RoleGuard],
        data: {
          isGuard: true,
          isSuperAdmin: true,
        },
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard/notes/list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule {}
