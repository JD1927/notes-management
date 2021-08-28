import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Apartment } from 'src/app/shared/models/apartments.model';
import { Note } from 'src/app/shared/models/notes.model';
import { ApartmentsService } from 'src/app/shared/services/firebase/apartments.service';
import { NotesService } from 'src/app/shared/services/firebase/notes.service';

@Component({
  selector: 'nm-notes-apartment',
  templateUrl: './notes-apartment.component.html',
  styleUrls: ['./notes-apartment.component.scss']
})
export class NotesApartmentComponent implements OnInit {

  form!: FormGroup;
  isLoading!: boolean;
  notes: Note[] = [];
  _notes$: Subscription = new Subscription();
  _apartments$: Subscription = new Subscription();
  apartments: Apartment[] = [];

  constructor(
    private notesService: NotesService,
    private aptoService: ApartmentsService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getApartments();
  }

  createForm(): void {
    this.form = this.fb.group({
      apartment: ['', [Validators.required]],
    });
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

  getNotesByApartment(aptoID: string): void {
    this.isLoading = true;
    this.notesService.getNotesByApartment(aptoID).subscribe(
      (res) => {
        this.notes = [...res];
        this.isLoading = false;
        this.notesService.deleteNotesByApartment(aptoID);
      }
    );
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const { apartment } = this.form.value;
    this.getNotesByApartment(apartment);
  }
}
