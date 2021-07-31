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
    public localizationService: LocalizationService
  ) { }

  ngOnInit(): void {
  }

}
