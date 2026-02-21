import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pro14-professor-serif-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full bg-[#f4ece4] p-16 font-serif text-[#2d241c]">
        <div class="border-y border-[#2d241c] py-10 mb-12 text-center">
            <h1 class="text-3xl font-normal italic mb-2 tracking-wide">{{ resume.personalInfo.fullName }}</h1>
            <p class="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">{{ resume.personalInfo.jobTitle }}</p>

             <div class="flex flex-wrap justify-center gap-2 text-[10px] opacity-80 mt-2">
                <a [href]="'mailto:' + resume.personalInfo.email" class="hover:underline">{{ resume.personalInfo.email }}</a>
                <span *ngIf="resume.personalInfo.phone">| {{ resume.personalInfo.phone }}</span>
                <span *ngIf="resume.personalInfo.location">| {{ resume.personalInfo.location }}</span>
                <span *ngIf="resume.personalInfo.linkedin">| <a [href]="resume.personalInfo.linkedin" target="_blank" class="hover:underline">LinkedIn</a></span>
                <span *ngIf="resume.personalInfo.github">| <a [href]="resume.personalInfo.github" target="_blank" class="hover:underline">GitHub</a></span>
                <span *ngIf="resume.personalInfo.portfolio">| <a [href]="resume.personalInfo.portfolio" target="_blank" class="hover:underline">Portfolio</a></span>
             </div>
            <div *ngIf="resume.summary" class="mt-8 max-w-xl mx-auto text-xs italic leading-relaxed opacity-80 font-medium">
                “{{ resume.summary }}”
            </div>
        </div>
        <div class="columns-2 gap-12 text-justify">
            <section *ngIf="resume.experience && resume.experience.length" class="space-y-12">
                <h3 class="text-sm font-bold border-b border-slate-200 pb-2 mb-8 uppercase tracking-[0.3em]">Curriculum Vitae</h3>
                <div *ngFor="let job of resume.experience" class="grid grid-cols-12 gap-8">
                    <div class="col-span-3 text-[10px] font-bold opacity-30 mt-1">{{ job.startDate }} — {{ job.endDate }}</div>
                    <div class="col-span-9">
                        <h4 class="text-xl font-normal leading-tight mb-2 italic">{{ job.jobTitle }}</h4>
                        <p class="text-xs font-bold opacity-60 mb-4">{{ job.company }}</p>
                        <div class="text-xs leading-relaxed opacity-60" [innerHTML]="job.description"></div>
                    </div>
                </div>
            </section>
            <section *ngIf="resume.projects && resume.projects.length" class="space-y-12">
                <h3 class="text-sm font-bold border-b border-slate-200 pb-2 mb-8 uppercase tracking-[0.3em]">Projects</h3>
                <div class="grid grid-cols-2 gap-12">
                    <div *ngFor="let p of resume.projects">
                        <h4 class="text-lg font-normal mb-1 italic leading-none">{{ p.name }}</h4>
                        <div class="flex gap-2 text-[9px] font-bold opacity-40 mb-2 italic">
                             <a *ngIf="p.link" [href]="p.link" target="_blank" class="hover:underline">Link</a>
                             <a *ngIf="p.githubLink" [href]="p.githubLink" target="_blank" class="hover:underline">GitHub</a>
                             <a *ngIf="p.demoLink" [href]="p.demoLink" target="_blank" class="hover:underline">Demo</a>
                        </div>
                        <p class="text-[11px] leading-relaxed opacity-60 text-left">{{ p.description }}</p>
                    </div>
                </div>
            </section>
            <div class="grid grid-cols-2 gap-20">
                <section *ngIf="resume.education && resume.education.length" class="space-y-8">
                    <h3 class="text-sm font-bold border-b border-slate-200 pb-2 mb-8 uppercase tracking-[0.3em]">Education</h3>
                    <div *ngFor="let edu of resume.education">
                        <p class="text-[10px] font-bold opacity-30 mb-1 tracking-widest">{{ edu.startDate }} .. {{ edu.endDate }}</p>
                        <h4 class="text-lg font-normal italic leading-snug">{{ edu.degree }}</h4>
                        <p class="text-[11px] font-bold opacity-60">{{ edu.school }}</p>
                    </div>
                </section>
                <div class="space-y-12">
                    <section *ngIf="resume.skills && resume.skills.length">
                        <h3 class="text-sm font-bold border-b border-slate-200 pb-2 mb-8 uppercase tracking-[0.3em]">Skills</h3>
                        <div class="grid grid-cols-2 gap-x-8 gap-y-2">
                            <div *ngFor="let s of resume.skills" class="text-[11px] font-medium opacity-60 flex items-center gap-3">
                                <span class="w-1 h-1 bg-slate-300 rounded-full"></span> {{ s }}
                            </div>
                        </div>
                    </section>
                    <section *ngIf="resume.languages && resume.languages.length">
                        <h3 class="text-sm font-bold border-b border-slate-200 pb-2 mb-8 uppercase tracking-[0.3em]">Lexical Range</h3>
                        <div class="flex flex-wrap gap-x-6 gap-y-2">
                            <span *ngFor="let l of resume.languages" class="text-[11px] italic opacity-60 font-bold border-b border-slate-100 pb-0.5">{{ l }}</span>
                        </div>
                    </section>
                </div>
            </div>
            <div *ngFor="let section of resume.customSections">
                <section *ngIf="section.items && section.items.length" class="space-y-12">
                    <h3 class="text-sm font-bold border-b border-slate-200 pb-2 mb-8 uppercase tracking-[0.3em]">{{ section.title }}</h3>
                    <div class="grid grid-cols-3 gap-12">
                        <div *ngFor="let item of section.items">
                            <h4 class="text-lg font-normal mb-2 italic">{{ item.name }}</h4>
                            <p class="text-[11px] leading-relaxed opacity-60">{{ item.description }}</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
  `
})
export class Pro14ProfessorSerifComponent {
    @Input() resume: any;
    @Input() config: any;
}
