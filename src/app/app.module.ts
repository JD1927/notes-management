import { LayoutModule } from '@angular/cdk/layout';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InternationalizationModule } from './shared/modules/internationalization/internationalization.module';
import { registerLocaleData } from '@angular/common';
import localeCO from '@angular/common/locales/es-CO';
import localeEN from '@angular/common/locales/en';

registerLocaleData(localeCO, 'es-CO');
registerLocaleData(localeEN, 'en-US');

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, '../assets/locales/', '.json');
}

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		RouterModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebaseConfig), // Firebase SETUP
		AngularFireAuthModule, // Firebase AUTH
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
			// Register the ServiceWorker as soon as the app is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: 'registerWhenStable:30000',
		}), // PWA
		StoreModule.forRoot({}, {}),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		EffectsModule.forRoot([]),
		BrowserAnimationsModule,
		LayoutModule,
		HttpClientModule,
		InternationalizationModule.forRoot({ locale_id: 'es-CO' }), // initializing with default language: en-US
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
		}), // TRANSLATE SERVICE
	],
	providers: [AngularFirestore],
	bootstrap: [AppComponent],
})
export class AppModule {}
