import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pro15-minimalist-dot-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full p-12 flex flex-col items-center font-sans">
        <div class="flex flex-col items-center mb-16">
            <div class="w-3 h-3 bg-slate-200 rounded-full mb-8"></div>
            <h1 class="text-2xl font-black uppercase tracking-[0.5em] mb-2">{{ resume.personalInfo.fullName }}</h1>
            <p class="text-[10px] font-bold opacity-30 tracking-[0.3em] uppercase">{{ resume.personalInfo.jobTitle }}</p>
            <div *ngIf="resume.summary" class="mt-8 text-center max-w-md text-xs font-medium opacity-60 leading-relaxed">
                {{ resume.summary }}
            </div>
        </div>
        <div class="grid grid-cols-12 gap-20 w-full">
            <div class="col-span-8 space-y-12">
                <section *ngIf="resume.experience && resume.experience.length">
                    <h3 class="text-[11px] font-black uppercase tracking-[0.3em] mb-10 pb-4 border-b border-slate-100 flex justify-between items-center">
                        Experience <span class="w-12 h-[1px] bg-slate-100"></span>
                    </h3>
                    <div class="space-y-12">
                        <div *ngFor="let job of resume.experience" class="flex gap-8">
                            <div class="w-24 shrink-0 text-right">
                                <p class="text-[9px] font-black opacity-20 uppercase">{{ job.startDate }}</p>
                            </div>
                            <div class="flex-1 space-y-2">
                                <h4 class="text-sm font-black italic">{{ job.jobTitle }}</h4>
                                <p class="text-[10px] font-bold opacity-40">{{ job.company }}</p>
                                <div class="text-[10px] opacity-60 leading-relaxed" [innerHTML]="job.description"></div>
                            </div>
                        </div>
                    </div>
                </section>
                <section *ngIf="resume.projects && resume.projects.length">
                    <h3 class="text-[11px] font-black uppercase tracking-[0.3em] mb-10 pb-4 border-b border-slate-100 flex justify-between items-center">
                        Projects <span class="w-12 h-[1px] bg-slate-100"></span>
                    </h3>
                    <div class="space-y-8 pl-32">
                        <div *ngFor="let p of resume.projects">
                            <h4 class="text-sm font-black italic underline">{{ p.name }}</h4>
                            <p class="text-[10px] opacity-60 mt-1 leading-relaxed">{{ p.description }}</p>
                        </div>
                    </div>
                </section>
            </div>
            <div class="col-span-4 space-y-12">
                <section *ngIf="resume.education && resume.education.length">
                    <h4 class="text-[10px] font-black uppercase mb-6 tracking-widest opacity-30 italic">Academic</h4>
                    <div class="space-y-6">
                        <div *ngFor="let edu of resume.education">
                            <p class="text-xs font-black uppercase">{{ edu.degree }}</p>
                            <p class="text-[10px] opacity-40 italic">{{ edu.school }}</p>
                        </div>
                    </div>
                </section>
                <section *ngIf="resume.skills && resume.skills.length">
                    <h4 class="text-[10px] font-black uppercase mb-6 tracking-widest opacity-30 italic">Skills</h4>
                    <div class="flex flex-wrap gap-2">
                        <span *ngFor="let s of resume.skills" class="text-[10px] font-bold border-b-2 border-slate-900 pb-0.5">{{ s }}</span>
                    </div>
                </section>
                <section *ngIf="resume.languages && resume.languages.length">
                    <h4 class="text-[10px] font-black uppercase mb-6 tracking-widest opacity-30 italic">Languages</h4>
                    <div class="space-y-2">
                        <p *ngFor="let l of resume.languages" class="text-[10px] font-bold flex items-center gap-2">
                            <span class="w-1 h-1 bg-slate-900 rounded-full"></span> {{ l }}
                        </p>
                    </div>
                </section>
                <div *ngFor="let section of resume.customSections">
                    <section *ngIf="section.items && section.items.length">
                        <h4 class="text-[10px] font-black uppercase mb-6 tracking-widest opacity-30 italic">{{ section.title }}</h4>
                        <div class="space-y-6">
                            <div *ngFor="let item of section.items">
                                <p class="text-xs font-black uppercase">{{ item.name }}</p>
                                <p class="text-[10px] opacity-40">{{ item.description }}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
  `
})
export class Pro15MinimalistDotComponent {
    @Input() resume: any;
    @Input() config: any;
}
