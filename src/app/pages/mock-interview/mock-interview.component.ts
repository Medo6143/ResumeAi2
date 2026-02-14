import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InterviewGeneratorService, InterviewQuestion, InterviewFeedback } from '../cv-creation/services/interview-generator.service';
import { CvStateService } from '../cv-creation/services/cv-state.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MockInterviewSetupComponent } from './components/mock-interview-setup.component';
import { MockInterviewQuestionComponent } from './components/mock-interview-question.component';
import { MockInterviewFeedbackComponent } from './components/mock-interview-feedback.component';
import { MockInterviewCompleteComponent } from './components/mock-interview-complete.component';

@Component({
    selector: 'app-mock-interview',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MockInterviewSetupComponent,
        MockInterviewQuestionComponent,
        MockInterviewFeedbackComponent,
        MockInterviewCompleteComponent,
        TranslateModule
    ],
    template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-6 flex flex-col items-center">
      
      <!-- Header -->
      <div class="w-full max-w-4xl flex justify-between items-center mb-8">
        <button routerLink="/create" class="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          {{ 'COMMON.BACK_TO_RESUME' | translate }}
        </button>
        <div class="flex flex-col items-center">
            <h1 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                {{ 'INTERVIEW.TITLE' | translate }}
            </h1>
            <span *ngIf="state() === 'interview'" class="text-xs font-mono text-slate-400 mt-1">
                AI Powered • Focusing on {{ cvState.resume().personalInfo.jobTitle }}
            </span>
        </div>
        <div class="w-24"></div> <!-- Spacer -->
      </div>

      <!-- Content Container -->
      <div class="w-full max-w-3xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden min-h-[500px] flex flex-col relative transition-all duration-300">
        
        <!-- Loading Overlay (Global) -->
        <div *ngIf="loading() && state() === 'interview'" class="absolute inset-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-[2px] z-50 flex flex-col items-center justify-center cursor-wait">
            <!-- Loading handled by sub-components usually, but this is a failsafe -->
        </div>

        <!-- 1. Setup State -->
        <app-mock-interview-setup 
            *ngIf="state() === 'setup'"
            [loading]="loading()"
            (start)="startInterview()">
        </app-mock-interview-setup>

        <!-- 2. Interview State (Question & Answer) -->
        <app-mock-interview-question
            *ngIf="state() === 'interview' && currentQuestionItem()"
            [question]="currentQuestionItem()!"
            [questionIndex]="currentQuestionIndex()"
            [totalQuestions]="totalQuestions()"
            [answer]="currentAnswer()"
            (answerChange)="currentAnswer.set($event)"
            [loading]="loading()"
            (submit)="submitAnswer()">
        </app-mock-interview-question>

        <!-- 3. Feedback Overlay -->
        <app-mock-interview-feedback
            *ngIf="showFeedback()"
            [feedback]="feedback()"
            (next)="nextQuestion()">
        </app-mock-interview-feedback>

        <!-- 4. Completion State -->
        <app-mock-interview-complete
            *ngIf="state() === 'complete'"
            (restart)="startInterview()">
        </app-mock-interview-complete>

      </div>
    </div>
  `
})
export class MockInterviewComponent {
    private interviewService = inject(InterviewGeneratorService);
    public cvState = inject(CvStateService);
    private translate = inject(TranslateService);

    // Signals state
    state = signal<'setup' | 'interview' | 'complete'>('setup');
    loading = signal(false);

    questions = signal<InterviewQuestion[]>([]);
    currentQuestionIndex = signal(0);

    // Computed signals
    currentQuestionItem = computed(() => this.questions()[this.currentQuestionIndex()]);
    totalQuestions = computed(() => this.questions().length);

    // Interaction state
    currentAnswer = signal('');
    showFeedback = signal(false);
    feedback = signal<InterviewFeedback | null>(null);

    startInterview() {
        this.loading.set(true);

        this.interviewService.generateQuestions(this.cvState.resume()).subscribe({
            next: (qs) => {
                this.questions.set(qs);
                this.currentQuestionIndex.set(0);
                this.state.set('interview');
                this.loading.set(false);
                this.resetTurn();
            },
            error: (err) => {
                console.error(err);
                this.loading.set(false);
                const msg = this.translate.instant('INTERVIEW.ERROR.GENERATE_FAILED');
                alert(msg);
            }
        });
    }

    resetTurn() {
        this.currentAnswer.set('');
        this.showFeedback.set(false);
        this.feedback.set(null);
    }

    submitAnswer() {
        const answerText = this.currentAnswer();
        if (!answerText.trim()) return;

        this.loading.set(true);

        this.interviewService.evaluateAnswer(this.currentQuestionItem()!.question, answerText).subscribe({
            next: (res) => {
                this.feedback.set(res);
                this.showFeedback.set(true);
                this.loading.set(false);
            },
            error: (err) => {
                console.error(err);
                this.loading.set(false);
                const msg = this.translate.instant('INTERVIEW.ERROR.ANALYZE_FAILED');
                alert(msg);
            }
        });
    }

    nextQuestion() {
        if (this.currentQuestionIndex() < this.questions().length - 1) {
            this.currentQuestionIndex.update(i => i + 1);
            this.resetTurn();
        } else {
            this.state.set('complete');
        }
    }
}
