import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CvStateService } from '../cv-creation/services/cv-state.service';
import { TranslateModule } from '@ngx-translate/core';
import { MockInterviewSetupComponent } from './components/mock-interview-setup.component';

@Component({
  selector: 'app-mock-interview',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MockInterviewSetupComponent,
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
                Mimo HR
            </h1>
            <span class="text-xs font-mono text-slate-400 mt-1">
                AI Powered • Focusing on {{ cvState.resume().personalInfo?.jobTitle || 'Your Role' }}
            </span>
        </div>
        <div class="w-24"></div> <!-- Spacer -->
      </div>

      <!-- Content Container -->
      <div class="w-full max-w-3xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden min-h-[500px] flex flex-col relative transition-all duration-300">
        <!-- 1. Setup State -->
        <app-mock-interview-setup 
            [loading]="loading()"
            (start)="handleStart($event)">
        </app-mock-interview-setup>
      </div>
    </div>
  `
})
export class MockInterviewComponent {
  public cvState = inject(CvStateService);
  private router = inject(Router);

  // Signals state
  loading = signal(false);

  handleStart(config: { type: 'direct' | 'flowing', lang: 'en-US' | 'ar-SA', difficulty: 'junior' | 'mid' | 'senior', jobTitle: string }) {
    this.router.navigate(['/mock-interview/voice'], {
      queryParams: {
        lang: config.lang,
        type: config.type,
        difficulty: config.difficulty,
        jobTitle: config.jobTitle
      }
    });
  }
}
