import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/shared/guards/role.guard';
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
				canActivate: [RoleGuard],
				data: {
					isAdmin: true,
					isSuperAdmin: true,
				},
			},
			{
				path: 'form',
				component: ApartmentsFormComponent,
				canActivate: [RoleGuard],
				data: {
					isAdmin: true,
					isSuperAdmin: true,
				},
			},
			{
				path: 'form/:id',
				component: ApartmentsFormComponent,
				canActivate: [RoleGuard],
				data: {
					isAdmin: true,
					isSuperAdmin: true,
				},
			},
			{
				path: '',
				pathMatch: 'full',
				redirectTo: '/dashboard/apartments/list',
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ApartmentsRoutingModule {}
