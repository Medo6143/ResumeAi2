import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [CommonModule, RouterModule, TranslateModule],
    template: `
        <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 px-4">
            <div class="max-w-2xl w-full text-center">
                <!-- Animated 404 -->
                <div class="mb-8 relative">
                    <h1 class="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 animate-pulse">
                        404
                    </h1>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-64 h-64 md:w-96 md:h-96 rounded-full bg-indigo-500/10 dark:bg-indigo-400/10 blur-3xl animate-pulse"></div>
                    </div>
                </div>

                <!-- Content -->
                <div class="space-y-6 mb-10">
                    <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
                        {{ (translate.get('NOT_FOUND.TITLE') | async) || 'Page Not Found' }}
                    </h2>
                    <p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
                        {{ (translate.get('NOT_FOUND.DESCRIPTION') | async) || 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.' }}
                    </p>
                </div>

                <!-- Actions -->
                <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a routerLink="/" 
                       class="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {{ (translate.get('NOT_FOUND.GO_HOME') | async) || 'Go Home' }}
                    </a>
                    <button (click)="goBack()" 
                            class="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-medium rounded-lg border border-neutral-200 dark:border-neutral-700 transition-colors duration-200 shadow-md hover:shadow-lg">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {{ (translate.get('NOT_FOUND.GO_BACK') | async) || 'Go Back' }}
                    </button>
                </div>

                <!-- Decorative elements -->
                <div class="mt-16 flex justify-center gap-2 opacity-30">
                    <div class="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style="animation-delay: 0s"></div>
                    <div class="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style="animation-delay: 0.2s"></div>
                    <div class="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style="animation-delay: 0.4s"></div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        .animate-pulse {
            animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
    `]
})
export class NotFoundComponent {
    translate = inject(TranslateService);

    goBack() {
        window.history.back();
    }
}
