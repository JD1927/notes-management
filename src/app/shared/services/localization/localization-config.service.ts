import { Injectable } from '@angular/core';
import { TranslateLanguage } from '../../models/translate-language.model';

@Injectable({
  providedIn: 'root'
})
export class LocalizationConfigService {
  public locale_id: TranslateLanguage = '';
}
