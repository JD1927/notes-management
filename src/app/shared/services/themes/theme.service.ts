import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { getLocalStorageBooleanItem } from '../../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private overlayContainer: OverlayContainer) { }

  public set theme(value: boolean) {
    this.handleThemeOverlayContainers(value);
    localStorage.setItem('isLightMode', `${value}`);
  }

  public get theme(): boolean {
    return getLocalStorageBooleanItem('isLightMode');
  }

  handleThemeOverlayContainers(isDarkMode: boolean): void {
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    if (overlayContainerClasses?.length === 0) {
      return;
    }
    const action = isDarkMode ? 'add': 'remove';
    overlayContainerClasses[action]('light-mode');
  }
}
