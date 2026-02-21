import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-photo-6-bold-header-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full bg-white font-sans min-h-[297mm] flex flex-col">
        <!-- Header -->
        <header class="bg-indigo-900 text-white p-12 flex items-center justify-between">
            <div class="flex items-center gap-8">
                <div class="w-32 h-32 rounded-full border-4 border-indigo-200 overflow-hidden shadow-lg bg-indigo-800 shrink-0">
                    <img *ngIf="resume.personalInfo.photo" [src]="resume.personalInfo.photo" class="w-full h-full object-cover">
                    <div *ngIf="!resume.personalInfo.photo" class="w-full h-full flex items-center justify-center text-xs opacity-50">Photo</div>
                </div>
                <div>
                    <h1 class="text-4xl font-bold tracking-tight mb-2">{{ resume.personalInfo.fullName }}</h1>
                    <p class="text-indigo-200 uppercase tracking-widest font-bold text-sm">{{ resume.personalInfo.jobTitle }}</p>
                    <div class="flex flex-wrap gap-4 mt-4 text-xs font-medium text-indigo-100">
                         <a *ngIf="resume.personalInfo.email" [href]="'mailto:' + resume.personalInfo.email" class="hover:text-white transition">✉️ {{ resume.personalInfo.email }}</a>
                         <span *ngIf="resume.personalInfo.phone">📱 {{ resume.personalInfo.phone }}</span>
                         <span *ngIf="resume.personalInfo.location">📍 {{ resume.personalInfo.location }}</span>
                    </div>
                    <div class="flex gap-4 mt-2 text-xs font-bold text-white">
                         <a *ngIf="resume.personalInfo.linkedin" [href]="resume.personalInfo.linkedin" target="_blank" class="hover:underline">LinkedIn ↗</a>
                         <a *ngIf="resume.personalInfo.github" [href]="resume.personalInfo.github" target="_blank" class="hover:underline">GitHub ↗</a>
                         <a *ngIf="resume.personalInfo.portfolio" [href]="resume.personalInfo.portfolio" target="_blank" class="hover:underline">Portfolio ↗</a>
                    </div>
                </div>
            </div>
        </header>

        <div class="flex-1 p-12 grid grid-cols-12 gap-12">
            <!-- Left Column -->
            <div class="col-span-8 space-y-10">
                <section *ngIf="resume.summary">
                    <h3 class="text-indigo-900 font-bold uppercase tracking-widest border-b-2 border-indigo-100 pb-2 mb-4">Profile</h3>
                    <p class="text-slate-600 leading-relaxed text-sm">{{ resume.summary }}</p>
                </section>

                <section *ngIf="resume.experience?.length">
                    <h3 class="text-indigo-900 font-bold uppercase tracking-widest border-b-2 border-indigo-100 pb-2 mb-6">Experience</h3>
                    <div class="space-y-8">
                        <div *ngFor="let job of resume.experience">
                            <div class="flex justify-between items-baseline mb-1">
                                <h4 class="font-bold text-slate-900 text-lg">{{ job.jobTitle }}</h4>
                                <span class="text-xs font-bold text-slate-400 uppercase">{{ job.startDate }} - {{ job.current ? 'Present' : job.endDate }}</span>
                            </div>
                            <div class="text-indigo-600 font-medium text-sm mb-2">{{ job.company }}</div>
                            <p class="text-sm text-slate-600 leading-relaxed">{{ job.description }}</p>
                        </div>
                    </div>
                </section>

                <section *ngIf="resume.projects?.length">
                    <h3 class="text-indigo-900 font-bold uppercase tracking-widest border-b-2 border-indigo-100 pb-2 mb-6">Projects</h3>
                    <div class="grid gap-4">
                        <div *ngFor="let p of resume.projects" class="bg-indigo-50 p-4 rounded-lg">
                            <div class="flex justify-between items-center mb-1">
                                <h4 class="font-bold text-indigo-900">{{ p.name }}</h4>
                                <div class="flex gap-2">
                                    <a *ngIf="p.link" [href]="p.link" target="_blank" class="text-[10px] text-indigo-600 font-bold hover:underline">View ↗</a>
                                    <a *ngIf="p.githubLink" [href]="p.githubLink" target="_blank" class="text-[10px] text-indigo-600 font-bold hover:underline">GitHub</a>
                                    <a *ngIf="p.demoLink" [href]="p.demoLink" target="_blank" class="text-[10px] text-indigo-600 font-bold hover:underline">Demo</a>
                                </div>
                            </div>
                            <p class="text-xs text-slate-600 mt-1">{{ p.description }}</p>
                        </div>
                    </div>
                </section>
            </div>

            <!-- Right Column -->
            <div class="col-span-4 space-y-10">
                <section *ngIf="resume.skills?.length">
                    <h3 class="text-indigo-900 font-bold uppercase tracking-widest border-b-2 border-indigo-100 pb-2 mb-4">Skills</h3>
                    <div class="flex flex-wrap gap-2">
                        <span *ngFor="let s of resume.skills" class="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full">
                            {{ s }}
                        </span>
                    </div>
                </section>

                <section *ngIf="resume.education?.length">
                    <h3 class="text-indigo-900 font-bold uppercase tracking-widest border-b-2 border-indigo-100 pb-2 mb-4">Education</h3>
                    <div class="space-y-4">
                        <div *ngFor="let edu of resume.education">
                            <div class="font-bold text-slate-900 text-sm">{{ edu.degree }}</div>
                            <div class="text-xs text-indigo-600">{{ edu.school }}</div>
                            <div class="text-[10px] text-slate-400 mt-1 uppercase">{{ edu.startDate }} - {{ edu.endDate }}</div>
                        </div>
                    </div>
                </section>

                <section *ngIf="resume.languages?.length">
                    <h3 class="text-indigo-900 font-bold uppercase tracking-widest border-b-2 border-indigo-100 pb-2 mb-4">Languages</h3>
                    <ul class="space-y-1">
                        <li *ngFor="let l of resume.languages" class="text-sm text-slate-600 font-medium">• {{ l }}</li>
                    </ul>
                </section>
            </div>
        </div>
    </div>
    `
})
export class Photo6BoldHeaderComponent {
    @Input() resume: any;
}
