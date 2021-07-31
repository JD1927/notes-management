import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LocalizationService } from '../shared/services/localization/localization.service';

@Component({
  selector: 'nm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isDarkMode: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map((result: any) => result?.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public locale: LocalizationService
  ) { }

  ngOnInit(): void {
    this.getDarkModeValue();
  }

  getDarkModeValue(): void {
    const item = localStorage.getItem('isDarkMode');
    this.isDarkMode = item === 'true';
    console.log(this.isDarkMode);
  }

  onSwitchTheme(): void {
    this.isDarkMode = !this.isDarkMode
    localStorage.setItem('isDarkMode', `${this.isDarkMode}`);
  }

  async onSwitchLanguage(): Promise<void> {
    const currentLanguage = this.locale.getCurrentLanguage();
    if (currentLanguage === 'es-CO') {
      await this.locale.useLanguage('en-US');
    } else {
      await this.locale.useLanguage('es-CO');
    }
  }

}
