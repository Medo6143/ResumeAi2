import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-minimal-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full p-12 font-serif">
        <header class="text-center border-b pb-8 mb-8">
            <h1 class="text-4xl uppercase tracking-[0.2em] mb-2">{{ resume.personalInfo.fullName }}</h1>
            <p class="text-xs italic text-slate-500">{{ resume.personalInfo.jobTitle }}</p>

             <div class="flex flex-wrap justify-center gap-2 text-[10px] opacity-80 mt-2">
                <a [href]="'mailto:' + resume.personalInfo.email" class="hover:underline">{{ resume.personalInfo.email }}</a>
                <span *ngIf="resume.personalInfo.phone">| {{ resume.personalInfo.phone }}</span>
                <span *ngIf="resume.personalInfo.location">| {{ resume.personalInfo.location }}</span>
                <span *ngIf="resume.personalInfo.linkedin">| <a [href]="resume.personalInfo.linkedin" target="_blank" class="hover:underline">LinkedIn</a></span>
                <span *ngIf="resume.personalInfo.github">| <a [href]="resume.personalInfo.github" target="_blank" class="hover:underline">GitHub</a></span>
                <span *ngIf="resume.personalInfo.portfolio">| <a [href]="resume.personalInfo.portfolio" target="_blank" class="hover:underline">Portfolio</a></span>
             </div>
        </header>
            <section *ngIf="resume.summary" class="mb-8">
                <h3 class="text-xs font-bold uppercase border-b pb-1 mb-2">Summary</h3>
                <p class="text-[10px] italic leading-relaxed opacity-70">{{ resume.summary }}</p>
            </section>
            
            <section *ngIf="resume.experience && resume.experience.length" class="mb-6">
                <h3 class="text-xs font-bold uppercase border-b pb-1 mb-4">Experience</h3>
                <div class="space-y-4">
                    <div *ngFor="let job of resume.experience">
                        <div class="flex justify-between text-[10px] font-bold">
                            <span>{{ job.jobTitle }} <span class="opacity-60 font-normal">at {{ job.company }}</span></span>
                            <span class="opacity-40">{{ job.startDate }} - {{ job.current ? 'Present' : job.endDate }}</span>
                        </div>
                        <p class="text-[10px] mt-1 opacity-70 leading-relaxed">{{ job.description }}</p>
                    </div>
                </div>
            </section>

            <section *ngIf="resume.education && resume.education.length" class="mb-6">
                <h3 class="text-xs font-bold uppercase border-b pb-1 mb-4">Education</h3>
                <div class="space-y-4">
                    <div *ngFor="let edu of resume.education">
                        <div class="flex justify-between text-[10px] font-bold">
                            <span>{{ edu.degree }}</span>
                            <span class="opacity-40">{{ edu.startDate }} - {{ edu.endDate }}</span>
                        </div>
                        <p class="text-[10px] italic opacity-60">{{ edu.school }}</p>
                    </div>
                </div>
            </section>
            <div class="grid grid-cols-2 gap-8 mb-6">
                <section *ngIf="resume.skills && resume.skills.length">
                    <h3 class="text-xs font-bold uppercase border-b pb-1 mb-2">Skills</h3>
                    <div class="text-[10px] leading-relaxed opacity-60">
                        {{ resume.skills.join(', ') }}
                    </div>
                </section>
                <section *ngIf="resume.languages && resume.languages.length">
                    <h3 class="text-xs font-bold uppercase border-b pb-1 mb-2">Languages</h3>
                    <div class="text-[10px] leading-relaxed opacity-60">
                        {{ resume.languages.join(', ') }}
                    </div>
                </section>
            </div>
            <section *ngIf="resume.projects && resume.projects.length" class="mb-6">
                <h3 class="text-xs font-bold uppercase border-b pb-1 mb-4">Projects</h3>
                <div class="space-y-4">
                    <div *ngFor="let project of resume.projects">
                        <h4 class="text-[11px] font-bold">{{ project.name }}</h4>
                        <div class="flex gap-2 text-[9px] font-bold text-blue-600 mb-1">
                             <a *ngIf="project.link" [href]="project.link" target="_blank" class="hover:underline">Link</a>
                             <a *ngIf="project.githubLink" [href]="project.githubLink" target="_blank" class="hover:underline">GitHub</a>
                             <a *ngIf="project.demoLink" [href]="project.demoLink" target="_blank" class="hover:underline">Demo</a>
                        </div>
                        <p class="text-[10px] opacity-60">{{ project.description }}</p>
                    </div>
                </div>
            </section>
            <div *ngFor="let section of resume.customSections">
                <section *ngIf="section.items && section.items.length">
                    <h3 class="text-xs font-bold uppercase border-b pb-1 mb-4">{{ section.title }}</h3>
                    <div class="space-y-4">
                        <div *ngFor="let item of section.items">
                            <h4 class="text-[11px] font-bold">{{ item.name }}</h4>
                            <p class="text-[10px] opacity-60">{{ item.description }}</p>
                        </div>
                    </div>
                </section>
            </div>
    </div>
  `
})
export class MinimalComponent {
    @Input() resume: any;
    @Input() config: any;
}
