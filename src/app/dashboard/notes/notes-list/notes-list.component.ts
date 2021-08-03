import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Note } from 'src/app/shared/models/notes.model';
import { NotesService } from 'src/app/shared/services/firebase/notes.service';
import { ThemeService } from 'src/app/shared/services/themes/theme.service';

@Component({
  selector: 'nm-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit, OnDestroy {
  isLoading!: boolean;
  notes: Note[] = [];
  _notes$: Subscription = new Subscription();

  constructor(
    private notesService: NotesService,
    public themeConfig: ThemeService,
  ) { }

  ngOnInit(): void {
   this.getNoteList();
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


  onAddNote(): void {

  }
}
