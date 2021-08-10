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
import { LocalizationService } from 'src/app/shared/services/localization/localization.service';
import { ThemeService } from 'src/app/shared/services/themes/theme.service';

@Component({
  selector: 'nm-apartments-list',
  templateUrl: './apartments-list.component.html',
  styleUrls: ['./apartments-list.component.scss']
})
export class ApartmentsListComponent implements OnInit {

  isLoading!: boolean;
  apartments!: MatTableDataSource<Apartment>;
  _apartments$: Subscription = new Subscription();
  aptoSearch: FormControl = new FormControl('');
  displayedColumns: string[] = ['id', 'aptoNumber', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private aptoService: ApartmentsService,
    public themeConfig: ThemeService,
    private confirmDialog: ConfirmDialogService,
    private locale: LocalizationService,
  ) {
    this.apartments = new MatTableDataSource<Apartment>([]);
  }

  ngOnInit(): void {
    this.getUserList();
  }

  ngOnDestroy(): void {
    this._apartments$.unsubscribe();

  }

  getUserList(): void {
    this.isLoading = true;
    this._apartments$ = this.aptoService.list()
      .subscribe(
        (res) => {
          this.apartments = new MatTableDataSource([...res]);
          this.apartments.paginator = this.paginator;
          this.apartments.sort = this.sort;
          this.apartments.sortingDataAccessor = (data: any, header: any) => data[header];
          this.isLoading = false;
        }
      );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.apartments.filter = filterValue.trim().toLowerCase();

    if (this.apartments.paginator) {
      this.apartments.paginator.firstPage();
    }
  }

  deleteUser(userID: string, email: string): void {
    const options: ConfirmDialog = {
      title: this.locale.translate('apartments.delete-title'),
      message: `${this.locale.translate('apartments.delete-message')} "${email}"`,
      cancelText: this.locale.translate('general.cancel'),
      confirmText: this.locale.translate('general.confirm'),
    }
    const dialogRef = this.confirmDialog.open(options);
    this.confirmDialog.confirmed(dialogRef).subscribe((confirmed) => {
      if (confirmed) {
        this.isLoading = true;
        this.aptoService.delete(userID);
        this.isLoading = false;
      }
    });

  }

}
