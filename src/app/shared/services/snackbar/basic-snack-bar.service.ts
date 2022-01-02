import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class BasicSnackBarService {
	constructor(private _snackBar: MatSnackBar) {}

	openSnackBar(message: string, action: string | undefined = undefined): void {
		this._snackBar.open(message, action, {
			duration: 3000,
		});
	}
}
