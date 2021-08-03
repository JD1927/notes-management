import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { InternationalizationModule } from './modules/internationalization/internationalization.module';
import { TimeFormatPipe } from './pipes/time-format.pipe';


@NgModule({
  providers: [TimeFormatPipe],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    InternationalizationModule,
  ],
})
export class SharedModule { }
