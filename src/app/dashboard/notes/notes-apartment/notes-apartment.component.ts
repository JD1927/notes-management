import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apartment } from 'src/app/shared/models/apartments.model';
import { Note } from 'src/app/shared/models/notes.model';
import { ApartmentsService } from 'src/app/shared/services/firebase/apartments.service';
import { NotesService } from 'src/app/shared/services/firebase/notes.service';
import { ThemeService } from 'src/app/shared/services/themes/theme.service';

@Component({
  selector: 'nm-notes-apartment',
  templateUrl: './notes-apartment.component.html',
  styleUrls: ['./notes-apartment.component.scss']
})
export class NotesApartmentComponent implements OnInit {

  isLoading!: boolean;
  notes: Note[] = [];
  _notes$: Subscription = new Subscription();
  _apartments$: Subscription = new Subscription();
  apartments: Apartment[] = [];

  constructor(
    private notesService: NotesService,
    public themeConfig: ThemeService,
    private aptoService: ApartmentsService,
  ) { }

  ngOnInit(): void {
   this.getNotesByApartment();
   this.getApartments();
  }

  ngOnDestroy(): void {
    this._notes$.unsubscribe();
  }

  getNoteList(): void {
    this.isLoading = true;
    this._notes$ = this.notesService.list()
      .subscribe(
        (res) => {
          this.notes = [...res];
          this.isLoading = false;
        }
      );
  }

  getApartments(): void {
    this.isLoading = true;
    this._apartments$ = this.aptoService.list().subscribe(
      (res) => {
        this.apartments = [...res];
        this.isLoading = false;
      }
    );
  }

  getNotesByApartment(): void {
    const aptoID = 'WIe1YQu9DbNHTB57gdAT';
    this.notesService.getNotesByApartment(aptoID).subscribe((res) => console.log(res));
  }
}
