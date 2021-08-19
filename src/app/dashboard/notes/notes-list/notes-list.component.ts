import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/auth.model';
import { Note } from 'src/app/shared/models/notes.model';
import { FirebaseAuthService } from 'src/app/shared/services/firebase/firebase-auth.service';
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
  _user$: Subscription = new Subscription();
  user!: User;

  constructor(
    private notesService: NotesService,
    public themeConfig: ThemeService,
    private authService: FirebaseAuthService,
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  async getCurrentUser(): Promise<void> {
    try {
      const userRef = await this.authService.getCurrentUser();
      this.authService.get((userRef?.uid as string))
        .subscribe((user) => {
          this.user = { ...user };
          this.getNotesByUser(user?.id);
        });
    } catch (error) {
      console.error(error);
    }
  }

  ngOnDestroy(): void {
    this._notes$.unsubscribe();
    this._user$.unsubscribe();
  }

  getNotesByUser(userID: string): void {
    this.isLoading = true;
    this._notes$ = this.notesService.getNotesByUser(userID).subscribe(
      (res) => {
        this.notes = [...res];
        this.isLoading = false;
      }
    );
  }
}
