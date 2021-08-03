import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartmentsRoutingModule } from './apartments-routing.module';
import { ApartmentsComponent } from './apartments.component';
import { InternationalizationModule } from 'src/app/shared/modules/internationalization/internationalization.module';


@NgModule({
  declarations: [
    ApartmentsComponent
  ],
  imports: [
    CommonModule,
    ApartmentsRoutingModule,
    InternationalizationModule,
  ]
})
export class ApartmentsModule { }
