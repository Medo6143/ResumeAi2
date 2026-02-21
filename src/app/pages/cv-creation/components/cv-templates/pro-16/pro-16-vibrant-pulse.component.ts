import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from '../shared/experience/experience.component';

@Component({
    selector: 'app-pro16-vibrant-pulse-template',
    standalone: true,
    imports: [CommonModule, ExperienceComponent],
    template: `
    <div class="h-full flex flex-col font-sans overflow-hidden">
        <div class="h-64 bg-slate-900 relative p-12 flex flex-col justify-end">
            <h1 class="text-6xl font-black text-white leading-none tracking-tighter mb-4">{{ resume.personalInfo.fullName }}</h1>
            <p class="text-slate-400 font-bold uppercase text-xs">{{ resume.personalInfo.jobTitle }}</p>

             <div class="flex flex-wrap justify-center gap-2 text-[10px] opacity-80 mt-2">
                <a [href]="'mailto:' + resume.personalInfo.email" class="hover:underline">{{ resume.personalInfo.email }}</a>
                <span *ngIf="resume.personalInfo.phone">| {{ resume.personalInfo.phone }}</span>
                <span *ngIf="resume.personalInfo.location">| {{ resume.personalInfo.location }}</span>
                <span *ngIf="resume.personalInfo.linkedin">| <a [href]="resume.personalInfo.linkedin" target="_blank" class="hover:underline">LinkedIn</a></span>
                <span *ngIf="resume.personalInfo.github">| <a [href]="resume.personalInfo.github" target="_blank" class="hover:underline">GitHub</a></span>
                <span *ngIf="resume.personalInfo.portfolio">| <a [href]="resume.personalInfo.portfolio" target="_blank" class="hover:underline">Portfolio</a></span>
             </div>
        </div>
        <div class="p-12 flex-1">
            <div *ngIf="resume.summary" class="mb-12 max-w-2xl">
                <p class="text-sm font-bold text-slate-800 leading-relaxed border-l-4 border-slate-900 pl-4">{{ resume.summary }}</p>
            </div>
            <div class="grid grid-cols-12 gap-12">
                <div class="col-span-8 space-y-12">
                    <section *ngIf="resume.experience && resume.experience.length">
                        <h4 class="text-[10px] font-black uppercase text-slate-300 mb-8 tracking-widest">Experience</h4>
                        <app-experience-block [jobs]="resume.experience"></app-experience-block>
                    </section>
                    <section *ngIf="resume.projects && resume.projects.length">
                        <h4 class="text-[10px] font-black uppercase text-slate-300 mb-8 tracking-widest">Projects</h4>
                        <div class="grid grid-cols-2 gap-8">
                            <div *ngFor="let p of resume.projects" class="group">
                                <h5 class="text-sm font-black mb-1 flex items-center gap-2">
                                    <span class="w-1.5 h-1.5 bg-slate-900"></span> {{ p.name }}
                                </h5>
                                <div class="flex gap-2 text-[9px] font-bold text-slate-400 mb-2 pl-3.5 italic">
                                     <a *ngIf="p.link" [href]="p.link" target="_blank" class="hover:text-slate-900 transition underline">Link</a>
                                     <a *ngIf="p.githubLink" [href]="p.githubLink" target="_blank" class="hover:text-slate-900 transition underline">GitHub</a>
                                     <a *ngIf="p.demoLink" [href]="p.demoLink" target="_blank" class="hover:text-slate-900 transition underline">Demo</a>
                                </div>
                                <p class="text-[10px] leading-relaxed opacity-60 pl-3.5">{{ p.description }}</p>
                            </div>
                        </div>
                    </section>
                    <div *ngFor="let section of resume.customSections">
                        <section *ngIf="section.items && section.items.length">
                            <h4 class="text-[10px] font-black uppercase text-slate-300 mb-8 tracking-widest">{{ section.title }}</h4>
                            <div class="grid grid-cols-2 gap-8">
                                <div *ngFor="let item of section.items" class="group">
                                    <h5 class="text-sm font-black mb-2 flex items-center gap-2">
                                        <span class="w-1.5 h-1.5 bg-slate-900"></span> {{ item.name }}
                                    </h5>
                                    <p class="text-[10px] leading-relaxed opacity-60">{{ item.description }}</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div class="col-span-4 space-y-12">
                    <section *ngIf="resume.education && resume.education.length">
                        <h4 class="text-[10px] font-black uppercase text-slate-300 mb-8 tracking-widest">Education</h4>
                        <div class="space-y-6">
                            <div *ngFor="let edu of resume.education">
                                <h5 class="text-xs font-black">{{ edu.degree }}</h5>
                                <p class="text-[10px] font-bold opacity-40">{{ edu.school }}</p>
                            </div>
                        </div>
                    </section>
                    <section *ngIf="resume.skills && resume.skills.length">
                        <h4 class="text-[10px] font-black uppercase text-slate-300 mb-8 tracking-widest">Skills</h4>
                        <div class="flex flex-wrap gap-2">
                            <span *ngFor="let s of resume.skills" class="px-3 py-1 bg-slate-100 text-[10px] font-black rounded-full">{{ s }}</span>
                        </div>
                    </section>
                    <section *ngIf="resume.languages && resume.languages.length">
                        <h4 class="text-[10px] font-black uppercase text-slate-300 mb-8 tracking-widest">Languages</h4>
                        <div class="space-y-2">
                            <div *ngFor="let l of resume.languages" class="flex items-center justify-between border-b border-slate-50 pb-2">
                                <span class="text-[10px] font-black">{{ l }}</span>
                                <div class="w-12 h-1 bg-slate-100"><div class="w-8 h-full bg-slate-900"></div></div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
  `
})
export class Pro16VibrantPulseComponent {
    @Input() resume: any;
    @Input() config: any;
}
