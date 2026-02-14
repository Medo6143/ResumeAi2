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
    <section class="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-[#0A0C14] transition-colors duration-500 pb-20">
        <!-- Abstract Background -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px]"></div>
            <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px]"></div>
        </div>

        <div class="relative z-10 container mx-auto px-4 pt-24 max-w-6xl">
            <!-- Hero -->
            <app-profile-hero [profile]="profile()" (edit)="openEditor('personal')" (editSocial)="openEditor('social', { socialLinks: profile().socialLinks })"></app-profile-hero>

            <!-- Stats & Quick Actions -->
            <div class="mt-12">
                <app-profile-stats 
                    [strength]="strength()" 
                    [expCount]="profile().masterExperience.length"
                    [skillCount]="profile().masterSkills.length">
                </app-profile-stats>
            </div>

            <!-- Dashboard Content -->
            <div class="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Left Column: Master List Preview -->
                <div class="lg:col-span-2 space-y-8">
                    <div class="bg-white dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-100 dark:border-white/5 shadow-xl">
                        <div class="flex justify-between items-center mb-8">
                            <h3 class="text-xl font-black text-slate-800 dark:text-white">{{ 'PROFILE.DASHBOARD.MASTER_EXP' | translate }} <span class="text-slate-400 font-bold ml-2 text-sm">{{ profile().masterExperience.length }}</span></h3>
                            <button (click)="openEditor('experience')" class="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all">{{ 'PROFILE.DASHBOARD.ADD_ENTRY' | translate }}</button>
                        </div>

                        <div *ngIf="profile().masterExperience.length === 0" class="py-12 text-center">
                            <div class="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100 dark:border-slate-800">
                                <svg class="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-width="2"/></svg>
                            </div>
                            <p class="text-sm text-slate-500 font-medium italic">{{ 'PROFILE.DASHBOARD.NO_ENTRIES' | translate }}</p>
                        </div>

                        <div class="space-y-6">
                            <div *ngFor="let exp of profile().masterExperience" class="group relative p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:border-indigo-500/30 transition-all">
                                <div class="flex justify-between items-start mb-2">
                                    <div class="flex flex-col">
                                        <h4 class="font-black text-slate-800 dark:text-slate-200">{{ exp.jobTitle }}</h4>
                                        <p class="text-xs font-bold text-indigo-500/80">{{ exp.company }}</p>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ exp.startDate }} - {{ exp.endDate || 'Present' }}</span>
                                        <button (click)="deleteExperience(exp.id)" class="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all">
                                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke-width="2"/></svg>
                                        </button>
                                    </div>
                                </div>
                                <p class="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{{ exp.description }}</p>
                                <button (click)="openEditor('experience', exp)" class="mt-4 text-[10px] font-black text-slate-400 group-hover:text-indigo-500 transition-colors uppercase tracking-widest">{{ 'PROFILE.DASHBOARD.EDIT_HISTORICAL' | translate }}</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Sidebar -->
                <div class="space-y-8">
                    <!-- Professional Branding -->
                    <div class="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/20 relative group">
                        <button (click)="openEditor('summary')" class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                             <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" stroke-width="2"/></svg>
                         </button>
                         <h4 class="text-xs font-black text-white/40 uppercase tracking-widest mb-6">{{ 'PROFILE.DASHBOARD.MASTER_SUMMARY' | translate }}</h4>
                         <div class="relative">
                            <div class="absolute -left-3 -top-3 text-4xl text-white/10 font-black">"</div>
                            <p class="text-sm font-bold leading-relaxed italic pr-4">
                                {{ profile().summary || ('PROFILE.HERO.MOTTO_DEFAULT' | translate) }}
                            </p>
                            <button class="mt-6 w-full py-3 bg-white/10 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/20 hover:bg-white/20 transition-all">{{ 'PROFILE.DASHBOARD.ENABLE_AI' | translate }}</button>
                         </div>
                    </div>

                    <!-- Skills Cloud -->
                    <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-xl">
                        <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">{{ 'PROFILE.DASHBOARD.MASTER_SKILLS' | translate }}</h4>
                        <div class="flex flex-wrap gap-2">
                             <div *ngFor="let skill of profile().masterSkills" 
                                class="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700 hover:border-indigo-500 transition-all cursor-default">
                                {{ skill }}
                             </div>
                             <div *ngIf="profile().masterSkills.length === 0" class="text-xs text-slate-400 italic">{{ 'PROFILE.DASHBOARD.NO_SKILLS' | translate }}</div>
                        </div>
                        <button (click)="openEditor('skills')" class="w-full mt-8 py-3 bg-slate-100 dark:bg-slate-900/50 text-indigo-500 text-[10px] font-black uppercase tracking-widest rounded-2xl border border-transparent hover:border-indigo-500/30 transition-all italic">{{ 'PROFILE.DASHBOARD.ADD_PROFICIENCY' | translate }}</button>
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
