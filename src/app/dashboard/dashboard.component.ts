import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
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

  constructor(
    private breakpointObserver: BreakpointObserver,
    public locale: LocalizationService,
    private themeService: ThemeService,
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



}
