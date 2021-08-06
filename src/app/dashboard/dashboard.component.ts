import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FirebaseAuthService } from '../shared/services/firebase/firebase-auth.service';
import { LocalizationService } from '../shared/services/localization/localization.service';
import { ThemeService } from '../shared/services/themes/theme.service';
import { getLocalStorageBooleanItem } from '../shared/utils/utils';

@Component({
  selector: 'nm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isLightMode: boolean = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result: any) => result?.matches),
      shareReplay()
    );
  user!: any;
  user$: Observable<any> = this.authService.auth.user;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public locale: LocalizationService,
    public themeService: ThemeService,
    private authService: FirebaseAuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.handleThemes();
  }

  handleThemes(): void {
    this.isLightMode = getLocalStorageBooleanItem('isLightMode');
  }

  onSwitchTheme(): void {
    this.isLightMode = !this.isLightMode;
    this.themeService.theme = this.isLightMode;
  }

  async onSwitchLanguage(): Promise<void> {
    const currentLanguage = this.locale.getCurrentLanguage();
    const lang = currentLanguage === 'es-CO' ? 'en-US' : 'es-CO';
    await this.locale.useLanguage(lang);
  }

  async signOut(): Promise<void> {
    await this.authService.signOut();
    this.router.navigate(['/auth/sign-in']);
  }



}
