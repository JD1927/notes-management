import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartmentsFormComponent } from './apartments-form/apartments-form.component';
import { ApartmentsListComponent } from './apartments-list/apartments-list.component';
import { ApartmentsComponent } from './apartments.component';

const routes: Routes = [
  {
    path: '',
    component: ApartmentsComponent,
    children: [
      {
        path: 'list',
        component: ApartmentsListComponent,
      },
      {
        path: 'form',
        component: ApartmentsFormComponent,
      },
      {
        path: 'form/:id',
        component: ApartmentsFormComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home/apartments/list'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentsRoutingModule { }
