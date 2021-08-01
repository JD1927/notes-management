import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartmentsRoutingModule } from './apartments-routing.module';
import { ApartmentsComponent } from './apartments.component';


@NgModule({
  declarations: [
    ApartmentsComponent
  ],
  imports: [
    CommonModule,
    ApartmentsRoutingModule
  ]
})
export class ApartmentsModule { }
