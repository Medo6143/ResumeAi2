import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-photo-2-classic-square-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full bg-white text-slate-900 font-serif min-h-[297mm] p-12 border-t-8 border-emerald-700">
        <!-- Header -->
        <header class="flex gap-8 border-b-2 border-slate-100 pb-8 mb-8 items-start">
            <div class="w-32 h-32 flex-shrink-0 bg-slate-100 border border-slate-200 shadow-inner">
                <img *ngIf="resume.personalInfo.photo" [src]="resume.personalInfo.photo" class="w-full h-full object-cover filter grayscale contrast-125">
                <div *ngIf="!resume.personalInfo.photo" class="w-full h-full flex items-center justify-center text-xs text-slate-400 italic">Photo</div>
            </div>
            <div class="flex-1 pt-2">
                <h1 class="text-4xl font-bold text-slate-900 tracking-tight">{{ resume.personalInfo.fullName }}</h1>
                <p class="text-emerald-700 font-bold uppercase tracking-widest text-sm mt-2">{{ resume.personalInfo.jobTitle }}</p>
                
                <div class="flex flex-wrap gap-x-6 gap-y-2 text-xs font-sans text-slate-500 mt-4">
                    <span *ngIf="resume.personalInfo.email" class="flex items-center gap-1">✉️ <a [href]="'mailto:' + resume.personalInfo.email" class="hover:underline">{{ resume.personalInfo.email }}</a></span>
                    <span *ngIf="resume.personalInfo.phone" class="flex items-center gap-1">📞 {{ resume.personalInfo.phone }}</span>
                    <span *ngIf="resume.personalInfo.location" class="flex items-center gap-1">📍 {{ resume.personalInfo.location }}</span>
                    <span *ngIf="resume.personalInfo.linkedin" class="flex items-center gap-1">🔗 <a [href]="resume.personalInfo.linkedin" target="_blank" class="hover:underline">LinkedIn</a></span>
                    <span *ngIf="resume.personalInfo.github" class="flex items-center gap-1">💻 <a [href]="resume.personalInfo.github" target="_blank" class="hover:underline">GitHub</a></span>
                    <span *ngIf="resume.personalInfo.portfolio" class="flex items-center gap-1">🎨 <a [href]="resume.personalInfo.portfolio" target="_blank" class="hover:underline">Portfolio</a></span>
                </div>
            </div>
        </header>

        <div class="grid grid-cols-12 gap-10">
            <!-- Left Column: Main content -->
            <div class="col-span-8 space-y-8">
                <!-- Summary -->
                <section *ngIf="resume.summary">
                    <h3 class="text-xs font-sans font-bold uppercase text-slate-400 mb-3 tracking-widest">Profile</h3>
                    <p class="text-sm leading-relaxed text-slate-700">{{ resume.summary }}</p>
                </section>

                <!-- Experience -->
                <section *ngIf="resume.experience?.length">
                    <h3 class="text-xs font-sans font-bold uppercase text-slate-400 mb-4 tracking-widest flex items-center gap-2">
                        Work History <div class="flex-1 h-px bg-slate-200"></div>
                    </h3>
                    <div class="space-y-6">
                        <div *ngFor="let job of resume.experience">
                            <div class="flex justify-between items-baseline mb-1">
                                <h4 class="font-bold text-lg text-slate-800">{{ job.jobTitle }}</h4>
                                <span class="text-xs font-sans text-slate-500 font-medium">{{ job.startDate }} - {{ job.current ? 'Present' : job.endDate }}</span>
                            </div>
                            <p class="text-sm font-bold text-emerald-700 mb-2">{{ job.company }}</p>
                            <p class="text-sm text-slate-600 leading-relaxed">{{ job.description }}</p>
                        </div>
                    </div>
                </section>

                 <!-- Projects -->
                 <section *ngIf="resume.projects?.length">
                    <h3 class="text-xs font-sans font-bold uppercase text-slate-400 mb-4 tracking-widest flex items-center gap-2">
                        Key Projects <div class="flex-1 h-px bg-slate-200"></div>
                    </h3>
                    <div class="space-y-4">
                        <div *ngFor="let p of resume.projects">
                            <h4 class="font-bold text-slate-800">{{ p.name }}</h4>
                            <div class="flex gap-2 text-[10px] font-bold text-emerald-600 mb-1">
                                 <a *ngIf="p.link" [href]="p.link" target="_blank" class="hover:underline">Link</a>
                                 <a *ngIf="p.githubLink" [href]="p.githubLink" target="_blank" class="hover:underline">GitHub</a>
                                 <a *ngIf="p.demoLink" [href]="p.demoLink" target="_blank" class="hover:underline">Demo</a>
                            </div>
                            <p class="text-sm text-slate-600 mt-1">{{ p.description }}</p>
                        </div>
                    </div>
                </section>
            </div>

            <!-- Right Column: Sidebar -->
            <div class="col-span-4 space-y-8 border-l border-slate-100 pl-8">
                <!-- Skills -->
                <section *ngIf="resume.skills?.length">
                    <h3 class="text-xs font-sans font-bold uppercase text-slate-400 mb-3 tracking-widest">Expertise</h3>
                    <div class="flex flex-col gap-2">
                        <div *ngFor="let s of resume.skills" class="text-sm text-slate-700 flex items-center gap-2">
                            <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> {{ s }}
                        </div>
                    </div>
                </section>

                <!-- Education -->
                <section *ngIf="resume.education?.length">
                    <h3 class="text-xs font-sans font-bold uppercase text-slate-400 mb-3 tracking-widest">Education</h3>
                    <div class="space-y-4">
                        <div *ngFor="let edu of resume.education">
                            <div class="font-bold text-slate-800 text-sm leading-tight mb-1">{{ edu.degree }}</div>
                            <div class="text-xs text-emerald-700 mb-1">{{ edu.school }}</div>
                            <div class="text-[10px] font-sans text-slate-400">{{ edu.startDate }} - {{ edu.endDate }}</div>
                        </div>
                    </div>
                </section>

                 <!-- Languages -->
                 <section *ngIf="resume.languages?.length">
                    <h3 class="text-xs font-sans font-bold uppercase text-slate-400 mb-3 tracking-widest">Languages</h3>
                    <div class="flex flex-col gap-1 text-sm text-slate-600">
                        <span *ngFor="let l of resume.languages" class="italic">{{ l }}</span>
                    </div>
                </section>
            </div>
        </div>
    </div>
    `
})
export class Photo2ClassicSquareComponent {
    @Input() resume: any;
}
