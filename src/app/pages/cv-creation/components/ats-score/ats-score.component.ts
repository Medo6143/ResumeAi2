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
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300">
      <!-- Header -->
      <div class="p-4 border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
        <div>
            <h3 class="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <svg class="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                {{ 'CV_CREATE.ATS.TITLE' | translate }}
            </h3>
            <p class="text-[10px] text-slate-400 mt-0.5 font-medium uppercase tracking-tight">
                {{ 'CV_CREATE.ATS.METHOD' | translate }}: {{ (isAiAnalyzed ? 'CV_CREATE.ATS.DEEP_SCAN' : 'CV_CREATE.ATS.HEURISTICS') | translate }}
            </p>
        </div>
        <span [class]="isAiAnalyzed ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40' : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30'"
            class="text-[10px] font-black px-2 py-1 rounded-full border border-current opacity-80">
            {{ isAiAnalyzed ? 'PRO' : 'BETA' }}
        </span>
      </div>

      <div class="p-4 md:p-6">
        <div class="flex items-center gap-6 mb-6">
            <!-- Circular Score -->
            <div class="relative w-24 h-24 flex-shrink-0 group cursor-help">
                <svg class="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="8" fill="transparent" class="text-slate-100 dark:text-slate-700" />
                    <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="8" fill="transparent" 
                        [class]="scoreColor()"
                        [style.stroke-dasharray]="circumference"
                        [style.stroke-dashoffset]="dashOffset()"
                        class="transition-all duration-1000 ease-out" />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center flex-col">
                    <span class="text-2xl font-extrabold text-slate-800 dark:text-white">{{ analysis().score }}</span>
                    <span class="text-[10px] uppercase text-slate-400 font-bold">{{ 'CV_CREATE.ATS.RELIABILITY' | translate }}</span>
                </div>
                
                <!-- Tooltip on hover -->
                <div class="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    {{ 'CV_CREATE.ATS.TOOLTIP' | translate }}
                </div>
            </div>

            <!-- Breakdown -->
            <div class="flex-1 space-y-3">
                <div *ngFor="let item of breakdownItems()">
                    <div class="flex justify-between text-[11px] mb-1">
                        <span class="font-semibold text-slate-500 dark:text-slate-400 capitalize">{{ item.label | translate }}</span>
                        <span class="font-bold text-slate-800 dark:text-slate-200">{{ item.value }}/25</span>
                    </div>
                    <div class="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div class="h-full rounded-full transition-all duration-700 delay-300"
                             [class]="item.color"
                             [style.width.%]="(item.value / 25) * 100"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Action Button -->
         <button (click)="runDeepScan()" [disabled]="isLoadingAi"
            class="w-full py-3 mb-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-50">
            <svg *ngIf="!isLoadingAi" class="w-4 h-4 text-indigo-500 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <div *ngIf="isLoadingAi" class="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            {{ (isAiAnalyzed ? 'CV_CREATE.ATS.REFRESH' : 'CV_CREATE.ATS.RUN') | translate }}
         </button>

        <!-- Recommendations -->
        <div *ngIf="analysis().recommendations.length > 0" class="space-y-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
            <h4 class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">{{ 'CV_CREATE.ATS.ACTION_ITEMS' | translate }}</h4>
            <div *ngFor="let rec of analysis().recommendations.slice(0, 4)" 
                class="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 group hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-colors">
                <div class="w-5 h-5 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg class="w-3 h-3 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <span class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{{ rec }}</span>
            </div>
             <div *ngIf="analysis().recommendations.length > 4" class="text-[10px] text-center text-slate-400 mt-2 font-medium">
                {{ 'CV_CREATE.ATS.MORE' | translate: { count: analysis().recommendations.length - 4 } }}
            </div>
        </div>
        
        <div *ngIf="analysis().recommendations.length === 0" class="text-center py-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/20">
            <div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <p class="text-sm font-bold text-emerald-800 dark:text-emerald-300">{{ 'CV_CREATE.ATS.OPTIMIZED' | translate }}</p>
            <p class="text-[10px] text-emerald-600 dark:text-emerald-500 font-medium px-4 mt-1">{{ 'CV_CREATE.ATS.OPTIMIZED_DESC' | translate }}</p>
        </div>
      </div>
    </div>
  `
})
export class AtsScoreComponent {
    private cvState = inject(CvStateService);
    private analyzer = inject(AtsAnalyzerService);

    resume = this.cvState.resume;
    isAiAnalyzed = false;
    isLoadingAi = false;

    // Store AI analysis result in a signal
    aiAnalysis = signal<AtsAnalysisResult | null>(null);

    // Prefer AI analysis if it exists, otherwise use real-time heuristics
    analysis = computed(() => {
        const aiRes = this.aiAnalysis();
        if (aiRes) return aiRes;
        return this.analyzer.analyze(this.resume());
    });

    circumference = 2 * Math.PI * 40; // r=40

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
            },
            error: (err) => {
                console.error('Deep scan failed', err);
                this.isLoadingAi = false;
                alert('Deep Analysis failed. Please check your API key/connection.');
            }
        });
    }
}
