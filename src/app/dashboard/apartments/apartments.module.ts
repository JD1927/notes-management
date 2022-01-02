import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { InternationalizationModule } from 'src/app/shared/modules/internationalization/internationalization.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApartmentsFormComponent } from './apartments-form/apartments-form.component';
import { ApartmentsListComponent } from './apartments-list/apartments-list.component';
import { ApartmentsRoutingModule } from './apartments-routing.module';
import { ApartmentsComponent } from './apartments.component';

@NgModule({
	declarations: [
		ApartmentsComponent,
		ApartmentsListComponent,
		ApartmentsFormComponent,
	],
	imports: [
		CommonModule,
		ApartmentsRoutingModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatFormFieldModule,
		MatProgressSpinnerModule,
		MatSelectModule,
		MatDatepickerModule,
		MatCardModule,
		MatSortModule,
		MatPaginatorModule,
		MatTableModule,
		InternationalizationModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
	],
})
export class ApartmentsModule {}
