import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from '../shared/experience/experience.component';

@Component({
    selector: 'app-pro13-startup-vibe-template',
    standalone: true,
    imports: [CommonModule, ExperienceComponent],
    template: `
    <div class="h-full p-8 font-sans">
        <div class="bg-amber-50 rounded-[2rem] p-10 h-full flex flex-col gap-8 border-4 border-slate-900">
            <header class="flex justify-between items-center">
                <div class="p-6 bg-white rounded-3xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a]">
                    <h1 class="text-3xl font-black tracking-tight">{{ resume.personalInfo.fullName }}</h1>
                    <p class="text-amber-600 font-black uppercase text-xs">{{ resume.personalInfo.jobTitle }}</p>
                </div>
                <div class="space-y-2 text-right">
                    <span class="px-4 py-2 bg-slate-900 text-white rounded-full text-[10px] font-bold">{{ resume.personalInfo.email }}</span>
                </div>
            </header>
            <div class="grid grid-cols-12 gap-8 flex-1">
                <div class="col-span-12 space-y-8">
                    <section *ngIf="resume.summary" class="bg-white rounded-3xl p-6 border-4 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
                        <h3 class="text-sm font-black uppercase mb-2">About Me</h3>
                        <p class="text-sm font-medium">{{ resume.summary }}</p>
                    </section>
                    <section *ngIf="resume.experience && resume.experience.length" class="bg-white rounded-3xl p-8 border-4 border-slate-900 overflow-hidden shadow-[4px_4px_0px_0px_#0f172a]">
                        <h3 class="text-lg font-black italic mb-4 uppercase tracking-tighter text-amber-600">What I've Done</h3>
                        <app-experience-block [jobs]="resume.experience"></app-experience-block>
                    </section>
                    <div class="grid grid-cols-2 gap-8">
                        <section *ngIf="resume.projects && resume.projects.length" class="bg-indigo-50 rounded-3xl p-6 border-4 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
                            <h3 class="text-sm font-black uppercase mb-4 tracking-tight">Side Projects</h3>
                            <div class="space-y-6">
                                <div *ngFor="let p of resume.projects">
                                    <h4 class="text-[11px] font-black italic underline">{{ p.name }}</h4>
                                    <p class="text-[10px] font-medium opacity-60 mt-1">{{ p.description }}</p>
                                </div>
                            </div>
                        </section>
                        <div *ngFor="let section of resume.customSections">
                            <section *ngIf="section.items && section.items.length" class="bg-emerald-50 rounded-3xl p-6 border-4 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
                                <h3 class="text-sm font-black uppercase mb-4 tracking-tight">{{ section.title }}</h3>
                                <div class="space-y-6">
                                    <div *ngFor="let item of section.items">
                                        <h4 class="text-[11px] font-black italic underline">{{ item.name }}</h4>
                                        <p class="text-[10px] font-medium opacity-60 mt-1">{{ item.description }}</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 grid grid-cols-3 gap-8">
                    <section *ngIf="resume.education && resume.education.length" class="col-span-1 bg-white rounded-3xl p-6 border-4 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
                        <h3 class="text-sm font-black uppercase mb-4 tracking-tight text-indigo-600">Learning</h3>
                        <div class="space-y-4">
                            <div *ngFor="let edu of resume.education">
                                <p class="text-[11px] font-black">{{ edu.degree }}</p>
                                <p class="text-[9px] font-bold opacity-40 uppercase">{{ edu.school }}</p>
                            </div>
                        </div>
                    </section>
                    <section *ngIf="resume.skills && resume.skills.length" class="col-span-1 bg-slate-900 rounded-3xl p-6 border-4 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
                        <h3 class="text-sm font-black uppercase mb-4 tracking-tight text-white">The Stack</h3>
                        <div class="flex flex-wrap gap-2">
                            <span *ngFor="let s of resume.skills" class="px-2 py-1 bg-white text-[9px] font-black rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">{{ s }}</span>
                        </div>
                    </section>
                    <section *ngIf="resume.languages && resume.languages.length" class="col-span-1 bg-amber-50 rounded-3xl p-6 border-4 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
                        <h3 class="text-sm font-black uppercase mb-4 tracking-tight text-amber-600">Tongues</h3>
                        <div class="flex flex-col gap-2">
                            <div *ngFor="let l of resume.languages" class="flex items-center gap-2">
                                <div class="w-1.5 h-1.5 bg-slate-900"></div>
                                <span class="text-[10px] font-black italic">{{ l }}</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
  `
})
export class Pro13StartupVibeComponent {
    @Input() resume: any;
    @Input() config: any;
}
