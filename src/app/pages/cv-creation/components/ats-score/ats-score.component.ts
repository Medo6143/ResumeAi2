import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CvStateService } from '../../services/cv-state.service';
import { AtsAnalyzerService, AtsAnalysisResult } from '../../services/ats-analyzer.service';

@Component({
    selector: 'app-ats-score',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    template: `
    <div class="space-y-4">

      <!-- Score + Breakdown row -->
      <div class="flex items-start gap-5">
        <!-- Compact circular score -->
        <div class="relative w-16 h-16 flex-shrink-0">
            <svg class="w-full h-full transform -rotate-90">
                <circle cx="32" cy="32" r="26" stroke="currentColor" stroke-width="5" fill="transparent"
                    class="text-neutral-100 dark:text-neutral-800" />
                <circle cx="32" cy="32" r="26" stroke="currentColor" stroke-width="5" fill="transparent"
                    [class]="scoreColor()"
                    [style.stroke-dasharray]="circumference"
                    [style.stroke-dashoffset]="dashOffset()"
                    class="transition-all duration-700 ease-out" />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center flex-col">
                <span class="text-lg font-extrabold text-neutral-900 dark:text-white font-mono">{{ analysis().score }}</span>
            </div>
        </div>

        <!-- Breakdown bars -->
        <div class="flex-1 space-y-2">
            <div *ngFor="let item of breakdownItems()">
                <div class="flex justify-between text-[10px] mb-0.5">
                    <span class="font-semibold text-neutral-500 dark:text-neutral-400 capitalize font-mono">{{ item.label | translate }}</span>
                    <span class="font-bold text-neutral-700 dark:text-neutral-300 font-mono">{{ item.value }}/25</span>
                </div>
                <div class="h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-700"
                         [class]="item.color"
                         [style.width.%]="(item.value / 25) * 100"></div>
                </div>
            </div>
        </div>
      </div>

      <!-- Deep Scan Button -->
      <button (click)="runDeepScan()" [disabled]="isLoadingAi"
        class="w-full studio-btn-ghost !justify-center !py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg">
        <svg *ngIf="!isLoadingAi" class="w-3.5 h-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <div *ngIf="isLoadingAi" class="w-3.5 h-3.5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <span class="font-mono text-[11px]">{{ (isAiAnalyzed ? 'CV_CREATE.ATS.REFRESH' : 'CV_CREATE.ATS.RUN') | translate }}</span>
        <span *ngIf="isAiAnalyzed" class="studio-badge-accent !text-[8px] !px-1.5">PRO</span>
      </button>

      <!-- Recommendations (collapsible) -->
      <div *ngIf="analysis().recommendations.length > 0">
        <button (click)="showRecs = !showRecs" class="studio-btn-ghost !px-0 !text-[11px] w-full !justify-between">
            <span class="font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                {{ 'CV_CREATE.ATS.ACTION_ITEMS' | translate }}
            </span>
            <svg class="w-3.5 h-3.5 transition-transform" [class.rotate-180]="showRecs" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        <div *ngIf="showRecs" class="space-y-1.5 mt-2 animate-fade-in">
            <div *ngFor="let rec of analysis().recommendations.slice(0, 5)"
                class="flex items-start gap-2 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <span class="w-1 h-1 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></span>
                {{ rec }}
            </div>
        </div>
      </div>

      <!-- All good message -->
      <div *ngIf="analysis().recommendations.length === 0" class="text-center py-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30">
        <p class="text-xs font-bold text-emerald-700 dark:text-emerald-400">{{ 'CV_CREATE.ATS.OPTIMIZED' | translate }}</p>
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
export class AtsScoreComponent {
    private cvState = inject(CvStateService);
    private analyzer = inject(AtsAnalyzerService);

    resume = this.cvState.resume;
    isAiAnalyzed = false;
    isLoadingAi = false;
    showRecs = false;

    aiAnalysis = signal<AtsAnalysisResult | null>(null);

    analysis = computed(() => {
        const aiRes = this.aiAnalysis();
        if (aiRes) return aiRes;
        return this.analyzer.analyze(this.resume());
    });

    circumference = 2 * Math.PI * 26;

    dashOffset = computed(() => {
        const score = this.analysis().score;
        const progress = score / 100;
        return this.circumference * (1 - progress);
    });

    scoreColor = computed(() => {
        const score = this.analysis().score;
        if (score >= 80) return 'text-emerald-500';
        if (score >= 60) return 'text-yellow-500';
        return 'text-red-500';
    });

    breakdownItems = computed(() => {
        const b = this.analysis().breakdown;
        return [
            { label: 'CV_CREATE.ATS.BREAKDOWN.CONTACT', value: b.contact, color: 'bg-blue-500' },
            { label: 'CV_CREATE.ATS.BREAKDOWN.CONTENT', value: b.content, color: 'bg-purple-500' },
            { label: 'CV_CREATE.ATS.BREAKDOWN.KEYWORDS', value: b.keywords, color: 'bg-pink-500' },
            { label: 'CV_CREATE.ATS.BREAKDOWN.FORMATTING', value: b.formatting, color: 'bg-indigo-500' }
        ];
    });

    runDeepScan() {
        this.isLoadingAi = true;
        this.analyzer.deepScan(this.resume()).subscribe({
            next: (result) => {
                this.aiAnalysis.set(result);
                this.isAiAnalyzed = true;
                this.isLoadingAi = false;
                this.showRecs = true;
            },
            error: (err) => {
                console.error('Deep scan failed', err);
                this.isLoadingAi = false;
                alert('Deep Analysis failed. Please check your API key/connection.');
            }
        });
    }
}
