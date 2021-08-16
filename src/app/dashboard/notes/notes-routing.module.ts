import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
      },
      {
        path: 'form',
        component: NotesFormComponent,
      },
      {
        path: 'apartment',
        component: NotesApartmentComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home/notes/list'
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
