import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/auth.model';
import { ConfirmDialog } from 'src/app/shared/models/dialog.model';
import { Note } from 'src/app/shared/models/notes.model';
import { ConfirmDialogService } from 'src/app/shared/services/dialog/confirm-dialog.service';
import { FirebaseAuthService } from 'src/app/shared/services/firebase/firebase-auth.service';
import { NotesService } from 'src/app/shared/services/firebase/notes.service';
import { LocalizationService } from 'src/app/shared/services/localization/localization.service';

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
    private authService: FirebaseAuthService,
    private locale: LocalizationService,
    private confirmDialog: ConfirmDialogService,
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

  onDeleteNote(note: Note): void {
    if (note?.userID !== this.user?.id) {
      return;
    }
    const options: ConfirmDialog = {
      title: this.locale.translate('notes.delete-title'),
      message: `${this.locale.translate('notes.delete-message')}`,
      cancelText: this.locale.translate('general.cancel'),
      confirmText: this.locale.translate('general.confirm'),
    }
    const dialogRef = this.confirmDialog.open(options);
    this.confirmDialog.confirmed(dialogRef).subscribe((confirmed) => {
      if (confirmed) {
        this.isLoading = true;
        this.notesService.delete((note?.id) as string);
        this.isLoading = false;
      }
    });
  }
}
