import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InternationalizationModule } from '../shared/modules/internationalization/internationalization.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
	declarations: [DashboardComponent],
	imports: [
		CommonModule,
		DashboardRoutingModule,
		MatButtonModule,
		MatToolbarModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		MatTooltipModule,
		MatFormFieldModule,
		MatProgressSpinnerModule,
		InternationalizationModule,
		SharedModule,
	],
})
export class DashboardModule {}
