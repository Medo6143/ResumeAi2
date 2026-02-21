import { Injectable, signal, effect, PLATFORM_ID, Inject, Optional } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGE } from '../config/language.token';

export type Language = 'en' | 'ar';

@Injectable({ providedIn: 'root' })
export class LanguageService {
    currentLang = signal<Language>('en');
    private isBrowser: boolean;

    constructor(
        private translate: TranslateService,
        @Inject(PLATFORM_ID) platformId: Object,
        @Inject(DOCUMENT) private document: Document,
        @Optional() @Inject(LANGUAGE) serverLang?: string
    ) {
        this.isBrowser = isPlatformBrowser(platformId);

        // Initialize translate service
        this.translate.addLangs(['en', 'ar']);
        this.translate.setDefaultLang('en');

        // Priority: Server-provided language > localStorage > default
        let initialLang: Language = 'en';

        if (serverLang && ['en', 'ar'].includes(serverLang)) {
            // Use server-provided language (SSR)
            initialLang = serverLang as Language;
        } else if (this.isBrowser) {
            // Client-side: check localStorage
            const saved = localStorage.getItem('lang') as Language;
            if (saved && ['en', 'ar'].includes(saved)) {
                initialLang = saved;
            }
        }

        // Set initial language synchronously before any effects
        this.currentLang.set(initialLang);
        this.translate.setDefaultLang(initialLang);
        this.translate.use(initialLang);

        // Apply language on change (for runtime changes)
        effect(() => {
            const lang = this.currentLang();
            this.translate.use(lang);
            if (this.isBrowser) {
                localStorage.setItem('lang', lang);
                // Set cookie for SSR
                document.cookie = `lang=${lang}; path=/; max-age=31536000`; // 1 year
                this.document.documentElement.lang = lang;
                this.document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
            }
        });
    }

    toggleLanguage(): void {
        this.currentLang.set(this.currentLang() === 'en' ? 'ar' : 'en');
    }
}
