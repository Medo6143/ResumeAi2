import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-photo-8-centered-minimal-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full bg-white font-sans min-h-[297mm] p-16 text-center">
        <!-- Centered Header -->
        <header class="mb-12 flex flex-col items-center">
             <div class="w-32 h-32 rounded-full overflow-hidden mb-6 ring-1 ring-slate-200 p-1">
                <img *ngIf="resume.personalInfo.photo" [src]="resume.personalInfo.photo" class="w-full h-full object-cover rounded-full">
                <div *ngIf="!resume.personalInfo.photo" class="w-full h-full rounded-full bg-slate-50 flex items-center justify-center text-xs text-slate-300">Photo</div>
            </div>
            
            <h1 class="text-3xl font-light tracking-wide text-slate-900 uppercase mb-2">{{ resume.personalInfo.fullName }}</h1>
            <div class="h-px w-20 bg-slate-300 my-4"></div>
            <p class="text-sm font-bold tracking-[0.2em] text-slate-500 uppercase mb-6">{{ resume.personalInfo.jobTitle }}</p>
            
            <div class="flex flex-wrap justify-center gap-6 text-xs text-slate-400">
                <span *ngIf="resume.personalInfo.email">{{ resume.personalInfo.email }}</span>
                <span *ngIf="resume.personalInfo.phone">{{ resume.personalInfo.phone }}</span>
                <span *ngIf="resume.personalInfo.location">{{ resume.personalInfo.location }}</span>
            </div>
            <div class="flex justify-center gap-6 mt-3 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <a *ngIf="resume.personalInfo.linkedin" [href]="resume.personalInfo.linkedin" target="_blank" class="hover:text-black transition">LinkedIn</a>
                <a *ngIf="resume.personalInfo.github" [href]="resume.personalInfo.github" target="_blank" class="hover:text-black transition">GitHub</a>
                <a *ngIf="resume.personalInfo.portfolio" [href]="resume.personalInfo.portfolio" target="_blank" class="hover:text-black transition">Portfolio</a>
            </div>
        </header>

        <!-- Content (Two Columns, but simple) -->
        <div class="grid grid-cols-2 gap-16 text-left">
            <!-- Left Side -->
            <div class="space-y-12">
                 <section *ngIf="resume.summary">
                    <h3 class="text-xs font-bold uppercase tracking-[0.15em] text-slate-900 mb-4 border-b border-black pb-1 inline-block">Profile</h3>
                    <p class="text-sm leading-7 text-slate-600 font-light">{{ resume.summary }}</p>
                 </section>

                 <section *ngIf="resume.experience?.length">
                    <h3 class="text-xs font-bold uppercase tracking-[0.15em] text-slate-900 mb-6 border-b border-black pb-1 inline-block">Experience</h3>
                    <div class="space-y-10">
                        <div *ngFor="let job of resume.experience">
                            <h4 class="font-bold text-slate-800 text-sm">{{ job.jobTitle }}</h4>
                            <div class="text-xs text-slate-500 uppercase tracking-wide mb-2 mt-1">{{ job.company }} <span class="mx-1">•</span> {{ job.startDate }} - {{ job.current ? 'Present' : job.endDate }}</div>
                            <p class="text-xs text-slate-600 leading-relaxed">{{ job.description }}</p>
                        </div>
                    </div>
                 </section>

                 <!-- Custom Sections -->
                 <div *ngFor="let section of resume.customSections">
                     <section *ngIf="section.items && section.items.length" class="mt-12">
                        <h3 class="text-xs font-bold uppercase tracking-[0.15em] text-slate-900 mb-6 border-b border-black pb-1 inline-block">{{ section.title }}</h3>
                        <div class="space-y-10">
                            <div *ngFor="let item of section.items">
                                <h4 class="font-bold text-slate-800 text-sm mb-1">{{ item.name }}</h4>
                                <p class="text-xs text-slate-600 leading-relaxed">{{ item.description }}</p>
                            </div>
                        </div>
                     </section>
                 </div>
            </div>

            <!-- Right Side -->
            <div class="space-y-12">
                <section *ngIf="resume.projects?.length">
                    <h3 class="text-xs font-bold uppercase tracking-[0.15em] text-slate-900 mb-6 border-b border-black pb-1 inline-block">Projects</h3>
                    <div class="space-y-6">
                        <div *ngFor="let p of resume.projects">
                            <div class="flex justify-between items-baseline mb-1">
                                <h4 class="font-bold text-slate-800 text-sm">{{ p.name }}</h4>
                                <div class="flex gap-2">
                                     <a *ngIf="p.link" [href]="p.link" target="_blank" class="text-[10px] uppercase font-bold text-slate-400 hover:text-black">Link</a>
                                     <a *ngIf="p.githubLink" [href]="p.githubLink" target="_blank" class="text-[10px] uppercase font-bold text-slate-400 hover:text-black">GitHub</a>
                                     <a *ngIf="p.demoLink" [href]="p.demoLink" target="_blank" class="text-[10px] uppercase font-bold text-slate-400 hover:text-black">Demo</a>
                                </div>
                            </div>
                            <p class="text-xs text-slate-600 mt-1">{{ p.description }}</p>
                        </div>
                    </div>
                </section>
                
                <section *ngIf="resume.skills?.length">
                    <h3 class="text-xs font-bold uppercase tracking-[0.15em] text-slate-900 mb-4 border-b border-black pb-1 inline-block">Skills</h3>
                    <div class="flex flex-wrap gap-x-4 gap-y-2">
                        <span *ngFor="let s of resume.skills" class="text-xs font-bold text-slate-600">{{ s }}</span>
                    </div>
                </section>

                <section *ngIf="resume.education?.length">
                    <h3 class="text-xs font-bold uppercase tracking-[0.15em] text-slate-900 mb-6 border-b border-black pb-1 inline-block">Education</h3>
                    <div class="space-y-4">
                        <div *ngFor="let edu of resume.education">
                            <div class="font-bold text-slate-800 text-sm">{{ edu.degree }}</div>
                            <div class="text-xs text-slate-500 mt-1">{{ edu.school }}</div>
                            <div class="text-[10px] text-slate-400 mt-0.5">{{ edu.startDate }} - {{ edu.endDate }}</div>
                        </div>
                    </div>
                </section>

                <section *ngIf="resume.languages?.length">
                    <h3 class="text-xs font-bold uppercase tracking-[0.15em] text-slate-900 mb-4 border-b border-black pb-1 inline-block">Languages</h3>
                    <div class="flex gap-4">
                        <span *ngFor="let l of resume.languages" class="text-xs text-slate-600 italic">{{ l }}</span>
                    </div>
                </section>
            </div>
        </div>
    </div>
    `
})
export class Photo8CenteredMinimalComponent {
    @Input() resume: any;
}
