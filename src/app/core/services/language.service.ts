import { Injectable, signal, effect, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export type Language = 'en' | 'ar';

@Injectable({ providedIn: 'root' })
export class LanguageService {
    currentLang = signal<Language>('en');
    private isBrowser: boolean;

    constructor(
        private translate: TranslateService,
        @Inject(PLATFORM_ID) platformId: Object,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.isBrowser = isPlatformBrowser(platformId);

        // Initialize translate service
        this.translate.addLangs(['en', 'ar']);
        this.translate.setDefaultLang('en');

        // Load saved language from localStorage
        if (this.isBrowser) {
            const saved = localStorage.getItem('lang') as Language;
            if (saved && ['en', 'ar'].includes(saved)) {
                this.currentLang.set(saved);
            }
        }

        // Apply language on change
        effect(() => {
            const lang = this.currentLang();
            this.translate.use(lang);
            if (this.isBrowser) {
                localStorage.setItem('lang', lang);
                this.document.documentElement.lang = lang;
                this.document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
            }
        });
    }

    toggleLanguage(): void {
        this.currentLang.set(this.currentLang() === 'en' ? 'ar' : 'en');
    }
}
