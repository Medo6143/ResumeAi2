import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-mock-interview-setup',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    template: `
    <div class="max-w-2xl mx-auto text-center space-y-8 animate-fade-in-up">
        <div class="relative inline-block">
            <div class="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 rounded-full"></div>
            <img src="assets/interview-illustration.svg" alt="Interview" class="w-64 h-64 relative z-10 mx-auto drop-shadow-2xl" 
                onerror="this.src='https://cdn-icons-png.flaticon.com/512/7438/7438644.png'">
        </div>

        <div>
            <h2 class="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-4">
                {{ 'INTERVIEW.SETUP.GREETING' | translate }}
            </h2>
            <p class="text-lg text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                {{ 'INTERVIEW.SETUP.DESC' | translate }}
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-2xl mx-auto">
            <div class="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div class="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-3">
                    <span class="text-xl">🎯</span>
                </div>
                <h3 class="font-bold text-slate-800 dark:text-white mb-1">{{ 'INTERVIEW.SETUP.FEATURE_TAILORED' | translate }}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400">{{ 'INTERVIEW.SETUP.FEATURE_TAILORED_DESC' | translate }}</p>
            </div>
            <div class="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div class="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-3">
                    <span class="text-xl">💡</span>
                </div>
                <h3 class="font-bold text-slate-800 dark:text-white mb-1">{{ 'INTERVIEW.SETUP.FEATURE_FEEDBACK' | translate }}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400">{{ 'INTERVIEW.SETUP.FEATURE_FEEDBACK_DESC' | translate }}</p>
            </div>
            <div class="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div class="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
                    <span class="text-xl">🚀</span>
                </div>
                <h3 class="font-bold text-slate-800 dark:text-white mb-1">{{ 'INTERVIEW.SETUP.FEATURE_CONTEXT' | translate }}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400">{{ 'INTERVIEW.SETUP.FEATURE_CONTEXT_DESC' | translate }}</p>
            </div>
        </div>

        <button (click)="start.emit()" [disabled]="loading"
            class="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-3 mx-auto">
            <span *ngIf="!loading">{{ 'INTERVIEW.SETUP.START' | translate }}</span>
            <span *ngIf="loading" class="flex items-center gap-2">
                <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ 'INTERVIEW.SETUP.PROCESSING' | translate }}
            </span>
        </button>
    </div>
  `
})
export class MockInterviewSetupComponent {
    @Input() loading = false;
    @Output() start = new EventEmitter<void>();
}
