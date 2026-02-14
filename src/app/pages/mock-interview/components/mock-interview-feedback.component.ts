import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterviewFeedback } from '../../cv-creation/services/interview-generator.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-mock-interview-feedback',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    template: `
    <div *ngIf="feedback" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
        <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 max-w-lg w-full transform transition-all scale-100 animate-jump-in">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-2xl font-bold text-slate-900 dark:text-white">{{ 'INTERVIEW.FEEDBACK.TITLE' | translate }}</h3>
                <div [class]="getScoreColor(feedback.score)"
                    class="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border-4">
                    {{ feedback.score }}
                </div>
            </div>

            <div class="space-y-4 mb-8">
                <div>
                    <h4 class="font-semibold text-slate-700 dark:text-slate-300 mb-1">{{ 'INTERVIEW.FEEDBACK.ANALYSIS' | translate }}</h4>
                    <p class="text-slate-600 dark:text-slate-400 leading-relaxed">{{ feedback.feedback }}</p>
                </div>
                <div class="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-800">
                    <h4 class="font-semibold text-yellow-700 dark:text-yellow-400 mb-1 flex items-center gap-2">
                        <span class="text-xl">💡</span> {{ 'INTERVIEW.FEEDBACK.TIP_TITLE' | translate }}
                    </h4>
                    <p class="text-yellow-800 dark:text-yellow-300 text-sm">{{ feedback.improvementTip }}</p>
                </div>
            </div>

            <button (click)="next.emit()"
                class="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
                {{ 'INTERVIEW.QUESTION.NEXT' | translate }}
            </button>
        </div>
    </div>
  `
})
export class MockInterviewFeedbackComponent {
    @Input({ required: true }) feedback!: InterviewFeedback | null;
    @Output() next = new EventEmitter<void>();

    getScoreColor(score: number): string {
        if (score >= 80) return 'border-green-500 text-green-600 bg-green-50 dark:bg-green-900/20';
        if (score >= 60) return 'border-yellow-500 text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
        return 'border-red-500 text-red-600 bg-red-50 dark:bg-red-900/20';
    }
}
