import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
	APP_INITIALIZER,
	LOCALE_ID,
	ModuleWithProviders,
	NgModule,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationConfigService } from '../../services/translation/translation-config.service';
import { TranslationService } from '../../services/translation/translation.service';

@NgModule({
	declarations: [],
	imports: [CommonModule, HttpClientModule, TranslateModule.forChild()],
	exports: [TranslateModule],
})
export class InternationalizationModule {
	public static forRoot(
		config: any,
	): ModuleWithProviders<InternationalizationModule> {
		return {
			ngModule: InternationalizationModule,
			providers: [
				{
					provide: APP_INITIALIZER,
					useFactory: initLocalizationService,
					deps: [TranslationService],
					multi: true,
				},
				TranslationService,
				{ provide: LOCALE_ID, useValue: config.locale_id }, // using the initial value
				{ provide: TranslationConfigService, useValue: config },
			],
		};
	}
}

export function initLocalizationService(service: TranslationService) {
	return () => service.initService();
}
