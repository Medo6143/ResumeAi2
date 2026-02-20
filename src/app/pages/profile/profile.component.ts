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
            <!-- Animated Gradient Orbs -->
            <div class="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/20 dark:bg-indigo-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob"></div>
            <div class="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 dark:bg-purple-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000"></div>
            <div class="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-blue-500/20 dark:bg-blue-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000"></div>
            
            <!-- Grid overlay for texture -->
            <div class="absolute inset-0 bg-[url('/assets/grid.svg')] bg-center opacity-[0.03] dark:opacity-[0.05]"></div>
        </div>

        <div class="relative z-10 container mx-auto px-4 pt-8 md:pt-16 max-w-6xl">
            <!-- Hero -->
            <app-profile-hero [profile]="profile()" (edit)="openEditor('personal')" (editSocial)="openEditor('social', { socialLinks: profile().socialLinks })"></app-profile-hero>

            <!-- Stats & Quick Actions -->
            <div class="mt-8 md:mt-12">
                <app-profile-stats 
                    [strength]="strength()" 
                    [expCount]="profile().masterExperience.length"
                    [skillCount]="profile().masterSkills.length">
                </app-profile-stats>
            </div>

            <!-- Dashboard Content -->
            <div class="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Left Column: Master List Preview -->
                <div class="lg:col-span-2 space-y-8">
                    <!-- Glass Panel for Experience -->
                    <div class="relative bg-white/70 dark:bg-slate-900/50 backdrop-blur-2xl rounded-[2rem] p-8 md:p-10 border border-white/50 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden group/panel">
                        <!-- Decorative glow inside panel -->
                        <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl transition-opacity duration-500 opacity-0 group-hover/panel:opacity-100"></div>

                        <div class="relative z-10">
                            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center border border-indigo-100 dark:border-indigo-500/20">
                                        <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-width="2"/></svg>
                                    </div>
                                    <h3 class="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tight">{{ 'PROFILE.DASHBOARD.MASTER_EXP' | translate }} <span class="text-indigo-500 dark:text-indigo-400 font-black ml-2 text-sm px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-500/10">{{ profile().masterExperience.length }}</span></h3>
                                </div>
                                <button (click)="openEditor('experience')" class="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg shadow-slate-900/20 dark:shadow-white/20 text-xs font-bold hover:-translate-y-0.5 active:translate-y-0 transition-all focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900">{{ 'PROFILE.DASHBOARD.ADD_ENTRY' | translate }}</button>
                            </div>

                            <div *ngIf="profile().masterExperience.length === 0" class="py-16 text-center flex flex-col items-center justify-center relative">
                                <!-- Dashed outlined box for empty state -->
                                <div class="absolute inset-0 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl pointer-events-none"></div>
                                <div class="w-20 h-20 bg-slate-50 dark:bg-slate-800/50 backdrop-blur-md rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-white/50 dark:border-white/5 relative group-hover/panel:scale-110 transition-transform duration-500">
                                    <div class="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-hover/panel:opacity-100 transition-opacity duration-500"></div>
                                    <svg class="w-8 h-8 text-slate-400 dark:text-slate-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" stroke-width="2"/></svg>
                                </div>
                                <p class="text-sm text-slate-500 dark:text-slate-400 font-medium">{{ 'PROFILE.DASHBOARD.NO_ENTRIES' | translate }}</p>
                                <p class="text-xs text-slate-400 dark:text-slate-500 mt-2 max-w-xs">{{ 'PROFILE.DASHBOARD.NO_ENTRIES_HINT' | translate }}</p>
                            </div>

                            <div class="space-y-4">
                                <div *ngFor="let exp of profile().masterExperience; let i = index" 
                                     class="group relative p-6 md:p-8 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/60 dark:border-white/5 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                                     <!-- Hover gradient edge -->
                                     <div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
                                     
                                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                                        <div class="flex flex-col">
                                            <h4 class="text-lg font-black text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{{ exp.jobTitle }}</h4>
                                            <div class="flex items-center gap-2 mt-1">
                                                <svg class="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke-width="2"/></svg>
                                                <p class="text-sm font-bold text-slate-600 dark:text-slate-300">{{ exp.company }}</p>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                                            <span class="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest border border-slate-200 dark:border-slate-700">{{ exp.startDate }} - {{ exp.endDate || 'Present' }}</span>
                                            <div class="flex items-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity gap-1">
                                                <button (click)="openEditor('experience', exp)" class="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-xl transition-all" title="Edit">
                                                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke-width="2"/></svg>
                                                </button>
                                                <button (click)="deleteExperience(exp.id)" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all" title="Delete">
                                                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2"/></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 relative z-10">{{ exp.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Sidebar -->
                <div class="space-y-8">
                    <!-- Professional Branding -->
                    <div class="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-[2rem] p-8 text-white shadow-2xl shadow-indigo-500/20 overflow-hidden group">
                        <!-- BG elements -->
                        <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                        <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"></div>
                        <div class="absolute inset-0 bg-[url('/assets/noise.png')] opacity-20 mix-blend-overlay"></div>

                        <div class="relative z-10">
                            <div class="flex justify-between items-center mb-6">
                                <h4 class="text-xs font-black text-indigo-200 uppercase tracking-widest">{{ 'PROFILE.DASHBOARD.MASTER_SUMMARY' | translate }}</h4>
                                <button (click)="openEditor('summary')" class="p-2 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-md transition-all border border-white/5 opacity-100 sm:opacity-0 group-hover:opacity-100">
                                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" stroke-width="2"/></svg>
                                </button>
                            </div>
                            
                            <div class="relative">
                                <svg class="absolute -left-2 -top-4 w-10 h-10 text-white/10 transform -scale-x-100" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                                <p class="text-[15px] font-medium leading-relaxed text-white/90 indent-6">
                                    {{ profile().summary || ('PROFILE.HERO.MOTTO_DEFAULT' | translate) }}
                                </p>
                                <button class="mt-8 w-full py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl text-xs font-black uppercase tracking-widest border border-white/10 transition-all flex items-center justify-center gap-2 group/btn">
                                    <svg class="w-4 h-4 text-white group-hover/btn:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" stroke-width="2"/></svg>
                                    {{ 'PROFILE.DASHBOARD.ENABLE_AI' | translate }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Skills Cloud -->
                    <div class="relative bg-white/70 dark:bg-slate-900/50 backdrop-blur-2xl rounded-[2rem] p-8 border border-white/50 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] group/skills">
                        <div class="flex justify-between items-center mb-6">
                            <h4 class="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{{ 'PROFILE.DASHBOARD.MASTER_SKILLS' | translate }}</h4>
                            <button (click)="openEditor('skills')" class="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl transition-all opacity-100 sm:opacity-0 group-hover/skills:opacity-100">
                                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" stroke-width="2"/></svg>
                            </button>
                        </div>
                        
                        <div class="flex flex-wrap gap-2.5">
                             <div *ngFor="let skill of profile().masterSkills" 
                                class="px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-500 hover:-translate-y-0.5 transition-all cursor-default flex items-center gap-1.5 group/skill">
                                <div class="w-1.5 h-1.5 rounded-full bg-indigo-500/50 group-hover/skill:bg-indigo-500 transition-colors"></div>
                                {{ skill }}
                             </div>
                             <div *ngIf="profile().masterSkills.length === 0" class="w-full py-8 text-center text-sm text-slate-400 dark:text-slate-500 font-medium">
                                {{ 'PROFILE.DASHBOARD.NO_SKILLS' | translate }}
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Editor Modal -->
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
            case 'skills':
                this.profileStateService.updateSkills(data.skills);
                break;
            case 'summary':
                this.profileStateService.updateSummary(data.summary);
                this.profileStateService.updateMotto(data.motto);
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
}
