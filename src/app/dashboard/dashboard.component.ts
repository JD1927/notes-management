import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ConfirmDialog } from '../shared/models/dialog.model';
import { ConfirmDialogService } from '../shared/services/dialog/confirm-dialog.service';
import { FirebaseAuthService } from '../shared/services/firebase/firebase-auth.service';
import { TranslationService } from '../shared/services/translation/translation.service';
import { isDesktopDevice } from '../shared/utils/utils';

@Component({
  selector: 'nm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;

  isDesktop!: boolean;
  isDesktopDevice!: boolean;
  isDesktop$: Subscription = new Subscription();
  user!: any;
  user$: Observable<any> = this.authService.auth.user;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public translation: TranslationService,
    private authService: FirebaseAuthService,
    private confirmDialog: ConfirmDialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isDesktop$ = this.breakpointObserver
      .observe(['(min-width: 992px)'])
      .subscribe((result) => {
        this.isDesktopDevice = isDesktopDevice();
        this.isDesktop = result.matches;
      });
  }

  async onSwitchLanguage(): Promise<void> {
    const currentLanguage = this.translation.getCurrentLanguage();
    const lang = currentLanguage === 'es-CO' ? 'en-US' : 'es-CO';
    await this.translation.useLanguage(lang);
  }

  signOut(): void {
    const options: ConfirmDialog = {
      title: this.translation.translate('auth.sign-out'),
      message: this.translation.translate('auth.sign-out-message'),
      cancelText: this.translation.translate('general.cancel'),
      confirmText: this.translation.translate('general.confirm'),
    };
    const dialogRef = this.confirmDialog.open(options);
    this.confirmDialog.confirmed(dialogRef).subscribe(async (confirmed) => {
      if (confirmed) {
        await this.authService.signOut();
        this.router.navigate(['/auth/sign-in']);
      }
    });
  }

  onSelectedOption(): void {
    if (!this.isDesktop) {
      this.drawer.close();
    }
  }
}
