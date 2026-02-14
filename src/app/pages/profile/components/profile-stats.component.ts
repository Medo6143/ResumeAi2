import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-profile-stats',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    template: `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Profile Strength -->
        <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-xl relative overflow-hidden group">
             <div class="relative z-10">
                <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">{{ 'PROFILE.STATS.STRENGTH' | translate }}</h4>
                <div class="flex items-end gap-4 mb-4">
                    <span class="text-6xl font-black text-slate-900 dark:text-white transition-all duration-1000 group-hover:text-indigo-500">{{ strength }}%</span>
                    <div class="mb-2 px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">{{ 'PROFILE.STATS.EXCELLENT' | translate }}</div>
                </div>
                <div class="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000" [style.width.%]="strength"></div>
                </div>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-6 leading-relaxed">
                    {{ 'PROFILE.STATS.STRENGTH_DESC' | translate }} <span class="font-bold text-slate-900 dark:text-indigo-400">{{ 'PROFILE.STATS.STRENGTH_HIGHLIGHT' | translate }}</span>.
                </p>
             </div>
             <!-- Background Shape -->
             <div class="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all"></div>
        </div>

        <!-- Data Points Card -->
        <div class="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700 shadow-xl relative overflow-hidden group">
            <h4 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">{{ 'PROFILE.STATS.REPO_SIZE' | translate }}</h4>
            <div class="space-y-6">
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                             <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-width="2"/></svg>
                        </div>
                        <span class="text-sm font-bold text-slate-700 dark:text-slate-200">{{ 'PROFILE.STATS.EXP_COUNT' | translate }}</span>
                    </div>
                    <span class="text-xl font-black text-slate-400">{{ expCount }}</span>
                </div>
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600">
                             <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-width="2"/></svg>
                        </div>
                        <span class="text-sm font-bold text-slate-700 dark:text-slate-200">{{ 'PROFILE.STATS.SKILL_COUNT' | translate }}</span>
                    </div>
                    <span class="text-xl font-black text-slate-400">{{ skillCount }}</span>
                </div>
            </div>
            <button class="w-full mt-8 py-3 bg-slate-50 dark:bg-slate-900 text-[10px] font-black uppercase tracking-widest text-slate-500 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all border border-transparent hover:border-indigo-200">{{ 'PROFILE.STATS.SYNC_DATA' | translate }}</button>
        </div>

        <!-- AI Persona Card -->
        <div class="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
            <h4 class="text-xs font-black text-white/40 uppercase tracking-widest mb-6">{{ 'PROFILE.STATS.AI_BLUEPRINT' | translate }}</h4>
            <div class="relative z-10">
                <div class="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20 group-hover:rotate-12 transition-transform">
                    <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" stroke-width="2"/></svg>
                </div>
                <h3 class="text-xl font-black mb-2 italic">Senior Architect</h3>
                <p class="text-xs text-white/70 leading-relaxed">
                    {{ 'PROFILE.STATS.PERSONA_LABEL' | translate }}: Technical Visionary.
                </p>
                <button class="mt-8 text-[11px] font-black flex items-center gap-2 group-hover:translate-x-2 transition-transform cursor-pointer">
                    {{ 'PROFILE.STATS.VIEW_MAP' | translate }} <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3" stroke-width="2"/></svg>
                </button>
            </div>
            <!-- Animated Radial -->
             <div class="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        </div>
    </div>
    `
})
export class ProfileStatsComponent {
    @Input() strength: number = 0;
    @Input() expCount: number = 0;
    @Input() skillCount: number = 0;
}
