import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialog } from '../../models/dialog.model';

@Injectable()
export class ConfirmDialogService {
	constructor(private dialog: MatDialog) {}

	public open(options: ConfirmDialog): MatDialogRef<ConfirmDialogComponent> {
		return this.dialog.open(ConfirmDialogComponent, {
			minHeight: '200px',
			width: '400px',
			data: {
				title: options.title,
				message: options.message,
				cancelText: options.cancelText,
				confirmText: options.confirmText,
			},
		});
	}
	public confirmed(
		dialogRef: MatDialogRef<ConfirmDialogComponent>,
	): Observable<any> {
		return dialogRef.afterClosed().pipe(
			take(1),
			map((res) => {
				return res;
			}),
		);
	}
}
