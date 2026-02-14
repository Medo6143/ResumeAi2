import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-mock-interview-complete',
    standalone: true,
    imports: [CommonModule, RouterModule, TranslateModule],
    template: `
    <div class="text-center animate-bounce-in">
        <div class="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <span class="text-4xl">🎉</span>
        </div>
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">{{ 'INTERVIEW.COMPLETE.TITLE' | translate }}</h2>
        <p class="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
            {{ 'INTERVIEW.COMPLETE.SUMMARY' | translate }}
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button (click)="restart.emit()"
                class="px-8 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                {{ 'INTERVIEW.COMPLETE.RESTART' | translate }}
            </button>
            <button routerLink="/"
                class="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
                {{ 'INTERVIEW.COMPLETE.EXIT' | translate }}
            </button>
        </div>
    </div>
  `
})
export class MockInterviewCompleteComponent {
    @Output() restart = new EventEmitter<void>();
}
