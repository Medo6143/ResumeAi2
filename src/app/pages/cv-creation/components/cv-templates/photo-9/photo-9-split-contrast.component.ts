import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-photo-9-split-contrast-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full bg-slate-900 text-white font-sans min-h-[297mm] flex">
        <!-- Left (Dark) -->
        <div class="w-1/3 p-8 flex flex-col h-full border-r border-slate-800">
             <div class="w-full aspect-square bg-slate-800 rounded-lg overflow-hidden mb-8 shadow-2xl border border-slate-700">
                <img *ngIf="resume.personalInfo.photo" [src]="resume.personalInfo.photo" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500">
                <div *ngIf="!resume.personalInfo.photo" class="w-full h-full flex items-center justify-center text-xs text-slate-600">No Photo</div>
             </div>

             <section class="mb-10">
                <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Contact</h3>
                <div class="space-y-3 text-sm font-medium text-slate-300">
                    <div *ngIf="resume.personalInfo.email" class="break-words">{{ resume.personalInfo.email }}</div>
                    <div *ngIf="resume.personalInfo.phone">{{ resume.personalInfo.phone }}</div>
                    <div *ngIf="resume.personalInfo.location">{{ resume.personalInfo.location }}</div>
                    <div class="flex flex-col gap-2 pt-2">
                        <a *ngIf="resume.personalInfo.linkedin" [href]="resume.personalInfo.linkedin" target="_blank" class="text-indigo-400 hover:text-indigo-300">LinkedIn</a>
                        <a *ngIf="resume.personalInfo.github" [href]="resume.personalInfo.github" target="_blank" class="text-indigo-400 hover:text-indigo-300">GitHub</a>
                        <a *ngIf="resume.personalInfo.portfolio" [href]="resume.personalInfo.portfolio" target="_blank" class="text-indigo-400 hover:text-indigo-300">Portfolio</a>
                    </div>
                </div>
             </section>

             <section class="mb-10">
                <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Skills</h3>
                <div class="flex flex-wrap gap-2">
                    <span *ngFor="let s of resume.skills" class="bg-slate-800 text-indigo-300 px-2 py-1 rounded text-xs border border-slate-700">
                        {{ s }}
                    </span>
                </div>
             </section>

             <section>
                <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Languages</h3>
                <div class="space-y-1 text-sm text-slate-400">
                    <div *ngFor="let l of resume.languages">{{ l }}</div>
                </div>
             </section>
        </div>

        <!-- Right (Light) -->
        <div class="w-2/3 bg-slate-50 p-12 text-slate-900">
            <header class="mb-12 border-b-4 border-slate-900 pb-8">
                <h1 class="text-5xl font-black mb-2 uppercase tracking-tight">{{ resume.personalInfo.fullName }}</h1>
                <p class="text-xl font-bold bg-slate-900 text-white inline-block px-2 py-1 transform -rotate-1">{{ resume.personalInfo.jobTitle }}</p>
                <p class="mt-6 text-slate-600 leading-relaxed font-medium max-w-lg">{{ resume.summary }}</p>
            </header>

            <section *ngIf="resume.experience?.length" class="mb-12">
                <h3 class="text-2xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
                    Experience <span class="flex-1 h-2 bg-slate-200"></span>
                </h3>
                <div class="space-y-8">
                    <div *ngFor="let job of resume.experience">
                        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                            <h4 class="text-xl font-bold">{{ job.jobTitle }}</h4>
                            <span class="text-sm font-bold bg-slate-200 px-2 py-1 rounded">{{ job.startDate }} — {{ job.current ? 'Present' : job.endDate }}</span>
                        </div>
                        <div class="text-indigo-700 font-bold uppercase text-sm mb-3 tracking-wide">{{ job.company }}</div>
                        <p class="text-slate-600 leading-relaxed">{{ job.description }}</p>
                    </div>
                </div>
            </section>

            <section *ngIf="resume.projects?.length" class="mb-12">
                <h3 class="text-2xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
                    Projects <span class="flex-1 h-2 bg-slate-200"></span>
                </h3>
                <div class="grid gap-6">
                    <div *ngFor="let p of resume.projects" class="border p-4 bg-white rounded shadow-sm">
                        <div class="flex flex-wrap justify-between items-center gap-2 mb-2">
                            <h4 class="font-bold text-lg">{{ p.name }}</h4>
                            <div class="flex gap-2">
                                <a *ngIf="p.link" [href]="p.link" target="_blank" class="text-xs bg-slate-900 text-white px-2 py-1 rounded font-bold hover:bg-indigo-600 transition">VIEW</a>
                                <a *ngIf="p.githubLink" [href]="p.githubLink" target="_blank" class="text-xs bg-slate-700 text-white px-2 py-1 rounded font-bold hover:bg-indigo-600 transition">GITHUB</a>
                                <a *ngIf="p.demoLink" [href]="p.demoLink" target="_blank" class="text-xs bg-indigo-600 text-white px-2 py-1 rounded font-bold hover:bg-indigo-500 transition">DEMO</a>
                            </div>
                        </div>
                        <p class="text-sm text-slate-600">{{ p.description }}</p>
                    </div>
                </div>
            </section>

            <section *ngIf="resume.education?.length">
                <h3 class="text-2xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
                    Education <span class="flex-1 h-2 bg-slate-200"></span>
                </h3>
                <div class="space-y-4">
                    <div *ngFor="let edu of resume.education">
                        <div class="font-bold text-lg text-slate-800">{{ edu.degree }}</div>
                        <div class="text-sm font-bold text-slate-400 uppercase">{{ edu.school }}</div>
                        <div class="text-xs text-slate-500 mt-1">{{ edu.startDate }} - {{ edu.endDate }}</div>
                    </div>
                </div>
            </section>
        </div>
    </div>
    `
})
export class Photo9SplitContrastComponent {
    @Input() resume: any;
}
