import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileStateService } from './services/profile-state.service';
import { ProfileHeroComponent } from './components/profile-hero.component';
import { ProfileStatsComponent } from './components/profile-stats.component';
import { ProfileEditorComponent, EditorMode } from './components/profile-editor.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, ProfileHeroComponent, ProfileStatsComponent, ProfileEditorComponent, TranslateModule],
    template: `
    <section class="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500 pb-20 font-sans">
        <!-- Abstract Background -->
        <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div class="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/20 dark:bg-indigo-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob"></div>
            <div class="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 dark:bg-purple-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000"></div>
            <div class="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-blue-500/20 dark:bg-blue-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000"></div>
            <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style="background-image: url('/assets/grid.svg'); background-position: center;"></div>
        </div>

        <div class="relative z-10 container mx-auto px-4 pt-8 md:pt-16 max-w-6xl">
            <!-- Hero -->
            <app-profile-hero [profile]="profile()" (edit)="openEditor('personal')" (editSocial)="openEditor('social', { socialLinks: profile().socialLinks })"></app-profile-hero>

            <!-- Stats & Quick Actions -->
            <div class="mt-8 md:mt-12">
                <app-profile-stats 
                    [strength]="strength()" 
                    [expCount]="profile().masterExperience.length || 0"
                    [skillCount]="profile().masterSkills.length || 0"
                    (sync)="syncProfile()"
                    (editPersona)="openEditor('summary')">
                </app-profile-stats>
            </div>

            <!-- Dashboard Content -->
            <div class="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Main Column -->
                <div class="lg:col-span-2 space-y-8">
                    <!-- Master Experience -->
                    <div class="relative bg-white/70 dark:bg-slate-900/50 backdrop-blur-2xl rounded-[2rem] p-8 md:p-10 border border-white/50 dark:border-white/10 shadow-sm overflow-hidden group/panel">
                        <div class="flex justify-between items-center mb-8">
                            <h3 class="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tight">{{ 'PROFILE.DASHBOARD.MASTER_EXP' | translate }}</h3>
                            <button (click)="openEditor('experience')" class="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg text-xs font-bold hover:-translate-y-0.5 transition-all">{{ 'PROFILE.DASHBOARD.ADD_ENTRY' | translate }}</button>
                        </div>
                        <div class="space-y-4">
                            <div *ngFor="let exp of profile().masterExperience" class="p-6 bg-white/60 dark:bg-slate-900/40 rounded-2xl border border-white/60 dark:border-white/5 hover:shadow-xl transition-all">
                                <div class="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 class="text-lg font-black text-slate-800 dark:text-slate-100">{{ exp.jobTitle }}</h4>
                                        <p class="text-sm font-bold text-slate-600 dark:text-slate-300">{{ exp.company }}</p>
                                    </div>
                                    <div class="flex gap-2">
                                        <button (click)="openEditor('experience', exp)" class="p-2 text-slate-400 hover:text-indigo-600"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke-width="2"/></svg></button>
                                        <button (click)="deleteExperience(exp.id)" class="p-2 text-slate-400 hover:text-red-500"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2"/></svg></button>
                                    </div>
                                </div>
                                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{{ exp.description }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Projects -->
                    <div class="relative bg-white/70 dark:bg-slate-900/50 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/50 dark:border-white/10 shadow-sm overflow-hidden">
                        <div class="flex justify-between items-center mb-8">
                            <h3 class="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tight">{{ 'PROFILE.DASHBOARD.MASTER_PROJECTS' | translate }}</h3>
                            <button (click)="openEditor('projects')" class="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg text-xs font-bold hover:-translate-y-0.5 transition-all">{{ 'PROFILE.DASHBOARD.ADD_PROJECT' | translate }}</button>
                        </div>
                        <div class="space-y-4">
                            <div *ngFor="let proj of profile().masterProjects" class="p-6 bg-white/60 dark:bg-slate-900/40 rounded-2xl border border-white/60 dark:border-white/5 hover:shadow-xl transition-all">
                                <div class="flex justify-between items-start mb-3">
                                    <h4 class="text-lg font-black text-slate-800 dark:text-slate-100">{{ proj.name }}</h4>
                                    <div class="flex gap-2">
                                        <button (click)="openEditor('projects', proj)" class="p-2 text-slate-400 hover:text-indigo-600"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke-width="2"/></svg></button>
                                        <button (click)="deleteProject(proj.id)" class="p-2 text-slate-400 hover:text-red-500"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2"/></svg></button>
                                    </div>
                                </div>
                                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{{ proj.description }}</p>
                                <!-- Project Links -->
                                <div class="flex flex-wrap gap-3">
                                    <a *ngIf="proj.githubLink" [href]="proj.githubLink" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 dark:bg-slate-700 text-white text-[11px] font-bold rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-all shadow-sm">
                                        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                        GitHub
                                    </a>
                                    <a *ngIf="proj.demoLink" [href]="proj.demoLink" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-[11px] font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-sm">
                                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                                        Live Demo
                                    </a>
                                    <a *ngIf="proj.link && !proj.githubLink && !proj.demoLink" [href]="proj.link" target="_blank" class="text-xs text-indigo-600 font-bold hover:underline">{{ proj.link }}</a>
                                </div>
                            </div>
                            <div *ngIf="(profile().masterProjects.length || 0) === 0" class="py-12 text-center text-slate-500 text-sm italic">{{ 'PROFILE.DASHBOARD.NO_ENTRIES' | translate }}</div>
                        </div>
                    </div>

                    <!-- Certifications -->
                    <div class="relative bg-white/70 dark:bg-slate-900/50 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/50 dark:border-white/10 shadow-sm overflow-hidden">
                        <div class="flex justify-between items-center mb-8">
                            <h3 class="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tight">{{ 'PROFILE.DASHBOARD.MASTER_CERTIFICATIONS' | translate }}</h3>
                            <button (click)="openEditor('certifications')" class="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg text-xs font-bold hover:-translate-y-0.5 transition-all">{{ 'PROFILE.DASHBOARD.ADD_CERT' | translate }}</button>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div *ngFor="let cert of profile().masterCertifications" class="p-6 bg-white/60 dark:bg-slate-900/40 rounded-2xl border border-white/60 dark:border-white/5 hover:shadow-xl transition-all">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <h4 class="text-sm font-black text-slate-800 dark:text-slate-100">{{ cert.name }}</h4>
                                        <p class="text-xs font-bold text-slate-500 dark:text-slate-400">{{ cert.issuer }}</p>
                                        <span class="text-[10px] text-indigo-500 font-black mt-2 inline-block">{{ cert.date }}</span>
                                    </div>
                                    <div class="flex gap-2">
                                        <button (click)="openEditor('certifications', cert)" class="p-2 text-slate-400 hover:text-indigo-600"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke-width="2"/></svg></button>
                                        <button (click)="deleteCertification(cert.id)" class="p-2 text-slate-400 hover:text-red-500"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2"/></svg></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div *ngIf="(profile().masterCertifications.length || 0) === 0" class="py-12 text-center text-slate-500 text-sm italic">{{ 'PROFILE.DASHBOARD.NO_ENTRIES' | translate }}</div>
                    </div>

                    <!-- Custom Sections -->
                    <div class="relative bg-white/70 dark:bg-slate-900/50 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/50 dark:border-white/10 shadow-sm overflow-hidden">
                        <div class="flex justify-between items-center mb-8">
                            <h3 class="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tight">{{ 'PROFILE.DASHBOARD.MASTER_CUSTOM' | translate }}</h3>
                            <button (click)="openEditor('custom')" class="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg text-xs font-bold hover:-translate-y-0.5 transition-all">{{ 'PROFILE.DASHBOARD.ADD_CUSTOM' | translate }}</button>
                        </div>
                        <div class="space-y-4">
                            <div *ngFor="let sec of profile().masterCustomSections" class="p-6 bg-white/60 dark:bg-slate-900/40 rounded-2xl border border-white/60 dark:border-white/5 hover:shadow-xl transition-all">
                                <div class="flex justify-between items-start mb-4">
                                    <h4 class="text-lg font-black text-slate-800 dark:text-slate-100">{{ sec.title }}</h4>
                                    <div class="flex gap-2">
                                        <button (click)="openEditor('custom', sec)" class="p-2 text-slate-400 hover:text-indigo-600"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke-width="2"/></svg></button>
                                        <button (click)="deleteCustomSection(sec.id)" class="p-2 text-slate-400 hover:text-red-500"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2"/></svg></button>
                                    </div>
                                </div>
                                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">{{ sec.description }}</p>
                            </div>
                        </div>
                        <div *ngIf="(profile().masterCustomSections.length || 0) === 0" class="py-12 text-center text-slate-500 text-sm italic">{{ 'PROFILE.DASHBOARD.NO_ENTRIES' | translate }}</div>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="space-y-8">
                    <!-- Summary Card -->
                    <div class="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-[2rem] p-8 text-white shadow-2xl overflow-hidden group">
                        <div class="relative z-10">
                            <div class="flex justify-between items-center mb-6">
                                <h4 class="text-xs font-black text-indigo-200 uppercase tracking-widest">{{ 'PROFILE.DASHBOARD.MASTER_SUMMARY' | translate }}</h4>
                                <button (click)="openEditor('summary')" class="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/5"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" stroke-width="2"/></svg></button>
                            </div>
                            <p class="text-[15px] font-medium leading-relaxed text-white/90">
                                {{ profile().summary || (profile().professionalMotto || ('PROFILE.HERO.MOTTO_DEFAULT' | translate)) }}
                            </p>
                            <button (click)="openEditor('summary')" class="mt-8 w-full py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl text-xs font-black uppercase tracking-widest border border-white/10 transition-all flex items-center justify-center gap-2 group/btn">
                                <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" stroke-width="2"/></svg>
                                {{ 'PROFILE.EDITOR.AI_ASSIST' | translate }}
                            </button>
                        </div>
                    </div>

                    <!-- Skills -->
                    <div class="relative bg-white/70 dark:bg-slate-900/50 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/50 dark:border-white/10 shadow-sm">
                        <div class="flex justify-between items-center mb-6">
                            <h4 class="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{{ 'PROFILE.DASHBOARD.MASTER_SKILLS' | translate }}</h4>
                            <button (click)="openEditor('skills')" class="p-2 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 rounded-xl transition-all"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4v16m8-8H4" stroke-width="2"/></svg></button>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <div *ngFor="let skill of profile().masterSkills" class="px-3 py-1 bg-white dark:bg-slate-800 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">{{ skill }}</div>
                            <div *ngIf="(profile().masterSkills.length || 0) === 0" class="w-full py-4 text-center text-sm text-slate-400 italic">
                                {{ 'PROFILE.DASHBOARD.NO_SKILLS' | translate }}
                            </div>
                        </div>
                    </div>

                    <!-- Languages -->
                    <div class="relative bg-white/70 dark:bg-slate-900/50 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/50 dark:border-white/10 shadow-sm">
                        <div class="flex justify-between items-center mb-6">
                            <h4 class="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{{ 'PROFILE.DASHBOARD.MASTER_LANGUAGES' | translate }}</h4>
                            <button (click)="openEditor('languages')" class="p-2 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-indigo-600 rounded-xl transition-all"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke-width="2"/></svg></button>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <div *ngFor="let lang of profile().masterLanguages" class="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-xs font-bold text-indigo-600 dark:text-indigo-400 rounded-lg border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
                                {{ lang }}
                            </div>
                            <div *ngIf="(profile().masterLanguages.length || 0) === 0" class="w-full py-4 text-center text-sm text-slate-400 italic">
                                {{ 'PROFILE.DASHBOARD.NO_SKILLS' | translate }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <app-profile-editor 
            *ngIf="showEditor()" 
            [mode]="editorMode()" 
            [data]="editorData()" 
            (save)="onSave($event)" 
            (close)="showEditor.set(false)">
        </app-profile-editor>
    </section>
    `
})
export class ProfileComponent {
    private profileStateService = inject(ProfileStateService);
    private translate = inject(TranslateService);

    profile = this.profileStateService.profile;
    strength = this.profileStateService.strengthScore;

    showEditor = signal(false);
    editorMode = signal<EditorMode>('personal');
    editorData = signal<any>({});

    syncProfile() {
        this.profileStateService.sync();
    }

    openEditor(mode: EditorMode, data: any = {}) {
        this.editorMode.set(mode);
        this.editorData.set(data);
        this.showEditor.set(true);
    }

    onSave(data: any) {
        switch (this.editorMode()) {
            case 'personal':
                this.profileStateService.updatePersonalInfo(data);
                break;
            case 'experience':
                if (this.editorData().id) {
                    this.profileStateService.updateExperience(this.editorData().id, data);
                } else {
                    this.profileStateService.addExperience({ ...data, id: Date.now().toString() });
                }
                break;
            case 'projects':
                if (this.editorData().id) {
                    this.profileStateService.updateProject(this.editorData().id, data);
                } else {
                    this.profileStateService.addProject({ ...data, id: Date.now().toString() });
                }
                break;
            case 'certifications':
                if (this.editorData().id) {
                    this.profileStateService.updateCertification(this.editorData().id, data);
                } else {
                    this.profileStateService.addCertification({ ...data, id: Date.now().toString() });
                }
                break;
            case 'custom':
                if (this.editorData().id) {
                    this.profileStateService.updateCustomSection(this.editorData().id, data);
                } else {
                    this.profileStateService.addCustomSection({ ...data, id: Date.now().toString() });
                }
                break;
            case 'skills':
                this.profileStateService.updateSkills(data.skills);
                break;
            case 'languages':
                this.profileStateService.updateLanguages(data.languages);
                break;
            case 'summary':
                this.profileStateService.updateSummary(data.summary);
                this.profileStateService.updateMotto(data.professionalMotto);
                break;
            case 'social':
                this.profileStateService.updateSocialLinks(data);
                break;
        }
        this.showEditor.set(false);
    }

    async deleteExperience(id: string) {
        const confirmed = await firstValueFrom(this.translate.get('PROFILE.DASHBOARD.DELETE_CONFIRM'));
        if (confirm(confirmed)) {
            this.profileStateService.deleteExperience(id);
        }
    }

    async deleteProject(id: string) {
        const confirmed = await firstValueFrom(this.translate.get('PROFILE.DASHBOARD.DELETE_CONFIRM'));
        if (confirm(confirmed)) {
            this.profileStateService.deleteProject(id);
        }
    }

    async deleteCertification(id: string) {
        const confirmed = await firstValueFrom(this.translate.get('PROFILE.DASHBOARD.DELETE_CONFIRM'));
        if (confirm(confirmed)) {
            this.profileStateService.deleteCertification(id);
        }
    }

    async deleteCustomSection(id: string) {
        const confirmed = await firstValueFrom(this.translate.get('PROFILE.DASHBOARD.DELETE_CONFIRM'));
        if (confirm(confirmed)) {
            this.profileStateService.deleteCustomSection(id);
        }
    }
}
