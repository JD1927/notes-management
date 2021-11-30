import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnouncementsRoutingModule } from './announcements-routing.module';
import { AnnouncementsComponent } from './announcements.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [AnnouncementsComponent],
  imports: [
    CommonModule,
    AnnouncementsRoutingModule,
    SharedModule,
    MatCardModule,
  ],
})
export class AnnouncementsModule {}
