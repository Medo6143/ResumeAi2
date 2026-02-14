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
    <div class="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" (click)="close.emit()"></div>

        <!-- Modal Content -->
        <div class="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden animate-scale-in">
            <!-- Header -->
            <div class="p-8 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                <div>
                  <h3 class="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">{{ title | translate }}</h3>
                  <p class="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{{ 'PROFILE.EDITOR.UPDATE_REPOS' | translate }}</p>
                </div>
                <button (click)="close.emit()" class="p-3 hover:bg-slate-100 dark:hover:bg-white/5 rounded-2xl transition-all">
                    <svg class="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M6 18L18 6M6 6l12 12" stroke-width="2.5"/></svg>
                </button>
            </div>

            <!-- Form Body -->
            <div class="p-8 max-h-[70vh] overflow-y-auto">
                <form [formGroup]="form" (ngSubmit)="submit()" class="space-y-6">
                    
                    <!-- Mode: Personal Info -->
                    <div *ngIf="mode === 'personal'" class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.NAME' | translate }}</label>
                            <input formControlName="fullName" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-bold" [placeholder]="'PROFILE.EDITOR.NAME' | translate">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.JOB_TITLE' | translate }}</label>
                            <input formControlName="jobTitle" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-bold" [placeholder]="'PROFILE.EDITOR.JOB_TITLE' | translate">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.EMAIL' | translate }}</label>
                            <input formControlName="email" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-bold" placeholder="email@example.com">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.LOCATION' | translate }}</label>
                            <input formControlName="location" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-bold" [placeholder]="'PROFILE.EDITOR.LOCATION' | translate">
                        </div>
                    </div>

                    <!-- Mode: Experience -->
                    <div *ngIf="mode === 'experience'" class="space-y-6 animate-slide-up">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.ROLE' | translate }}</label>
                                <input formControlName="jobTitle" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-bold">
                            </div>
                            <div class="space-y-2">
                                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.COMPANY' | translate }}</label>
                                <input formControlName="company" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-bold">
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.START_DATE' | translate }}</label>
                                <input formControlName="startDate" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-bold" placeholder="Jan 2020">
                            </div>
                            <div class="space-y-2">
                                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.END_DATE' | translate }}</label>
                                <input formControlName="endDate" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-bold" placeholder="Present or Date">
                            </div>
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.EXP_DESC' | translate }}</label>
                            <textarea formControlName="description" rows="5" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-xs leading-relaxed" [placeholder]="'PROFILE.EDITOR.EXP_DESC_PLACE' | translate"></textarea>
                        </div>
                    </div>

                    <!-- Mode: Skills -->
                    <div *ngIf="mode === 'skills'" class="animate-slide-up">
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.SKILLS_ADD' | translate }}</label>
                            <input #skillsInput (keyup.enter)="addSkills(skillsInput.value); skillsInput.value = ''" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-bold" [placeholder]="'PROFILE.EDITOR.SKILLS_PLACE' | translate">
                            <p class="text-[10px] text-slate-400 mt-2 italic px-1">{{ 'PROFILE.EDITOR.SKILLS_HINT' | translate }}</p>
                        </div>
                    </div>

                    <!-- Mode: Summary / Motto -->
                    <div *ngIf="mode === 'summary'" class="space-y-6 animate-slide-up">
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.MOTTO' | translate }}</label>
                            <input formControlName="motto" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-bold italic" [placeholder]="'PROFILE.EDITOR.MOTTO_PLACE' | translate">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.SUMMARY' | translate }}</label>
                            <textarea formControlName="summary" rows="6" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-xs leading-relaxed"></textarea>
                        </div>
                    </div>

                    <!-- Mode: Social Links -->
                    <div *ngIf="mode === 'social'" class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.LINKEDIN' | translate }}</label>
                            <input formControlName="linkedin" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-bold">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.GITHUB' | translate }}</label>
                            <input formControlName="github" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-bold">
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{{ 'PROFILE.EDITOR.PORTFOLIO' | translate }}</label>
                            <input formControlName="portfolio" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-bold">
                        </div>
                    </div>

                    <!-- Footer Actions -->
                    <div class="flex gap-4 pt-6">
                        <button type="button" (click)="close.emit()" class="flex-1 py-4 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all">{{ 'PROFILE.EDITOR.CANCEL' | translate }}</button>
                        <button type="submit" class="flex-1 py-4 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 active:scale-95 transition-all">{{ 'PROFILE.EDITOR.SAVE' | translate }}</button>
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
