
import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UserProfile } from '../models/user-profile.model';

export type EditorMode = 'personal' | 'experience' | 'skills' | 'summary' | 'social';

@Component({
    selector: 'app-profile-editor',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TranslateModule],
    template: `
    <div class="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md transition-opacity" (click)="close.emit()"></div>

        <!-- Modal Content -->
        <div class="relative w-full max-w-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/50 dark:border-white/10 overflow-hidden animate-scale-in flex flex-col max-h-[90vh]">
            <!-- Decorative Glow -->
            <div class="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none"></div>

            <!-- Header -->
            <div class="p-6 sm:p-8 border-b border-slate-200/50 dark:border-white/5 flex justify-between items-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-20">
                <div>
                  <h3 class="text-xl sm:text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight flex items-center gap-3">
                      <div class="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-500/20 flex items-center justify-center">
                          <svg class="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                      </div>
                      {{ title | translate }}
                  </h3>
                  <p class="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-2 ml-11">{{ 'PROFILE.EDITOR.UPDATE_REPOS' | translate }}</p>
                </div>
                <button (click)="close.emit()" class="p-3 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-2xl transition-all focus:ring-2 focus:ring-indigo-500 outline-none">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" stroke-width="2"/></svg>
                </button>
            </div>

            <!-- Form Body -->
            <div class="p-6 sm:p-8 overflow-y-auto custom-scrollbar relative z-10">
                <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-6 sm:space-y-8">
                    
                    <!-- Mode: Personal Info -->
                    <div *ngIf="mode === 'personal'" class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.NAME' | translate }}</label>
                            <input formControlName="fullName" class="w-full px-5 py-3.5 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:border-slate-300 dark:hover:border-slate-600 outline-none transition-all text-sm font-semibold shadow-sm text-slate-800 dark:text-white placeholder:text-slate-400" [placeholder]="'PROFILE.EDITOR.NAME' | translate">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.JOB_TITLE' | translate }}</label>
                            <input formControlName="jobTitle" class="w-full px-5 py-3.5 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:border-slate-300 dark:hover:border-slate-600 outline-none transition-all text-sm font-semibold shadow-sm text-slate-800 dark:text-white placeholder:text-slate-400" [placeholder]="'PROFILE.EDITOR.JOB_TITLE' | translate">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.EMAIL' | translate }}</label>
                            <input formControlName="email" class="w-full px-5 py-3.5 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:border-slate-300 dark:hover:border-slate-600 outline-none transition-all text-sm font-semibold shadow-sm text-slate-800 dark:text-white placeholder:text-slate-400" placeholder="email@example.com">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.LOCATION' | translate }}</label>
                            <input formControlName="location" class="w-full px-5 py-3.5 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:border-slate-300 dark:hover:border-slate-600 outline-none transition-all text-sm font-semibold shadow-sm text-slate-800 dark:text-white placeholder:text-slate-400" [placeholder]="'PROFILE.EDITOR.LOCATION' | translate">
                        </div>
                    </div>

                    <!-- Mode: Experience -->
                    <div *ngIf="mode === 'experience'" class="space-y-6 animate-slide-up">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.ROLE' | translate }}</label>
                                <input formControlName="jobTitle" class="w-full px-5 py-3.5 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:border-slate-300 dark:hover:border-slate-600 outline-none transition-all text-sm font-semibold shadow-sm text-slate-800 dark:text-white placeholder:text-slate-400">
                            </div>
                            <div class="space-y-2">
                                <label class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.COMPANY' | translate }}</label>
                                <input formControlName="company" class="w-full px-5 py-3.5 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:border-slate-300 dark:hover:border-slate-600 outline-none transition-all text-sm font-semibold shadow-sm text-slate-800 dark:text-white placeholder:text-slate-400">
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.START_DATE' | translate }}</label>
                                <input formControlName="startDate" class="w-full px-5 py-3.5 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:border-slate-300 dark:hover:border-slate-600 outline-none transition-all text-sm font-semibold shadow-sm text-slate-800 dark:text-white placeholder:text-slate-400" placeholder="Jan 2020">
                            </div>
                            <div class="space-y-2">
                                <label class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.END_DATE' | translate }}</label>
                                <input formControlName="endDate" class="w-full px-5 py-3.5 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:border-slate-300 dark:hover:border-slate-600 outline-none transition-all text-sm font-semibold shadow-sm text-slate-800 dark:text-white placeholder:text-slate-400" placeholder="Present or Date">
                            </div>
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.EXP_DESC' | translate }}</label>
                            <textarea formControlName="description" rows="5" class="w-full px-5 py-4 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:border-slate-300 dark:hover:border-slate-600 outline-none transition-all text-[13px] leading-relaxed shadow-sm text-slate-800 dark:text-white placeholder:text-slate-400 resize-none custom-scrollbar" [placeholder]="'PROFILE.EDITOR.EXP_DESC_PLACE' | translate"></textarea>
                        </div>
                    </div>

                    <!-- Mode: Skills -->
                    <div *ngIf="mode === 'skills'" class="animate-slide-up">
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.SKILLS_ADD' | translate }}</label>
                            <div class="relative">
                                <input #skillsInput (keyup.enter)="addSkills(skillsInput.value); skillsInput.value = ''" class="w-full pl-5 pr-14 py-4 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:border-slate-300 dark:hover:border-slate-600 outline-none transition-all text-sm font-semibold shadow-sm text-slate-800 dark:text-white placeholder:text-slate-400" [placeholder]="'PROFILE.EDITOR.SKILLS_PLACE' | translate">
                                <button type="button" (click)="addSkills(skillsInput.value); skillsInput.value = ''" class="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 shadow-sm transition-colors">
                                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" stroke-width="2.5"/></svg>
                                </button>
                            </div>
                            <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-3 font-medium flex items-center gap-2">
                                <svg class="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2"/></svg>
                                {{ 'PROFILE.EDITOR.SKILLS_HINT' | translate }}
                            </p>
                        </div>
                    </div>

                    <!-- Mode: Summary / Motto -->
                    <div *ngIf="mode === 'summary'" class="space-y-6 sm:space-y-8 animate-slide-up">
                        <div class="space-y-2 p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/10">
                            <label class="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.MOTTO' | translate }}</label>
                            <input formControlName="motto" class="w-full px-0 py-2 bg-transparent border-none border-b-2 border-indigo-200 dark:border-indigo-500/30 rounded-none focus:ring-0 focus:border-indigo-500 outline-none transition-all text-base sm:text-lg font-bold text-slate-800 dark:text-white placeholder:text-slate-400" [placeholder]="'PROFILE.EDITOR.MOTTO_PLACE' | translate">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.SUMMARY' | translate }}</label>
                            <textarea formControlName="summary" rows="6" class="w-full px-5 py-4 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:border-slate-300 dark:hover:border-slate-600 outline-none transition-all text-[13px] leading-relaxed shadow-sm text-slate-800 dark:text-white placeholder:text-slate-400 resize-none custom-scrollbar"></textarea>
                        </div>
                    </div>

                    <!-- Mode: Social Links -->
                    <div *ngIf="mode === 'social'" class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>{{ 'PROFILE.EDITOR.LINKEDIN' | translate }}</label>
                            <input formControlName="linkedin" class="w-full px-5 py-3.5 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:border-slate-300 dark:hover:border-slate-600 outline-none transition-all text-sm font-semibold shadow-sm text-slate-800 dark:text-white placeholder:text-slate-400">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5"><svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>{{ 'PROFILE.EDITOR.GITHUB' | translate }}</label>
                            <input formControlName="github" class="w-full px-5 py-3.5 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:border-slate-300 dark:hover:border-slate-600 outline-none transition-all text-sm font-semibold shadow-sm text-slate-800 dark:text-white placeholder:text-slate-400">
                        </div>
                        <div class="space-y-2 md:col-span-2">
                            <label class="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5"><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" stroke-width="2"/></svg>{{ 'PROFILE.EDITOR.PORTFOLIO' | translate }}</label>
                            <input formControlName="portfolio" class="w-full px-5 py-3.5 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 hover:border-slate-300 dark:hover:border-slate-600 outline-none transition-all text-sm font-semibold shadow-sm text-slate-800 dark:text-white placeholder:text-slate-400">
                        </div>
                    </div>

                    <!-- Footer Actions -->
                    <div class="flex flex-col sm:flex-row gap-4 pt-6 mt-8 border-t border-slate-100 dark:border-white/5">
                        <button type="button" (click)="close.emit()" class="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all focus:ring-2 focus:ring-slate-300 outline-none">{{ 'PROFILE.EDITOR.CANCEL' | translate }}</button>
                        <button type="submit" class="flex-1 py-4 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/30 active:scale-[0.98] transition-all focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 outline-none flex justify-center items-center gap-2">
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" stroke-width="2.5"/></svg>
                            {{ 'PROFILE.EDITOR.SAVE' | translate }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `
})
export class ProfileEditorComponent implements OnInit {
    @Input() mode: EditorMode = 'personal';
    @Input() data: any = {};
    @Output() save = new EventEmitter<any>();
    @Output() close = new EventEmitter<void>();

    private fb = inject(FormBuilder);
    form: FormGroup = this.fb.group({});

    get title(): string {
        switch (this.mode) {
            case 'personal': return 'PROFILE.EDITOR.TITLE_PERSONAL';
            case 'experience': return this.data.id ? 'PROFILE.EDITOR.TITLE_EXP_EDIT' : 'PROFILE.EDITOR.TITLE_EXP_NEW';
            case 'skills': return 'PROFILE.EDITOR.TITLE_SKILLS';
            case 'summary': return 'PROFILE.EDITOR.TITLE_SUMMARY';
            case 'social': return 'PROFILE.EDITOR.TITLE_SOCIAL';
            default: return 'Profile Editor';
        }
    }

    ngOnInit() {
        this.initForm();
    }

    private initForm() {
        if (this.mode === 'personal') {
            this.form = this.fb.group({
                fullName: [this.data.personalInfo?.fullName || '', Validators.required],
                jobTitle: [this.data.personalInfo?.jobTitle || '', Validators.required],
                email: [this.data.personalInfo?.email || '', [Validators.required, Validators.email]],
                location: [this.data.personalInfo?.location || '']
            });
        } else if (this.mode === 'experience') {
            this.form = this.fb.group({
                jobTitle: [this.data.jobTitle || '', Validators.required],
                company: [this.data.company || '', Validators.required],
                startDate: [this.data.startDate || '', Validators.required],
                endDate: [this.data.endDate || ''],
                description: [this.data.description || '']
            });
        } else if (this.mode === 'summary') {
            this.form = this.fb.group({
                motto: [this.data.professionalMotto || ''],
                summary: [this.data.summary || '']
            });
        } else if (this.mode === 'social') {
            this.form = this.fb.group({
                linkedin: [this.data.socialLinks?.linkedin || ''],
                github: [this.data.socialLinks?.github || ''],
                portfolio: [this.data.socialLinks?.portfolio || '']
            });
        }
    }

    addSkills(val: string) {
        if (!val.trim()) return;
        const skills = val.split(',').map(s => s.trim()).filter(s => s);
        this.save.emit({ skills });
        this.close.emit();
    }

    submit() {
        if (this.form.valid) {
            this.save.emit(this.form.value);
            this.close.emit();
        }
    }
}
