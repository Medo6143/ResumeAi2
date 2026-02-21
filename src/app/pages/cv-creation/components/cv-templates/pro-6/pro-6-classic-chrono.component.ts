import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pro6-classic-chrono-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full p-12 flex flex-col font-sans">
        <header class="flex gap-8 mb-12 items-end">
            <h1 class="text-6xl font-black leading-none tracking-tighter">{{ resume.personalInfo.fullName.split(' ')[0] }}<span class="block text-slate-300">{{ resume.personalInfo.fullName.split(' ').slice(1).join(' ') }}</span></h1>
            <div class="text-right pb-2">
                <p class="text-xs font-bold uppercase tracking-widest text-indigo-600">{{ resume.personalInfo.jobTitle }}</p>

             <div class="flex flex-wrap justify-center gap-2 text-[10px] opacity-80 mt-2">
                <a [href]="'mailto:' + resume.personalInfo.email" class="hover:underline">{{ resume.personalInfo.email }}</a>
                <span *ngIf="resume.personalInfo.phone">| {{ resume.personalInfo.phone }}</span>
                <span *ngIf="resume.personalInfo.location">| {{ resume.personalInfo.location }}</span>
                <span *ngIf="resume.personalInfo.linkedin">| <a [href]="resume.personalInfo.linkedin" target="_blank" class="hover:underline">LinkedIn</a></span>
                <span *ngIf="resume.personalInfo.github">| <a [href]="resume.personalInfo.github" target="_blank" class="hover:underline">GitHub</a></span>
                <span *ngIf="resume.personalInfo.portfolio">| <a [href]="resume.personalInfo.portfolio" target="_blank" class="hover:underline">Portfolio</a></span>
             </div>
            </div>
        </header>

        <div *ngIf="resume.summary" class="mb-12 max-w-3xl">
            <p class="text-sm font-medium text-slate-600 leading-relaxed indent-8">{{ resume.summary }}</p>
        </div>

            <div class="flex-1 space-y-12">
                <section *ngFor="let job of resume.experience" class="relative">
                    <div class="absolute -left-[56px] top-1 w-2 h-2 rounded-full bg-white border-2 border-slate-900 z-10"></div>
                    <div class="flex gap-8">
                        <div class="w-32 shrink-0">
                            <p class="text-[10px] font-black uppercase opacity-20">{{ job.startDate }}</p>
                            <p class="text-[10px] font-black uppercase">{{ job.endDate || 'Now' }}</p>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-xl font-black mb-1 uppercase italic tracking-tighter">{{ job.jobTitle }}</h4>
                            <p class="text-xs font-bold text-indigo-600 mb-3">{{ job.company }}</p>
                            <div class="text-xs leading-relaxed text-slate-500" [innerHTML]="job.description"></div>
                        </div>
                    </div>
                </section>
                <section *ngIf="resume.education && resume.education.length" class="relative">
                    <div class="absolute -left-[56px] top-1 w-2 h-2 rounded-full bg-white border-2 border-slate-900 z-10"></div>
                    <div class="flex gap-8">
                        <div class="w-32 shrink-0">
                            <h4 class="text-[10px] font-black uppercase opacity-20">Education</h4>
                        </div>
                        <div class="flex-1 space-y-6">
                            <div *ngFor="let edu of resume.education">
                                <h4 class="text-xl font-black mb-1 uppercase italic tracking-tighter">{{ edu.degree }}</h4>
                                <p class="text-xs font-bold text-indigo-600 mb-1">{{ edu.school }}</p>
                                <p class="text-[10px] font-black uppercase opacity-40">{{ edu.startDate }} — {{ edu.endDate }}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="relative">
                    <div class="absolute -left-[56px] top-1 w-2 h-2 rounded-full bg-white border-2 border-slate-900 z-10"></div>
                    <div class="flex gap-8">
                        <div class="w-32 shrink-0">
                            <h4 class="text-[10px] font-black uppercase opacity-20">Arsenal</h4>
                        </div>
                        <div class="flex-1 grid grid-cols-2 gap-8">
                            <div *ngIf="resume.skills && resume.skills.length">
                                <h4 class="text-sm font-black mb-3 uppercase italic tracking-tighter">Skills</h4>
                                <div class="flex flex-wrap gap-1">
                                    <span *ngFor="let s of resume.skills" class="text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded">{{ s }}</span>
                                </div>
                            </div>
                            <div *ngIf="resume.languages && resume.languages.length">
                                <h4 class="text-sm font-black mb-3 uppercase italic tracking-tighter">Languages</h4>
                                <div class="space-y-1">
                                    <p *ngFor="let l of resume.languages" class="text-[10px] font-bold">{{ l }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        <section *ngIf="resume.projects && resume.projects.length" class="relative">
                    <div class="absolute -left-[56px] top-1 w-2 h-2 rounded-full bg-white border-2 border-slate-900 z-10"></div>
                    <div class="flex gap-8">
                        <div class="w-32 shrink-0">
                            <h4 class="text-[10px] font-black uppercase opacity-20">Projects</h4>
                        </div>
                        <div class="flex-1 space-y-6">
                            <div *ngFor="let p of resume.projects">
                                <h4 class="text-xl font-black mb-1 uppercase italic tracking-tighter">{{ p.name }}</h4>
                                <div class="flex gap-2 text-[10px] font-bold text-indigo-600 mb-2">
                                     <a *ngIf="p.link" [href]="p.link" target="_blank" class="hover:underline hover:text-indigo-800">Link</a>
                                     <a *ngIf="p.githubLink" [href]="p.githubLink" target="_blank" class="hover:underline hover:text-indigo-800">GitHub</a>
                                     <a *ngIf="p.demoLink" [href]="p.demoLink" target="_blank" class="hover:underline hover:text-indigo-800">Demo</a>
                                </div>
                                <p class="text-xs leading-relaxed text-slate-500">{{ p.description }}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div *ngFor="let section of resume.customSections">
                    <section *ngIf="section.items && section.items.length" class="relative">
                        <div class="absolute -left-[56px] top-1 w-2 h-2 rounded-full bg-white border-2 border-slate-900 z-10"></div>
                        <div class="flex gap-8">
                            <div class="w-32 shrink-0">
                                <h4 class="text-[10px] font-black uppercase opacity-20">Extra</h4>
                            </div>
                            <div class="flex-1 space-y-6">
                                <h4 class="text-xl font-black mb-1 uppercase italic tracking-tighter">{{ section.title }}</h4>
                                <div class="space-y-4">
                                    <div *ngFor="let item of section.items">
                                        <h5 class="text-sm font-bold">{{ item.name }}</h5>
                                        <p class="text-xs leading-relaxed text-slate-500">{{ item.description }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
        </div>
    </div>
  `
})
export class Pro6ClassicChronoComponent {
    @Input() resume: any;
    @Input() config: any;
}
