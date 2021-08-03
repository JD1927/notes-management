import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from 'src/app/shared/models/notes.model';
import { NotesService } from 'src/app/shared/services/firebase/notes.service';

@Component({
  selector: 'nm-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  notes$!: Observable<Note[]>;

  constructor(
    private notesService: NotesService,
  ) { }

  ngOnInit(): void {
    this.notes$ = this.notesService.list();
  }


}
