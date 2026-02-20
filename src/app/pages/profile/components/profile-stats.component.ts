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
        <div class="relative bg-white/70 dark:bg-slate-900/50 backdrop-blur-2xl rounded-[2rem] p-8 md:p-10 border border-white/50 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden group/strength transform transition-transform duration-500 hover:-translate-y-1">
             <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover/strength:opacity-100 transition-opacity duration-500"></div>
             <!-- Background Shape -->
             <div class="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[60px] group-hover/strength:bg-indigo-500/20 group-hover/strength:scale-110 transition-all duration-700"></div>
             
             <div class="relative z-10">
                <div class="flex justify-between items-start mb-6">
                    <h4 class="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{{ 'PROFILE.STATS.STRENGTH' | translate }}</h4>
                    <svg class="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2"/></svg>
                </div>
                
                <div class="flex flex-col mb-8">
                    <div class="flex items-end gap-3">
                        <span class="text-6xl md:text-7xl font-black text-slate-900 dark:text-white transition-all duration-1000 group-hover/strength:text-indigo-600 dark:group-hover/strength:text-indigo-400 tracking-tighter">{{ strength }}<span class="text-3xl text-slate-400 dark:text-slate-600 font-bold ml-1">%</span></span>
                        <div class="mb-3 px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest shadow-sm">{{ 'PROFILE.STATS.EXCELLENT' | translate }}</div>
                    </div>
                </div>
                
                <div class="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner p-0.5">
                    <div class="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-1000 relative overflow-hidden" [style.width.%]="strength">
                        <div class="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)50%,rgba(255,255,255,0.2)75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[stripes_1s_linear_infinite]"></div>
                    </div>
                </div>
                <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-6 leading-relaxed font-medium">
                    {{ 'PROFILE.STATS.STRENGTH_DESC' | translate }} <span class="font-bold text-slate-800 dark:text-indigo-300">{{ 'PROFILE.STATS.STRENGTH_HIGHLIGHT' | translate }}</span>.
                </p>
             </div>
        </div>

        <!-- Data Points Card -->
        <div class="relative bg-white/70 dark:bg-slate-900/50 backdrop-blur-2xl rounded-[2rem] p-8 md:p-10 border border-white/50 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden group/data transform transition-transform duration-500 hover:-translate-y-1">
            <h4 class="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8 relative z-10">{{ 'PROFILE.STATS.REPO_SIZE' | translate }}</h4>
            
            <div class="space-y-4 relative z-10">
                <div class="flex justify-between items-center p-4 rounded-2xl bg-white dark:bg-slate-800/50 shadow-sm border border-slate-100 dark:border-white/5 group-hover/data:border-blue-100 dark:group-hover/data:border-blue-500/20 transition-colors">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm">
                             <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-width="2"/></svg>
                        </div>
                        <span class="text-[15px] font-bold text-slate-700 dark:text-slate-200">{{ 'PROFILE.STATS.EXP_COUNT' | translate }}</span>
                    </div>
                    <span class="text-2xl font-black text-slate-800 dark:text-white">{{ expCount }}</span>
                </div>
                
                <div class="flex justify-between items-center p-4 rounded-2xl bg-white dark:bg-slate-800/50 shadow-sm border border-slate-100 dark:border-white/5 group-hover/data:border-purple-100 dark:group-hover/data:border-purple-500/20 transition-colors">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-sm">
                             <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-width="2"/></svg>
                        </div>
                        <span class="text-[15px] font-bold text-slate-700 dark:text-slate-200">{{ 'PROFILE.STATS.SKILL_COUNT' | translate }}</span>
                    </div>
                    <span class="text-2xl font-black text-slate-800 dark:text-white">{{ skillCount }}</span>
                </div>
            </div>
            
            <button class="relative z-10 w-full mt-6 py-4 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 rounded-xl transition-all border border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-500/30 flex justify-center items-center gap-2 group/btn">
                <svg class="w-4 h-4 group-hover/btn:animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke-width="2"/></svg>
                {{ 'PROFILE.STATS.SYNC_DATA' | translate }}
            </button>
        </div>

        <!-- AI Persona Card -->
        <div class="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-[2rem] p-8 md:p-10 text-white shadow-2xl shadow-indigo-500/20 overflow-hidden group/ai transform transition-transform duration-500 hover:-translate-y-1">
            <!-- Animated Radial & Noise -->
            <div class="absolute inset-0 bg-[url('/assets/noise.png')] opacity-20 mix-blend-overlay z-0"></div>
            <div class="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-[50px] animate-blob z-0 mix-blend-screen group-hover/ai:scale-150 transition-transform duration-1000"></div>
            <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-500/20 rounded-full blur-[50px] animate-blob animation-delay-2000 z-0 mix-blend-screen group-hover/ai:scale-150 transition-transform duration-1000"></div>
            
            <div class="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <h4 class="text-[11px] font-black text-indigo-300 uppercase tracking-widest mb-8">{{ 'PROFILE.STATS.AI_BLUEPRINT' | translate }}</h4>
                    
                    <div class="flex items-start gap-5 mb-6">
                        <div class="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 group-hover/ai:rotate-12 group-hover/ai:scale-110 transition-all duration-500 shadow-lg shadow-black/10 shrink-0 relative">
                            <div class="absolute inset-0 bg-white/20 rounded-2xl blur opacity-0 group-hover/ai:opacity-100 transition-opacity"></div>
                            <svg class="w-8 h-8 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" stroke-width="2"/></svg>
                        </div>
                        <div class="pt-1">
                            <h3 class="text-2xl md:text-3xl font-black mb-1 leading-none tracking-tight">Senior<br/>Architect</h3>
                            <p class="text-[11px] text-indigo-200 font-bold uppercase tracking-widest mt-2">
                                {{ 'PROFILE.STATS.PERSONA_LABEL' | translate }}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                    <span class="text-sm font-medium text-white/80">Technical Visionary</span>
                    <button class="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all backdrop-blur-md group-hover/ai:translate-x-1 border border-white/5">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" stroke-width="2"/></svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
    `
})
export class ProfileStatsComponent {
    @Input() strength: number = 0;
    @Input() expCount: number = 0;
    @Input() skillCount: number = 0;
}
