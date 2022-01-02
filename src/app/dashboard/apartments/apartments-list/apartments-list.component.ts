import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Apartment } from 'src/app/shared/models/apartments.model';
import { ConfirmDialog } from 'src/app/shared/models/dialog.model';
import { ConfirmDialogService } from 'src/app/shared/services/dialog/confirm-dialog.service';
import { ApartmentsService } from 'src/app/shared/services/firebase/apartments.service';
import { BasicSnackBarService } from 'src/app/shared/services/snackbar/basic-snack-bar.service';
import { TranslationService } from 'src/app/shared/services/translation/translation.service';

@Component({
	selector: 'nm-apartments-list',
	templateUrl: './apartments-list.component.html',
	styleUrls: ['./apartments-list.component.scss'],
})
export class ApartmentsListComponent implements OnInit {
	isLoading!: boolean;
	apartments!: MatTableDataSource<Apartment>;
	_apartments$: Subscription = new Subscription();
	aptoSearch: FormControl = new FormControl('');
	displayedColumns: string[] = ['aptoNumber', 'parkingSpot', 'actions'];

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	constructor(
		private aptoService: ApartmentsService,
		private confirmDialog: ConfirmDialogService,
		private translation: TranslationService,
		private basicSnackbar: BasicSnackBarService,
	) {
		this.apartments = new MatTableDataSource<Apartment>([]);
	}

	ngOnInit(): void {
		this.getApartmentList();
	}

	ngOnDestroy(): void {
		this._apartments$.unsubscribe();
	}

	getApartmentList(): void {
		this.isLoading = true;
		this._apartments$ = this.aptoService.list().subscribe((res) => {
			this.apartments = new MatTableDataSource([...res]);
			this.apartments.paginator = this.paginator;
			this.apartments.sort = this.sort;
			this.apartments.sortingDataAccessor = (data: any, header: any) =>
				data[header];
			this.isLoading = false;
		});
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.apartments.filter = filterValue.trim().toLowerCase();

		if (this.apartments.paginator) {
			this.apartments.paginator.firstPage();
		}
	}

	deleteApartment(aptoID: string, aptoNumber: string): void {
		const options: ConfirmDialog = {
			title: this.translation.translate('apartments.delete-title'),
			message: `${this.translation.translate(
				'apartments.delete-message',
			)} "${aptoNumber}"`,
			cancelText: this.translation.translate('general.cancel'),
			confirmText: this.translation.translate('general.confirm'),
		};
		const dialogRef = this.confirmDialog.open(options);
		this.confirmDialog.confirmed(dialogRef).subscribe((confirmed) => {
			if (confirmed) {
				this.isLoading = true;
				this.aptoService.delete(aptoID);
				this.basicSnackbar.openSnackBar(
					this.translation.translate('apartments.deleted'),
				);
				this.isLoading = false;
			}
		});
	}
}
