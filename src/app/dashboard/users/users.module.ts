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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { InternationalizationModule } from 'src/app/shared/modules/internationalization/internationalization.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersFormComponent } from './users-form/users-form.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UsersFormComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
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
    MatSlideToggleModule,
    MatDividerModule,
    MatListModule,
    InternationalizationModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class UsersModule { }
