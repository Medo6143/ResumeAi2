import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-ats-4-executive-simple-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full bg-white text-slate-800 font-sans min-h-[297mm] p-14 text-sm">
        <header class="flex justify-between items-start border-b-2 border-slate-800 pb-6 mb-8">
            <div>
                <h1 class="text-4xl font-bold text-slate-900 mb-2">{{ resume.personalInfo.fullName }}</h1>
                <p class="text-lg text-slate-600">{{ resume.personalInfo.jobTitle }}</p>
            </div>
            <div class="text-right text-xs leading-loose">
                <div>{{ resume.personalInfo.email }}</div>
                <div>{{ resume.personalInfo.phone }}</div>
                <div>{{ resume.personalInfo.location }}</div>
                <div class="flex gap-3 justify-end mt-1 text-blue-800 font-bold">
                     <a *ngIf="resume.personalInfo.linkedin" [href]="resume.personalInfo.linkedin" target="_blank">LinkedIn</a>
                     <a *ngIf="resume.personalInfo.github" [href]="resume.personalInfo.github" target="_blank">GitHub</a>
                     <a *ngIf="resume.personalInfo.portfolio" [href]="resume.personalInfo.portfolio" target="_blank">Portfolio</a>
                </div>
            </div>
        </header>

        <section *ngIf="resume.summary" class="mb-8">
            <h3 class="font-bold text-slate-900 uppercase tracking-widest text-xs mb-3">Executive Profile</h3>
            <p class="text-slate-700 leading-relaxed">{{ resume.summary }}</p>
        </section>

        <section *ngIf="resume.experience?.length" class="mb-8">
            <h3 class="font-bold text-slate-900 uppercase tracking-widest text-xs mb-6">Experience</h3>
            <div class="space-y-6">
                <div *ngFor="let job of resume.experience">
                    <div class="flex justify-between items-baseline mb-1">
                        <h4 class="font-bold text-lg text-slate-800">{{ job.jobTitle }}</h4>
                        <span class="text-sm font-bold text-slate-500">{{ job.startDate }} - {{ job.current ? 'Present' : job.endDate }}</span>
                    </div>
                    <div class="font-semibold text-slate-600 mb-2">{{ job.company }}</div>
                    <p class="text-slate-700 leading-relaxed">{{ job.description }}</p>
                </div>
            </div>
        </section>

        <section *ngIf="resume.projects?.length" class="mb-8">
            <h3 class="font-bold text-slate-900 uppercase tracking-widest text-xs mb-6">Projects</h3>
            <div class="space-y-6">
                <div *ngFor="let p of resume.projects">
                    <div class="flex justify-between items-baseline mb-1">
                        <h4 class="font-bold text-lg text-slate-800">{{ p.name }}</h4>
                        <div class="flex gap-3 text-xs font-bold text-blue-600">
                             <a *ngIf="p.link" [href]="p.link" target="_blank">Link</a>
                             <a *ngIf="p.githubLink" [href]="p.githubLink" target="_blank">GitHub</a>
                             <a *ngIf="p.demoLink" [href]="p.demoLink" target="_blank">Demo</a>
                        </div>
                    </div>
                    <p class="text-slate-700 leading-relaxed">{{ p.description }}</p>
                </div>
            </div>
        </section>

        <div class="grid grid-cols-2 gap-8 mb-8">
            <section *ngIf="resume.education?.length">
                <h3 class="font-bold text-slate-900 uppercase tracking-widest text-xs mb-4">Education</h3>
                <div *ngFor="let edu of resume.education" class="mb-4">
                    <div class="font-bold text-slate-800">{{ edu.degree }}</div>
                    <div class="text-slate-600">{{ edu.school }}</div>
                    <div class="text-xs text-slate-500">{{ edu.startDate }} - {{ edu.endDate }}</div>
                </div>
            </section>

            <section *ngIf="resume.skills?.length">
                <h3 class="font-bold text-slate-900 uppercase tracking-widest text-xs mb-4">Core Competencies</h3>
                <div class="flex flex-wrap gap-2">
                    <span *ngFor="let s of resume.skills" class="bg-slate-100 px-3 py-1 rounded text-xs font-bold text-slate-700">
                        {{ s }}
                    </span>
                </div>
            </section>
        </div>

        <section *ngIf="resume.languages?.length" class="mb-8">
            <h3 class="font-bold text-slate-900 uppercase tracking-widest text-xs mb-4">Languages</h3>
            <div class="flex flex-wrap gap-4 text-slate-700 font-medium">
                <span *ngFor="let l of resume.languages">• {{ l }}</span>
            </div>
        </section>

        <!-- Custom Sections -->
        <div *ngFor="let section of resume.customSections">
            <section *ngIf="section.items && section.items.length" class="mb-8">
                <h3 class="font-bold text-slate-900 uppercase tracking-widest text-xs mb-6">{{ section.title }}</h3>
                <div class="space-y-6">
                    <div *ngFor="let item of section.items">
                        <h4 class="font-bold text-lg text-slate-800 mb-1">{{ item.name }}</h4>
                        <p class="text-slate-700 leading-relaxed">{{ item.description }}</p>
                    </div>
                </div>
            </section>
        </div>
    </div>
    `
})
export class Ats4ExecutiveSimpleComponent {
    @Input() resume: any;
}
