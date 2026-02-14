import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InterviewQuestion } from '../../cv-creation/services/interview-generator.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-mock-interview-question',
    standalone: true,
    imports: [CommonModule, FormsModule, TranslateModule],
    template: `
        <div class="flex-1 flex flex-col p-8 animate-slide-in-right">
            <!-- Progress -->
            <div class="flex items-center justify-between mb-8 text-sm font-medium text-slate-500">
                <span>{{ 'INTERVIEW.QUESTION.LABEL' | translate }} {{ questionIndex + 1 }} {{ 'COMMON.OF' | translate }} {{ totalQuestions }}</span>
                <span class="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full">
                    {{ question.difficulty }}
                </span>
            </div>

            <!-- Question -->
            <div class="mb-8">
                <h3 class="text-2xl font-bold text-slate-800 dark:text-white mb-2">{{ question.question }}</h3>
                <p class="text-sm text-indigo-500 italic flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {{ 'INTERVIEW.SETUP.FEATURE_CONTEXT' | translate }}: {{ question.context }}
                </p>
            </div>

            <!-- Answer Input -->
            <div class="flex-1 mb-8">
                <textarea 
                    [ngModel]="answer"
                    (ngModelChange)="answerChange.emit($event)"
                    [placeholder]="'INTERVIEW.QUESTION.PLACEHOLDER' | translate"
                    class="w-full h-full min-h-[200px] p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 transition-all resize-none text-slate-700 dark:text-slate-300 placeholder-slate-400"
                ></textarea>
            </div>

            <!-- Action -->
            <div class="flex justify-end">
                <button (click)="submit.emit()" [disabled]="!answer.trim() || loading"
                    class="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                    <span *ngIf="!loading">{{ 'INTERVIEW.QUESTION.SUBMIT' | translate }}</span>
                    <span *ngIf="loading" class="flex items-center gap-2">
                        <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {{ 'INTERVIEW.QUESTION.THINKING' | translate }}
                    </span>
                </button>
            </div>
        </div>
  `
})
export class MockInterviewQuestionComponent {
    @Input({ required: true }) question!: InterviewQuestion;
    @Input({ required: true }) questionIndex!: number;
    @Input({ required: true }) totalQuestions!: number;
    @Input() answer: string = '';
    @Output() answerChange = new EventEmitter<string>();
    @Input() loading: boolean = false;
    @Output() submit = new EventEmitter<void>();
}
