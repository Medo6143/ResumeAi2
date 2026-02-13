import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from '../shared/experience/experience.component';

@Component({
    selector: 'app-pro2-creative-grid-template',
    standalone: true,
    imports: [CommonModule, ExperienceComponent],
    template: `
    <div class="h-full p-6 flex flex-col gap-6 font-sans">
        <div class="grid grid-cols-3 gap-6">
            <div class="col-span-1 bg-slate-900 text-white p-6 rounded-3xl flex flex-col justify-center">
                <h1 class="text-2xl font-black leading-none mb-2">{{ resume.personalInfo.fullName.split(' ')[0] }}<br>{{ resume.personalInfo.fullName.split(' ')[1] }}</h1>
                <p class="text-[10px] font-bold opacity-60 uppercase">{{ resume.personalInfo.jobTitle }}</p>
            </div>
            <div class="col-span-2 p-6 rounded-3xl border-2 border-slate-100 flex items-center">
                <p class="text-[10px] leading-relaxed text-slate-500 italic">{{ resume.summary }}</p>
            </div>
        </div>
        <div class="flex-1 grid grid-cols-12 gap-6">
            <div class="col-span-7 space-y-6">
                <h3 class="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2">
                    <span class="w-8 h-0.5 bg-pink-500"></span> History
                </h3>
                <app-experience-block [jobs]="resume.experience"></app-experience-block>
                <div *ngIf="resume.projects && resume.projects.length" class="space-y-6">
                    <h3 class="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2">
                        <span class="w-8 h-0.5 bg-pink-500"></span> Works
                    </h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div *ngFor="let p of resume.projects" class="p-4 rounded-2xl border border-slate-100">
                            <h4 class="text-[10px] font-black italic mb-1">{{ p.name }}</h4>
                            <p class="text-[9px] opacity-50">{{ p.description }}</p>
                        </div>
                    </div>
                </div>
                <div *ngFor="let section of resume.customSections" class="space-y-6">
                    <h3 class="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2">
                        <span class="w-8 h-0.5 bg-pink-500"></span> {{ section.title }}
                    </h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div *ngFor="let item of section.items" class="p-4 rounded-2xl border border-slate-100">
                            <h4 class="text-[10px] font-black italic mb-1">{{ item.name }}</h4>
                            <p class="text-[9px] opacity-50">{{ item.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-5 flex flex-col gap-6">
                <div class="p-6 bg-pink-50 rounded-3xl">
                    <h4 class="text-[10px] font-black uppercase mb-4">Stack</h4>
                    <div class="flex flex-wrap gap-2">
                        <span *ngFor="let s of resume.skills" class="px-2 py-1 bg-white text-[9px] font-bold rounded-lg shadow-sm">{{ s }}</span>
                    </div>
                </div>
                <div class="p-6 bg-slate-50 rounded-3xl">
                    <h4 class="text-[10px] font-black uppercase mb-4">Reach</h4>
                    <div class="text-[10px] space-y-2 opacity-60">
                        <p>M: {{ resume.personalInfo.phone }}</p>
                        <p>E: {{ resume.personalInfo.email }}</p>
                    </div>
                </div>
                <div *ngIf="resume.education && resume.education.length" class="p-6 bg-indigo-50 rounded-3xl">
                    <h4 class="text-[10px] font-black uppercase mb-4">Study</h4>
                    <div class="space-y-4">
                        <div *ngFor="let edu of resume.education">
                            <p class="text-[10px] font-bold">{{ edu.degree }}</p>
                            <p class="text-[9px] opacity-40">{{ edu.school }}</p>
                        </div>
                    </div>
                </div>
                <div *ngIf="resume.languages && resume.languages.length" class="p-6 bg-slate-100 rounded-3xl">
                    <h4 class="text-[10px] font-black uppercase mb-2">Tongues</h4>
                    <p class="text-[9px] font-bold opacity-60">{{ resume.languages.join(', ') }}</p>
                </div>
            </div>
        </div>
    </div>
  `
})
export class Pro2CreativeGridComponent {
    @Input() resume: any;
    @Input() config: any;
}
