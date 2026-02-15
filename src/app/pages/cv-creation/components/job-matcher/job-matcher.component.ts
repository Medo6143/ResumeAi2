import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CvStateService } from '../../services/cv-state.service';
import { JobMatcherService, JobMatchResult } from '../../services/job-matcher.service';

@Component({
    selector: 'app-job-matcher',
    standalone: true,
    imports: [CommonModule, FormsModule, TranslateModule],
    template: `
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden mt-6">
      <!-- Header -->
      <div (click)="toggleCollapse()" 
           class="p-4 border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
        <h3 class="font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <svg class="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {{ 'CV_CREATE.JOB_MATCHER.TITLE' | translate }}
        </h3>
        <svg class="w-5 h-5 text-slate-400 transform transition-transform duration-300" 
            [class.rotate-180]="!isCollapsed()">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <!-- Content -->
      <div *ngIf="!isCollapsed()" class="p-4 md:p-6 animate-fade-in">
        
        <!-- Input Area -->
        <div *ngIf="!analysis() && !isLoading()" class="space-y-4">
            <p class="text-sm text-slate-600 dark:text-slate-400">{{ 'CV_CREATE.JOB_MATCHER.DESC' | translate }}</p>
            <textarea 
                [(ngModel)]="jobDescription" 
                rows="6"
                [placeholder]="'CV_CREATE.JOB_MATCHER.PLACEHOLDER' | translate"
                class="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"></textarea>
            
            <button (click)="analyze()" 
                [disabled]="!jobDescription.trim()"
                class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                {{ 'CV_CREATE.JOB_MATCHER.ANALYZE' | translate }}
            </button>
        </div>

        <!-- Loading -->
        <div *ngIf="isLoading()" class="py-8 text-center space-y-4">
            <div class="relative w-16 h-16 mx-auto">
                <div class="absolute inset-0 rounded-full border-4 border-emerald-100 dark:border-emerald-900"></div>
                <div class="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
            </div>
            <p class="text-sm font-medium text-slate-600 dark:text-slate-400">{{ 'CV_CREATE.JOB_MATCHER.ANALYZING' | translate }}</p>
        </div>

        <!-- Results -->
        <div *ngIf="analysis()" class="space-y-6">
            
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <div class="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border-4"
                        [class.border-emerald-500]="analysis()!.score >= 80"
                        [class.text-emerald-600]="analysis()!.score >= 80"
                        [class.border-yellow-500]="analysis()!.score >= 60 && analysis()!.score < 80"
                        [class.text-yellow-600]="analysis()!.score >= 60 && analysis()!.score < 80"
                        [class.border-red-500]="analysis()!.score < 60"
                        [class.text-red-600]="analysis()!.score < 60">
                        {{ analysis()!.score }}%
                    </div>
                    <div>
                        <h4 class="font-bold text-slate-800 dark:text-white">{{ 'CV_CREATE.JOB_MATCHER.SCORE' | translate }}</h4>
                        <p class="text-xs text-slate-500">{{ 'CV_CREATE.JOB_MATCHER.REASON' | translate }}</p>
                    </div>
                </div>
                <button (click)="reset()" class="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white underline">
                    {{ 'CV_CREATE.JOB_MATCHER.ANOTHER' | translate }}
                </button>
            </div>

            <!-- Keywords -->
            <div class="space-y-2">
                <h5 class="text-xs font-bold text-slate-500 uppercase tracking-wider">{{ 'CV_CREATE.JOB_MATCHER.KEYWORDS_TITLE' | translate }}</h5>
                
                <div class="flex flex-wrap gap-2">
                    <span *ngFor="let kw of analysis()!.matchedKeywords" 
                        class="px-2 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        {{ kw }}
                    </span>
                    <span *ngFor="let kw of analysis()!.missingKeywords" 
                        class="px-2 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800 flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                        {{ kw }}
                    </span>
                </div>
            </div>

            <!-- Recommendations -->
            <div class="space-y-2" *ngIf="analysis()!.recommendations.length > 0">
                <h5 class="text-xs font-bold text-slate-500 uppercase tracking-wider">{{ 'CV_CREATE.JOB_MATCHER.TIPS' | translate }}</h5>
                <ul class="space-y-2">
                    <li *ngFor="let rec of analysis()!.recommendations" class="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0"></span>
                        {{ rec }}
                    </li>
                </ul>
            </div>
            
        </div>

      </div>
    </div>
  `
})
export class JobMatcherComponent {
    private cvState = inject(CvStateService);
    private matcher = inject(JobMatcherService);

    isCollapsed = signal(true); // Default collapsed to save space
    isLoading = signal(false);
    jobDescription = '';
    analysis = signal<JobMatchResult | null>(null);

    toggleCollapse() {
        this.isCollapsed.update(v => !v);
    }

    reset() {
        this.analysis.set(null);
        this.jobDescription = '';
    }

    analyze() {
        if (!this.jobDescription.trim()) return;

        this.isLoading.set(true);
        this.matcher.analyzeMatch(this.cvState.resume(), this.jobDescription)
            .subscribe({
                next: (res) => {
                    this.analysis.set(res);
                    this.isLoading.set(false);
                },
                error: (err) => {
                    console.error(err);
                    this.isLoading.set(false);
                    // Handle error (maybe toast)
                }
            });
    }
}
