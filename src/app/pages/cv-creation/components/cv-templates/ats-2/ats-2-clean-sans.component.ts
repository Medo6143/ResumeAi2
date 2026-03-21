import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-ats-2-clean-sans-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full bg-white text-slate-900 font-sans min-h-[297mm] p-12 text-sm">
        <header class="mb-6">
            <h1 class="text-3xl font-bold uppercase tracking-wide text-center mb-1">{{ resume.personalInfo.fullName }}</h1>
            <p class="text-center font-bold text-slate-700 mb-1" *ngIf="resume.personalInfo.jobTitle">{{ resume.personalInfo.jobTitle }}</p>
            <p class="text-center mb-2">{{ resume.personalInfo.location }} | {{ resume.personalInfo.phone }} | {{ resume.personalInfo.email }}</p>
             <div class="flex justify-center gap-4 text-xs font-bold underline">
                 <a *ngIf="resume.personalInfo.linkedin" [href]="resume.personalInfo.linkedin" target="_blank">LinkedIn</a>
                 <a *ngIf="resume.personalInfo.github" [href]="resume.personalInfo.github" target="_blank">GitHub</a>
                 <a *ngIf="resume.personalInfo.portfolio" [href]="resume.personalInfo.portfolio" target="_blank">Portfolio</a>
            </div>
        </header>

        <section *ngIf="resume.summary" class="mb-5">
             <h3 class="font-bold border-b border-slate-300 mb-2 uppercase text-xs tracking-wider">Profile</h3>
             <p>{{ resume.summary }}</p>
        </section>

        <section *ngIf="resume.skills?.length" class="mb-5">
             <h3 class="font-bold border-b border-slate-300 mb-2 uppercase text-xs tracking-wider">Skills</h3>
             <div class="flex flex-wrap gap-x-4">
                 <span *ngFor="let s of resume.skills">● {{ s }}</span>
             </div>
        </section>

        <section *ngIf="resume.experience?.length" class="mb-5">
             <h3 class="font-bold border-b border-slate-300 mb-3 uppercase text-xs tracking-wider">Experience</h3>
             <div class="space-y-4">
                 <div *ngFor="let job of resume.experience">
                     <div class="flex justify-between font-bold">
                         <span>{{ job.jobTitle }}</span>
                         <span>{{ job.startDate }} – {{ job.current ? 'Present' : job.endDate }}</span>
                     </div>
                     <div class="font-semibold italic mb-1">{{ job.company }}</div>
                     <p>{{ job.description }}</p>
                 </div>
             </div>
        </section>

        <section *ngIf="resume.projects?.length" class="mb-5">
             <h3 class="font-bold border-b border-slate-300 mb-3 uppercase text-xs tracking-wider">Projects</h3>
             <div class="space-y-3">
                 <div *ngFor="let p of resume.projects">
                     <div class="flex justify-between items-baseline font-bold">
                         <span>{{ p.name }}</span>
                         <div class="flex gap-2 font-normal text-xs text-blue-800">
                             <a *ngIf="p.link" [href]="p.link" target="_blank">[Link]</a>
                             <a *ngIf="p.githubLink" [href]="p.githubLink" target="_blank">[GitHub]</a>
                             <a *ngIf="p.demoLink" [href]="p.demoLink" target="_blank">[Demo]</a>
                         </div>
                     </div>
                     <p>{{ p.description }}</p>
                 </div>
             </div>
        </section>

        <section *ngIf="resume.education?.length" class="mb-5">
             <h3 class="font-bold border-b border-slate-300 mb-3 uppercase text-xs tracking-wider">Education</h3>
             <div *ngFor="let edu of resume.education" class="flex justify-between mb-1">
                 <div>
                     <div class="font-bold">{{ edu.school }}</div>
                     <div class="italic">{{ edu.degree }}</div>
                 </div>
                 <div class="font-bold text-xs">{{ edu.startDate }} – {{ edu.endDate }}</div>
             </div>
        </section>

        <section *ngIf="resume.languages?.length" class="mb-5">
             <h3 class="font-bold border-b border-slate-300 mb-2 uppercase text-xs tracking-wider">Languages</h3>
             <p>{{ resume.languages.join(', ') }}</p>
        </section>

        <!-- Custom Sections -->
        <div *ngFor="let section of resume.customSections">
            <section *ngIf="section.items && section.items.length" class="mb-5">
                <h3 class="font-bold border-b border-slate-300 mb-3 uppercase text-xs tracking-wider">{{ section.title }}</h3>
                <div class="space-y-3">
                    <div *ngFor="let item of section.items">
                        <div class="font-bold">{{ item.name }}</div>
                        <p>{{ item.description }}</p>
                    </div>
                </div>
            </section>
        </div>
    </div>
    `
})
export class Ats2CleanSansComponent {
    @Input() resume: any;
}
