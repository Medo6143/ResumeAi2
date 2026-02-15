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
    <div class="space-y-4">

      <!-- Input Area -->
      <div *ngIf="!analysis() && !isLoading()">
        <p class="text-[11px] text-neutral-500 dark:text-neutral-400 mb-2">{{ 'CV_CREATE.JOB_MATCHER.DESC' | translate }}</p>
        <textarea
            [(ngModel)]="jobDescription"
            rows="4"
            [placeholder]="'CV_CREATE.JOB_MATCHER.PLACEHOLDER' | translate"
            class="studio-textarea !text-xs"></textarea>
        <button (click)="analyze()" [disabled]="!jobDescription.trim()"
            class="w-full mt-2 studio-btn-primary !py-2 !text-xs">
            {{ 'CV_CREATE.JOB_MATCHER.ANALYZE' | translate }}
        </button>
      </div>

      <!-- Loading -->
      <div *ngIf="isLoading()" class="py-6 text-center space-y-3">
        <div class="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p class="text-xs font-medium text-neutral-500 dark:text-neutral-400 font-mono">{{ 'CV_CREATE.JOB_MATCHER.ANALYZING' | translate }}</p>
      </div>

      <!-- Results -->
      <div *ngIf="analysis()" class="space-y-4 animate-fade-in">

        <!-- Score -->
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full flex items-center justify-center text-sm font-extrabold font-mono border-2"
                    [class.border-emerald-500]="analysis()!.score >= 80"
                    [class.text-emerald-600]="analysis()!.score >= 80"
                    [class.border-yellow-500]="analysis()!.score >= 60 && analysis()!.score < 80"
                    [class.text-yellow-600]="analysis()!.score >= 60 && analysis()!.score < 80"
                    [class.border-red-500]="analysis()!.score < 60"
                    [class.text-red-600]="analysis()!.score < 60">
                    {{ analysis()!.score }}%
                </div>
                <div>
                    <h4 class="text-xs font-bold text-neutral-900 dark:text-white">{{ 'CV_CREATE.JOB_MATCHER.SCORE' | translate }}</h4>
                    <p class="text-[10px] text-neutral-500 dark:text-neutral-400">{{ 'CV_CREATE.JOB_MATCHER.REASON' | translate }}</p>
                </div>
            </div>
            <button (click)="reset()" class="studio-btn-ghost !text-[10px] font-mono">
                {{ 'CV_CREATE.JOB_MATCHER.ANOTHER' | translate }}
            </button>
        </div>

        <!-- Keywords -->
        <div>
            <h5 class="studio-label !mb-2">{{ 'CV_CREATE.JOB_MATCHER.KEYWORDS_TITLE' | translate }}</h5>
            <div class="flex flex-wrap gap-1.5">
                <span *ngFor="let kw of analysis()!.matchedKeywords"
                    class="studio-skill-tag !bg-emerald-50 !text-emerald-700 !border-emerald-200 dark:!bg-emerald-950/30 dark:!text-emerald-400 dark:!border-emerald-800">
                    <svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    {{ kw }}
                </span>
                <span *ngFor="let kw of analysis()!.missingKeywords"
                    class="studio-skill-tag !bg-red-50 !text-red-700 !border-red-200 dark:!bg-red-950/30 dark:!text-red-400 dark:!border-red-800">
                    <svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                    {{ kw }}
                </span>
            </div>
        </div>

        <!-- Recommendations -->
        <div *ngIf="analysis()!.recommendations.length > 0">
            <h5 class="studio-label !mb-2">{{ 'CV_CREATE.JOB_MATCHER.TIPS' | translate }}</h5>
            <ul class="space-y-1">
                <li *ngFor="let rec of analysis()!.recommendations"
                    class="text-[11px] text-neutral-600 dark:text-neutral-400 flex items-start gap-2 leading-relaxed">
                    <span class="w-1 h-1 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0"></span>
                    {{ rec }}
                </li>
            </ul>
        </div>
      </div>

    </div>
    `,
    styles: [`
      :host { display: block; }
      .animate-fade-in {
        animation: fadeIn 200ms ease-out;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(4px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `]
})
export class JobMatcherComponent {
    private cvState = inject(CvStateService);
    private matcher = inject(JobMatcherService);

    isLoading = signal(false);
    jobDescription = '';
    analysis = signal<JobMatchResult | null>(null);

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
                }
            });
    }
}
