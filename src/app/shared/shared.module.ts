import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { InternationalizationModule } from './modules/internationalization/internationalization.module';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './services/dialog/confirm-dialog.service';

@NgModule({
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule,
		InternationalizationModule,
	],
	declarations: [ConfirmDialogComponent],
	exports: [ConfirmDialogComponent],
	providers: [ConfirmDialogService, TimeFormatPipe],
})
export class SharedModule {}
