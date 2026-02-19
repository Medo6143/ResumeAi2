import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pro11-emerald-clean-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full p-16 font-sans text-slate-800">
        <div class="max-w-2xl mx-auto space-y-16">
            <header class="text-center">
                <h1 class="text-2xl font-medium tracking-widest uppercase mb-2">{{ resume.personalInfo.fullName }}</h1>
                <div class="w-12 h-1 bg-emerald-500 mx-auto my-4"></div>
                <p class="text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em]">{{ resume.personalInfo.jobTitle }}</p>

             <div class="flex flex-wrap justify-center gap-2 text-[10px] opacity-80 mt-2">
                <a [href]="'mailto:' + resume.personalInfo.email" class="hover:underline">{{ resume.personalInfo.email }}</a>
                <span *ngIf="resume.personalInfo.phone">| {{ resume.personalInfo.phone }}</span>
                <span *ngIf="resume.personalInfo.location">| {{ resume.personalInfo.location }}</span>
                <span *ngIf="resume.personalInfo.linkedin">| <a [href]="resume.personalInfo.linkedin" target="_blank" class="hover:underline">LinkedIn</a></span>
                <span *ngIf="resume.personalInfo.github">| <a [href]="resume.personalInfo.github" target="_blank" class="hover:underline">GitHub</a></span>
                <span *ngIf="resume.personalInfo.portfolio">| <a [href]="resume.personalInfo.portfolio" target="_blank" class="hover:underline">Portfolio</a></span>
             </div>
            </header>
            <div *ngIf="resume.summary" class="text-xs text-center max-w-lg mx-auto leading-relaxed text-slate-600">
                {{ resume.summary }}
            </div>
                <div *ngIf="resume.skills && resume.skills.length">
                    <h2 class="text-[10px] uppercase font-bold text-center tracking-[0.2em] mb-4 text-emerald-600">Skills</h2>
                    <div class="flex flex-wrap justify-center gap-4">
                        <span *ngFor="let s of resume.skills" class="text-[10px] font-medium text-slate-500">{{ s }}</span>
                    </div>
                </div>
                <div *ngIf="resume.education && resume.education.length" class="space-y-10">
                    <h2 class="text-[10px] uppercase font-bold text-center tracking-[0.2em] mb-8 text-emerald-600">Education</h2>
                    <div *ngFor="let edu of resume.education" class="grid grid-cols-4 gap-4">
                        <div class="text-[9px] font-bold text-slate-400 uppercase pt-1">{{ edu.startDate }}—{{ edu.endDate }}</div>
                        <div class="col-span-3">
                            <h3 class="text-xs font-bold mb-1">{{ edu.degree }}</h3>
                            <p class="text-[10px] italic text-slate-500">{{ edu.school }}</p>
                        </div>
                    </div>
                </div>
                <div *ngIf="resume.experience && resume.experience.length" class="space-y-10">
                    <h2 class="text-[10px] uppercase font-bold text-center tracking-[0.2em] mb-8 text-emerald-600">Experience</h2>
                    <div *ngFor="let job of resume.experience" class="grid grid-cols-4 gap-4">
                        <div class="text-[9px] font-bold text-emerald-600 uppercase pt-1">{{ job.startDate }}—{{ job.endDate }}</div>
                        <div class="col-span-3">
                            <h3 class="text-xs font-bold mb-1">{{ job.jobTitle }}</h3>
                            <p class="text-[10px] font-bold opacity-40 mb-3 italic">{{ job.company }}</p>
                            <div class="text-[10px] leading-relaxed text-slate-500" [innerHTML]="job.description"></div>
                        </div>
                    </div>
                </div>
                <div *ngIf="resume.projects && resume.projects.length" class="space-y-10">
                    <h2 class="text-[10px] uppercase font-bold text-center tracking-[0.2em] mb-8 text-emerald-600">Projects</h2>
                    <div *ngFor="let p of resume.projects" class="grid grid-cols-4 gap-4">
                        <div class="col-span-4 border-l-2 border-emerald-100 pl-4">
                            <h3 class="text-xs font-bold mb-1">{{ p.name }}</h3>
                            <p class="text-[10px] leading-relaxed text-slate-500">{{ p.description }}</p>
                        </div>
                    </div>
                </div>
                <div *ngIf="resume.languages && resume.languages.length">
                    <h2 class="text-[10px] uppercase font-bold text-center tracking-[0.2em] mb-4 text-emerald-600">Languages</h2>
                    <div class="flex justify-center gap-6">
                        <span *ngFor="let l of resume.languages" class="text-[10px] font-bold italic">{{ l }}</span>
                    </div>
                </div>
                <div *ngFor="let section of resume.customSections" class="space-y-10">
                    <h2 class="text-[10px] uppercase font-bold text-center tracking-[0.2em] mb-8 text-emerald-600">{{ section.title }}</h2>
                    <div *ngFor="let item of section.items" class="grid grid-cols-4 gap-4">
                        <div class="col-span-4 border-l-2 border-emerald-100 pl-4">
                            <h3 class="text-xs font-bold mb-1">{{ item.name }}</h3>
                            <p class="text-[10px] leading-relaxed text-slate-500">{{ item.description }}</p>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  `
})
export class Pro11EmeraldCleanComponent {
    @Input() resume: any;
    @Input() config: any;
}
