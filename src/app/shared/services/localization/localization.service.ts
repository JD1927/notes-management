import { Injectable, Optional, SkipSelf } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateLanguage } from '../../models/translate-language.model';
import { LocalizationConfigService } from './localization-config.service';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  private _localeId: TranslateLanguage | string = 'es-CO';

  constructor(
    @Optional() @SkipSelf() private singleton: LocalizationService,
    private config: LocalizationConfigService,
    private translateService: TranslateService,
  ) {
    if (this.singleton) {
      throw new Error(
        'LocalizationService is already provided by the root module'
      );
    }
    this._localeId = this.config.locale_id;
  }

  public initService(): Promise<void> {
    this._localeId = localStorage.getItem('language') || 'es-CO';
    return this.useLanguage(this._localeId);
  }

  public async useLanguage(lang: TranslateLanguage | string): Promise<void> {
    this.translateService.setDefaultLang(lang);
    try {
      return await this.translateService.use(lang).toPromise();
    } catch (e) {
      throw new Error('LocalizationService.init failed');
    }
  }

  public translate(key: string | string[], interpolateParams?: object): string {
    return this.translateService.instant(key, interpolateParams) as string;
  }

  public getCurrentLanguage(): string {
    return this.translateService.currentLang;
  }

  public getDefaultLanguage(): string {
    return this.translateService.defaultLang;
  }
}
