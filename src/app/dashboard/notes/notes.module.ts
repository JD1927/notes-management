import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { InternationalizationModule } from 'src/app/shared/modules/internationalization/internationalization.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotesFormComponent } from './notes-form/notes-form.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { NotesApartmentComponent } from './notes-apartment/notes-apartment.component';
import { MatTooltipModule } from '@angular/material/tooltip';

export const FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@NgModule({
  declarations: [
    NotesComponent,
    NotesListComponent,
    NotesFormComponent,
    NotesApartmentComponent,
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTooltipModule,
    FormsModule,
    InternationalizationModule,
    SharedModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: FORMAT },
  ],
})
export class NotesModule {}
