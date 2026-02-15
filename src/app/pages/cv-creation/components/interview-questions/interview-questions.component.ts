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
    <div class="space-y-4">

      <!-- Welcome / Generate -->
      <div *ngIf="questions().length === 0 && !isLoading()" class="text-center py-4 space-y-3">
        <p class="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto">
            {{ 'CV_CREATE.INTERVIEW.DESC' | translate }}
        </p>
        <button (click)="generate()" class="studio-btn-primary !text-xs !py-2">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            {{ 'CV_CREATE.INTERVIEW.GENERATE' | translate }}
        </button>
      </div>

      <!-- Loading -->
      <div *ngIf="isLoading()" class="py-6 text-center space-y-3">
        <div class="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p class="text-xs font-medium text-neutral-500 dark:text-neutral-400 font-mono">{{ 'CV_CREATE.INTERVIEW.ANALYZING' | translate }}</p>
      </div>

      <!-- Questions -->
      <div *ngIf="questions().length > 0" class="space-y-3 animate-fade-in">

        <div class="flex items-center justify-between mb-1">
            <span class="studio-badge font-mono">{{ questions().length }} {{ 'CV_CREATE.INTERVIEW.YOUR_QUESTIONS' | translate }}</span>
            <button (click)="reset()" class="studio-btn-ghost !text-[10px] font-mono">
                {{ 'CV_CREATE.INTERVIEW.REGENERATE' | translate }}
            </button>
        </div>

        <div *ngFor="let q of questions(); let i = index"
             class="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/50 space-y-2">

            <div class="flex gap-2">
                <span class="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold font-mono flex items-center justify-center flex-shrink-0 mt-0.5">
                    {{ i + 1 }}
                </span>
                <p class="text-xs font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed flex-1">{{ q.question }}</p>
            </div>

            <div class="flex flex-wrap gap-1.5 ml-7">
                <span *ngIf="q.difficulty" class="studio-badge !text-[8px]">{{ q.difficulty }}</span>
                <span *ngIf="q.context" class="studio-badge-accent !text-[8px]">{{ q.context }}</span>
            </div>

            <!-- Tip toggle -->
            <div class="ml-7">
                <button (click)="toggleTip(i)"
                    class="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-mono">
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ (expandedTip() === i ? 'CV_CREATE.INTERVIEW.HIDE_TIP' : 'CV_CREATE.INTERVIEW.SHOW_TIP') | translate }}
                </button>
                <div *ngIf="expandedTip() === i"
                    class="mt-1.5 text-[11px] text-neutral-600 dark:text-neutral-400 bg-indigo-50 dark:bg-indigo-900/10 p-2.5 rounded-lg border-l-2 border-indigo-400 leading-relaxed animate-fade-in">
                    {{ q.answerTip }}
                </div>
            </div>
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
export class InterviewQuestionsComponent {
    private cvState = inject(CvStateService);
    private generator = inject(InterviewGeneratorService);

    isLoading = signal(false);
    questions = signal<InterviewQuestion[]>([]);
    expandedTip = signal<number | null>(null);

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
                }
            });
    }
}
