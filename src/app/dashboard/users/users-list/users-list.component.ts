import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/auth.model';
import { ConfirmDialog } from 'src/app/shared/models/dialog.model';
import { ConfirmDialogService } from 'src/app/shared/services/dialog/confirm-dialog.service';
import { FirebaseAuthService } from 'src/app/shared/services/firebase/firebase-auth.service';
import { TranslationService } from 'src/app/shared/services/translation/translation.service';

@Component({
	selector: 'nm-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, OnDestroy {
	isLoading!: boolean;
	users!: MatTableDataSource<User>;
	_users$: Subscription = new Subscription();
	userSearch: FormControl = new FormControl('');
	displayedColumns: string[] = ['name', 'email', 'apartment', 'actions'];

	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

	constructor(
		private authService: FirebaseAuthService,
		private confirmDialog: ConfirmDialogService,
		private translation: TranslationService,
	) {
		this.users = new MatTableDataSource<User>([]);
	}

	ngOnInit(): void {
		this.getUserList();
	}

	ngOnDestroy(): void {
		this._users$.unsubscribe();
	}

	getUserList(): void {
		this.isLoading = true;
		this._users$ = this.authService.list().subscribe((res) => {
			this.users = new MatTableDataSource([...res]);
			this.users.paginator = this.paginator;
			this.users.sort = this.sort;
			this.users.sortingDataAccessor = (data: any, header: any) => data[header];
			this.isLoading = false;
		});
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.users.filter = filterValue.trim().toLowerCase();

		if (this.users.paginator) {
			this.users.paginator.firstPage();
		}
	}

	deleteUser(userID: string, email: string): void {
		const options: ConfirmDialog = {
			title: this.translation.translate('users.delete-title'),
			message: `${this.translation.translate(
				'users.delete-message',
			)} "${email}"`,
			cancelText: this.translation.translate('general.cancel'),
			confirmText: this.translation.translate('general.confirm'),
		};
		const dialogRef = this.confirmDialog.open(options);
		this.confirmDialog.confirmed(dialogRef).subscribe((confirmed) => {
			if (confirmed) {
				this.isLoading = true;
				this.authService.delete(userID);
				this.isLoading = false;
			}
		});
	}
}
