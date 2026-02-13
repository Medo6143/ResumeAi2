import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pro5-dark-mode-pro-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full bg-slate-900 text-slate-300 p-0 flex font-sans">
        <div class="w-16 bg-gradient-to-b from-indigo-500 to-purple-600 flex flex-col items-center py-10 gap-8">
            <div class="w-8 h-8 rounded bg-white/20"></div>
            <div class="w-8 h-8 rounded bg-white/10"></div>
        </div>
        <div class="flex-1 p-12">
            <header class="flex justify-between items-start mb-16">
                <div>
                    <h1 class="text-5xl font-black text-white tracking-tighter mb-2">{{ resume.personalInfo.fullName }}</h1>
                    <p class="text-indigo-400 font-bold tracking-widest uppercase text-sm">{{ resume.personalInfo.jobTitle }}</p>
                </div>
                <div class="text-right text-[10px] opacity-40 font-mono">
                    <p>{{ resume.personalInfo.email }}</p>
                    <p>{{ resume.personalInfo.phone }}</p>
                </div>
            </header>
            <div class="grid grid-cols-12 gap-12">
                <div class="col-span-8 space-y-10">
                    <section *ngIf="resume.summary">
                        <h2 class="text-white text-xs font-black mb-4 uppercase tracking-[0.2em] flex items-center gap-4">
                            Bio_Data <span class="flex-1 h-px bg-slate-800"></span>
                        </h2>
                        <p class="text-xs text-slate-400 leading-relaxed font-mono pl-6 border-l border-slate-800">{{ resume.summary }}</p>
                    </section>
                    <section>
                        <h2 class="text-white text-xs font-black mb-6 uppercase tracking-[0.2em] flex items-center gap-4">
                            Log_Experience <span class="flex-1 h-px bg-slate-800"></span>
                        </h2>
                        <div class="space-y-8">
                            <div *ngFor="let job of resume.experience" class="relative pl-6 border-l border-slate-800">
                                <div class="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-indigo-500 border-4 border-slate-900"></div>
                                <div class="flex justify-between items-center mb-2">
                                    <h3 class="text-white font-bold text-sm">{{ job.jobTitle }}</h3>
                                    <span class="text-[9px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 uppercase font-bold">{{ job.startDate }} - {{ job.endDate }}</span>
                                </div>
                                <p class="text-xs text-indigo-400 font-bold mb-2">{{ job.company }}</p>
                                <div class="text-xs opacity-50 leading-relaxed" [innerHTML]="job.description"></div>
                            </div>
                        </div>
                    </section>
                    <section *ngIf="resume.projects && resume.projects.length">
                        <h2 class="text-white text-xs font-black mb-6 uppercase tracking-[0.2em] flex items-center gap-4">
                            Run_Projects <span class="flex-1 h-px bg-slate-800"></span>
                        </h2>
                        <div class="grid grid-cols-2 gap-6">
                            <div *ngFor="let p of resume.projects" class="p-4 bg-slate-800/30 rounded-xl border border-slate-800">
                                <h4 class="text-[11px] font-bold text-white mb-1">{{ p.name }}</h4>
                                <p class="text-[10px] opacity-40 leading-tight">{{ p.description }}</p>
                            </div>
                        </div>
                    </section>
                    <div *ngFor="let section of resume.customSections">
                        <section *ngIf="section.items && section.items.length">
                            <h2 class="text-white text-xs font-black mb-6 uppercase tracking-[0.2em] flex items-center gap-4">
                                {{ section.title.toUpperCase().replace(' ', '_') }} <span class="flex-1 h-px bg-slate-800"></span>
                            </h2>
                            <div class="grid grid-cols-2 gap-6">
                                <div *ngFor="let item of section.items" class="p-4 bg-slate-800/30 rounded-xl border border-slate-800">
                                    <h4 class="text-[11px] font-bold text-white mb-1">{{ item.name }}</h4>
                                    <p class="text-[10px] opacity-40 leading-tight">{{ item.description }}</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div class="col-span-4 space-y-10">
                    <section class="bg-indigo-500/10 p-6 rounded-2xl border border-indigo-500/20">
                        <h2 class="text-white text-xs font-black mb-6 uppercase tracking-[0.2em]">Build_Education</h2>
                        <div class="space-y-6">
                            <div *ngFor="let edu of resume.education">
                                <p class="text-[10px] font-black text-indigo-300 uppercase">{{ edu.degree }}</p>
                                <p class="text-[9px] text-white opacity-60">{{ edu.school }}</p>
                                <p class="text-[8px] text-indigo-400 font-mono">{{ edu.startDate }} .. {{ edu.endDate }}</p>
                            </div>
                        </div>
                    </section>
                    <section class="p-6 border-t border-slate-800">
                        <h2 class="text-white text-xs font-black mb-6 uppercase tracking-[0.2em]">System_Languages</h2>
                        <div class="flex flex-col gap-2">
                            <div *ngFor="let l of resume.languages" class="flex items-center gap-2">
                                <div class="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                <span class="text-[10px] font-bold text-slate-400">{{ l }}</span>
                            </div>
                        </div>
                    </section>
                    <section class="bg-slate-800/50 p-6 rounded-2xl border border-slate-800">
                        <h2 class="text-white text-xs font-black mb-6 uppercase tracking-[0.2em]">Core_Skills</h2>
                        <div class="flex flex-wrap gap-2">
                            <span *ngFor="let s of resume.skills" class="px-2 py-1 bg-slate-900 text-[9px] font-bold text-indigo-300 rounded-lg border border-slate-700">{{ s }}</span>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
  `
})
export class Pro5DarkModeProComponent {
    @Input() resume: any;
    @Input() config: any;
}
