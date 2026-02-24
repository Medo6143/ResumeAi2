import { ApplicationConfig, provideZonelessChangeDetection, APP_INITIALIZER, inject, PLATFORM_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from './core/config/firebase.config';
import { provideTranslation } from './core/config/translation.config';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGE } from './core/config/language.token';
import { isPlatformBrowser } from '@angular/common';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideTranslation(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideCharts(withDefaultRegisterables()),
    { provide: LANGUAGE, useValue: 'en' }, // Default fallback (will be overridden by server)
    {
      provide: APP_INITIALIZER,
      useFactory: (translate: TranslateService, lang: string, platformId: Object) => {
        return () => {
          // Determine language: server-provided > localStorage (client only) > default
          let finalLang = lang;

          if (isPlatformBrowser(platformId)) {
            // On client, check localStorage as fallback
            const saved = localStorage.getItem('lang');
            if (saved && ['en', 'ar'].includes(saved)) {
              finalLang = saved;
            }
          }

          // Initialize translation synchronously before app renders
          translate.setDefaultLang(finalLang);
          translate.addLangs(['en', 'ar']);

          // Use the language (returns promise, but we need sync initialization)
          return translate.use(finalLang).toPromise().catch(() => {
            // Fallback if translation files fail to load
            translate.use('en');
          });
        };
      },
      deps: [TranslateService, LANGUAGE, PLATFORM_ID],
      multi: true
    }
  ]
};
