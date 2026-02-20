import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CvStateService } from '../../cv-creation/services/cv-state.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-mock-interview-setup',
    standalone: true,
    imports: [CommonModule, TranslateModule, FormsModule],
    template: `
    <div class="max-w-4xl mx-auto text-center space-y-10 animate-fade-in-up py-4 sm:py-8 h-full flex flex-col">
        
        <!-- Premium Stepper -->
        <div class="w-full max-w-2xl mx-auto mb-4 px-4">
            <div class="flex items-center justify-between relative">
                <!-- Progress Line -->
                <div class="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 z-0"></div>
                <div class="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 -translate-y-1/2 z-0 transition-all duration-500"
                     [style.width.%]="(currentStep - 1) * 33.33"></div>
                
                <div *ngFor="let s of [1,2,3,4]" 
                     class="relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all duration-500"
                     [ngClass]="{
                        'bg-indigo-600 border-indigo-600 text-white scale-125 shadow-lg shadow-indigo-500/30': currentStep === s,
                        'bg-emerald-500 border-emerald-500 text-white': currentStep > s,
                        'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400': currentStep < s
                     }">
                    <span *ngIf="currentStep <= s">{{ s }}</span>
                    <svg *ngIf="currentStep > s" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
                </div>
            </div>
            <div class="flex justify-between mt-4 text-[10px] uppercase font-black tracking-widest text-slate-400">
                <span>Role</span>
                <span>Style</span>
                <span>Setup</span>
                <span>Review</span>
            </div>
        </div>

        <div class="flex-1 flex flex-col justify-center gap-10">
            <!-- Step 1: Role Confirmation -->
            <div *ngIf="currentStep === 1" class="space-y-8 animate-fade-in-right">
                <div class="space-y-4">
                    <h3 class="text-3xl font-black text-slate-800 dark:text-white">Confirm Your Role</h3>
                    <p class="text-slate-500 dark:text-slate-400">Mimo will tailor the interview specifically for this position.</p>
                </div>
                
                <div class="max-w-md mx-auto relative group">
                    <div class="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-300"></div>
                    <input [(ngModel)]="jobTitle" 
                           class="relative w-full px-6 py-5 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700/50 rounded-2xl text-xl font-bold focus:border-indigo-500 outline-none transition-all text-center dark:text-white"
                           placeholder="e.g. Senior Frontend Engineer">
                </div>

                <div class="flex justify-center gap-3 flex-wrap">
                    <button *ngFor="let suggestion of ['Software Engineer', 'Product Manager', 'UX Designer', 'Data Scientist']"
                            (click)="jobTitle = suggestion"
                            class="px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors dark:text-slate-300">
                        {{ suggestion }}
                    </button>
                </div>
            </div>

            <!-- Step 2: Session Style -->
            <div *ngIf="currentStep === 2" class="space-y-8 animate-fade-in-right">
                 <div class="space-y-4 px-4">
                    <h3 class="text-3xl font-black text-slate-800 dark:text-white">Choose Interview Style</h3>
                    <p class="text-slate-500 dark:text-slate-400 text-lg">How do you want to interact with Mimo?</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4">
                    <!-- Direct Questions Mode -->
                    <button (click)="type = 'direct'; nextStep()"
                            class="group relative p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] border-2 transition-all duration-300 text-left hover:shadow-2xl hover:-translate-y-2"
                            [ngClass]="type === 'direct' ? 'border-indigo-600 shadow-indigo-500/10' : 'border-slate-100 dark:border-slate-700/50 hover:border-indigo-300'">
                        <div class="w-16 h-16 rounded-3xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <span class="text-4xl">🎯</span>
                        </div>
                        <h3 class="text-2xl font-black text-slate-800 dark:text-white mb-3">Direct Questions</h3>
                        <p class="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                            Focus on targeted technical or resume topics. Sharp, one-by-one assessment of your skills.
                        </p>
                    </button>

                    <!-- Full HR Interview Mode -->
                    <button (click)="type = 'flowing'; nextStep()"
                            class="group relative p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] border-2 transition-all duration-300 text-left hover:shadow-2xl hover:-translate-y-2"
                            [ngClass]="type === 'flowing' ? 'border-purple-600 shadow-purple-500/10' : 'border-slate-100 dark:border-slate-700/50 hover:border-purple-300'">
                        <div class="w-16 h-16 rounded-3xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <span class="text-4xl">💬</span>
                        </div>
                        <h3 class="text-2xl font-black text-slate-800 dark:text-white mb-3">Full HR Interview</h3>
                        <p class="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                            A natural conversation deep-diving into your fit, story, and complex behavioral scenarios.
                        </p>
                    </button>
                </div>
            </div>

            <!-- Step 3: Difficulty & Language -->
            <div *ngIf="currentStep === 3" class="space-y-10 animate-fade-in-right px-4">
                 <div class="space-y-4">
                    <h3 class="text-3xl font-black text-slate-800 dark:text-white">Fine-tune Your Session</h3>
                    <p class="text-slate-500 dark:text-slate-400">Set the pace and language for your session.</p>
                </div>

                <div class="max-w-lg mx-auto space-y-8">
                    <!-- Difficulty -->
                    <div class="space-y-4">
                        <label class="text-sm font-black uppercase tracking-widest text-slate-400">Intensity Level</label>
                        <div class="grid grid-cols-3 gap-3 p-1.5 bg-slate-100 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <button *ngFor="let d of ['junior', 'mid', 'senior']"
                                    (click)="difficulty = d"
                                    class="py-3 rounded-xl font-bold capitalize transition-all"
                                    [ngClass]="difficulty === d ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-xl' : 'text-slate-500 hover:text-slate-700'">
                                {{ d }}
                            </button>
                        </div>
                    </div>

                    <!-- Language -->
                    <div class="space-y-4">
                        <label class="text-sm font-black uppercase tracking-widest text-slate-400">Language</label>
                        <div class="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <button (click)="lang = 'en-US'"
                                    class="py-3 rounded-xl font-bold transition-all"
                                    [ngClass]="lang === 'en-US' ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-xl' : 'text-slate-500 hover:text-slate-700'">
                                English
                            </button>
                            <button (click)="lang = 'ar-SA'"
                                    class="py-3 rounded-xl font-bold transition-all"
                                    [ngClass]="lang === 'ar-SA' ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-xl' : 'text-slate-500 hover:text-slate-700'">
                                العربية
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Step 4: Final Summary -->
            <div *ngIf="currentStep === 4" class="animate-fade-in-right px-4">
                <div class="max-w-md mx-auto bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-[3rem] p-10 border border-slate-200 dark:border-white/10 shadow-2xl space-y-8">
                    <div class="space-y-2">
                        <span class="text-xs font-black uppercase tracking-[0.2em] text-indigo-500">Ready to start?</span>
                        <h3 class="text-3xl font-black text-slate-800 dark:text-white">Session Review</h3>
                    </div>

                    <div class="space-y-4 text-left border-y border-slate-100 dark:border-white/5 py-8">
                        <div class="flex justify-between items-center">
                            <span class="text-slate-400 font-medium">Role</span>
                            <span class="font-bold text-slate-800 dark:text-slate-200">{{ jobTitle }}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-slate-400 font-medium">Mode</span>
                            <span class="font-bold text-slate-800 dark:text-slate-200">{{ type === 'direct' ? 'Direct Questions' : 'Full Interview' }}</span>
                        </div>
                        <div class="flex justify-between items-center">
                             <span class="text-slate-400 font-medium">Difficulty</span>
                            <span class="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-black uppercase">{{ difficulty }}</span>
                        </div>
                         <div class="flex justify-between items-center">
                            <span class="text-slate-400 font-medium">Language</span>
                            <span class="font-bold text-slate-800 dark:text-slate-200">{{ lang === 'ar-SA' ? 'العربية' : 'English' }}</span>
                        </div>
                    </div>

                    <p class="text-sm text-slate-500 italic">"Mimo HR will be waiting for you. Just click start when you are ready to speak."</p>
                </div>
            </div>

        </div>

        <!-- Navigation Controls -->
        <div class="max-w-md mx-auto w-full px-4 pt-10 flex gap-4">
            <button *ngIf="currentStep > 1" 
                    (click)="prevStep()"
                    class="flex-1 py-4 px-6 border-2 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                Back
            </button>
            
            <button *ngIf="currentStep < 4" 
                    (click)="nextStep()"
                    class="flex-[2] py-4 px-8 bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                Continue
            </button>

            <button *ngIf="currentStep === 4" 
                    (click)="start.emit({ type, lang, difficulty, jobTitle })" 
                    [disabled]="loading"
                    class="flex-[2] py-4 px-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all disabled:opacity-70 flex items-center justify-center gap-3">
                <span *ngIf="!loading">Launch Mimo HR</span>
                <span *ngIf="loading" class="animate-spin h-5 w-5 bg-white rounded-full"></span>
            </button>
        </div>
    </div>
  `
})
export class MockInterviewSetupComponent implements OnInit {
    @Input() loading = false;
    @Output() start = new EventEmitter<{
        type: 'direct' | 'flowing',
        lang: 'en-US' | 'ar-SA',
        difficulty: 'junior' | 'mid' | 'senior',
        jobTitle: string
    }>();

    private cvState = inject(CvStateService);

    currentStep = 1;
    jobTitle = '';
    type: 'direct' | 'flowing' = 'direct';
    lang: 'en-US' | 'ar-SA' = 'en-US';
    difficulty: any = 'mid';

    ngOnInit() {
        this.jobTitle = this.cvState.resume().personalInfo?.jobTitle || 'Software Engineer';
    }

    nextStep() {
        if (this.currentStep < 4) this.currentStep++;
    }

    prevStep() {
        if (this.currentStep > 1) this.currentStep--;
    }
}
