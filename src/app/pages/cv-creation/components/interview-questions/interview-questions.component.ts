import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CvStateService } from '../../services/cv-state.service';
import { InterviewGeneratorService, InterviewQuestion } from '../../services/interview-generator.service';

@Component({
    selector: 'app-interview-questions',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    template: `
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden mt-6">
      <!-- Header -->
      <div (click)="toggleCollapse()" 
           class="p-4 border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
        <h3 class="font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <svg class="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            {{ 'CV_CREATE.INTERVIEW.TITLE' | translate }}
        </h3>
        <svg class="w-5 h-5 text-slate-400 transform transition-transform duration-300" 
            [class.rotate-180]="!isCollapsed()">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <!-- Content -->
      <div *ngIf="!isCollapsed()" class="p-4 md:p-6 animate-fade-in">
        
        <!-- Welcome / Input -->
        <div *ngIf="questions().length === 0 && !isLoading()" class="text-center space-y-4">
            <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            </div>
            <h4 class="text-lg font-bold text-slate-800 dark:text-white">{{ 'CV_CREATE.INTERVIEW.PREPARE' | translate }}</h4>
            <p class="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                {{ 'CV_CREATE.INTERVIEW.DESC' | translate }}
            </p>
            
            <button (click)="generate()" 
                class="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all active:scale-95">
                {{ 'CV_CREATE.INTERVIEW.GENERATE' | translate }}
            </button>
        </div>

        <!-- Loading -->
        <div *ngIf="isLoading()" class="py-8 text-center space-y-4">
            <div class="relative w-16 h-16 mx-auto">
                <div class="absolute inset-0 rounded-full border-4 border-purple-100 dark:border-purple-900"></div>
                <div class="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
            </div>
            <p class="text-sm font-medium text-slate-600 dark:text-slate-400">{{ 'CV_CREATE.INTERVIEW.ANALYZING' | translate }}</p>
        </div>

        <!-- Results -->
        <div *ngIf="questions().length > 0" class="space-y-6">
            
            <div class="flex items-center justify-between">
                <h4 class="font-bold text-slate-800 dark:text-white">{{ 'CV_CREATE.INTERVIEW.YOUR_QUESTIONS' | translate }}</h4>
                <button (click)="reset()" class="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white underline">
                    {{ 'CV_CREATE.INTERVIEW.REGENERATE' | translate }}
                </button>
            </div>

            <div class="space-y-4">
                <div *ngFor="let q of questions(); let i = index" 
                     class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700/50">
                    
                    <div class="flex gap-3">
                        <span class="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 text-xs font-bold flex items-center justify-center mt-1">
                            {{ i + 1 }}
                        </span>
                        <div class="flex-1 space-y-2">
                            <p class="font-medium text-slate-800 dark:text-white leading-relaxed">{{ q.question }}</p>
                            
                            <div class="flex flex-wrap gap-2 text-xs">
                                <span class="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                                    {{ q.difficulty || ('CV_CREATE.INTERVIEW.GENERAL' | translate) }}
                                </span>
                                <span class="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/30">
                                    {{ 'CV_CREATE.INTERVIEW.CONTEXT' | translate }}: {{ q.context }}
                                </span>
                            </div>

                            <!-- Reveal Answer Tip -->
                            <div class="pt-2">
                                <button (click)="toggleTip(i)" 
                                    class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {{ (expandedTip() === i ? 'CV_CREATE.INTERVIEW.HIDE_TIP' : 'CV_CREATE.INTERVIEW.SHOW_TIP') | translate }}
                                </button>
                                
                                <div *ngIf="expandedTip() === i" class="mt-2 text-sm text-slate-600 dark:text-slate-300 bg-indigo-50 dark:bg-indigo-900/10 p-3 rounded-lg border-l-2 border-indigo-400 animate-fade-in">
                                    <span class="font-bold text-indigo-800 dark:text-indigo-300 block mb-1">💡 {{ 'CV_CREATE.INTERVIEW.PRO_TIP' | translate }}:</span>
                                    {{ q.answerTip }}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
        </div>

      </div>
    </div>
  `
})
export class InterviewQuestionsComponent {
    private cvState = inject(CvStateService);
    private generator = inject(InterviewGeneratorService);

    isCollapsed = signal(true);
    isLoading = signal(false);
    questions = signal<InterviewQuestion[]>([]);
    expandedTip = signal<number | null>(null);

    toggleCollapse() {
        this.isCollapsed.update(v => !v);
    }

    toggleTip(index: number) {
        this.expandedTip.update(current => current === index ? null : index);
    }

    reset() {
        this.questions.set([]);
        this.expandedTip.set(null);
    }

    generate() {
        this.isLoading.set(true);
        this.generator.generateQuestions(this.cvState.resume())
            .subscribe({
                next: (res) => {
                    this.questions.set(res);
                    this.isLoading.set(false);
                },
                error: (err) => {
                    console.error(err);
                    this.isLoading.set(false);
                    // Handle error
                }
            });
    }
}
