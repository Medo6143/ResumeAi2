import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pro7-soft-pastel-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full bg-slate-50 p-10 font-sans text-slate-700">
        <div class="bg-white rounded-[3rem] shadow-xl overflow-hidden h-full flex flex-col border border-white">
            <header class="bg-indigo-50/50 p-12 text-center">
                <h1 class="text-3xl font-bold tracking-tight mb-2 text-indigo-950">{{ resume.personalInfo.fullName }}</h1>
                <p class="text-xs font-medium uppercase tracking-[0.2em] text-indigo-400">{{ resume.personalInfo.jobTitle }}</p>
                <div class="mt-8 flex justify-center gap-6 text-[10px] opacity-40">
                    <span>{{ resume.personalInfo.email }}</span>
                    <span>{{ resume.personalInfo.phone }}</span>
                </div>
            </header>
            <div class="flex-1 p-12 grid grid-cols-12 gap-12">
                <div class="col-span-5 space-y-10">
                    <section>
                        <h4 class="text-[10px] font-black uppercase text-indigo-300 mb-6 tracking-widest">About</h4>
                        <p class="text-[11px] leading-relaxed italic">{{ resume.summary }}</p>
                    </section>
                    <section>
                        <h4 class="text-[10px] font-black uppercase text-indigo-300 mb-6 tracking-widest">Skills</h4>
                        <div class="flex flex-wrap gap-2">
                            <span *ngFor="let s of resume.skills" class="px-3 py-1 bg-slate-50 text-[10px] rounded-full border border-slate-100">{{ s }}</span>
                        </div>
                    </section>
                    <section *ngIf="resume.education && resume.education.length">
                        <h4 class="text-[10px] font-black uppercase text-indigo-300 mb-6 tracking-widest">Education</h4>
                        <div class="space-y-4">
                            <div *ngFor="let edu of resume.education">
                                <p class="text-[11px] font-bold">{{ edu.degree }}</p>
                                <p class="text-[10px] opacity-40 italic">{{ edu.school }}</p>
                            </div>
                        </div>
                    </section>
                    <section *ngIf="resume.languages && resume.languages.length">
                        <h4 class="text-[10px] font-black uppercase text-indigo-300 mb-6 tracking-widest">Languages</h4>
                        <p class="text-[11px] font-medium">{{ resume.languages.join(', ') }}</p>
                    </section>
                </div>
                <div class="col-span-7 border-l border-slate-50 pl-12">
                    <div class="space-y-12">
                        <section *ngIf="resume.experience && resume.experience.length">
                            <h4 class="text-[10px] font-black uppercase text-indigo-300 mb-8 tracking-widest">Experience</h4>
                            <div class="space-y-10">
                                <div *ngFor="let job of resume.experience">
                                    <p class="text-[9px] font-bold text-indigo-400 mb-1">{{ job.startDate }} - {{ job.endDate }}</p>
                                    <h5 class="text-sm font-bold text-slate-800">{{ job.jobTitle }}</h5>
                                    <p class="text-[10px] opacity-40 font-bold mb-3 italic">{{ job.company }}</p>
                                    <div class="text-[10px] leading-relaxed opacity-60" [innerHTML]="job.description"></div>
                                </div>
                            </div>
                        </section>
                        <section *ngIf="resume.projects && resume.projects.length">
                            <h4 class="text-[10px] font-black uppercase text-indigo-300 mb-8 tracking-widest">Projects</h4>
                            <div class="grid grid-cols-2 gap-6">
                                <div *ngFor="let p of resume.projects">
                                    <h5 class="text-sm font-bold text-slate-800">{{ p.name }}</h5>
                                    <p class="text-[10px] leading-relaxed opacity-60 mt-1">{{ p.description }}</p>
                                </div>
                            </div>
                        </section>
                        <div *ngFor="let section of resume.customSections">
                            <section *ngIf="section.items && section.items.length">
                                <h4 class="text-[10px] font-black uppercase text-indigo-300 mb-8 tracking-widest">{{ section.title }}</h4>
                                <div class="grid grid-cols-2 gap-6">
                                    <div *ngFor="let item of section.items">
                                        <h5 class="text-sm font-bold text-slate-800">{{ item.name }}</h5>
                                        <p class="text-[10px] leading-relaxed opacity-60 mt-1">{{ item.description }}</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `
})
export class Pro7SoftPastelComponent {
    @Input() resume: any;
    @Input() config: any;
}
