import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-ats-1-standard-serif-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full bg-white text-black font-serif min-h-[297mm] p-16 leading-relaxed">
        <!-- Header -->
        <header class="text-center mb-8 border-b-2 border-black pb-4">
            <h1 class="text-3xl font-bold uppercase mb-2">{{ resume.personalInfo.fullName }}</h1>
            <div class="flex flex-wrap justify-center gap-3 text-sm">
                <span *ngIf="resume.personalInfo.location">{{ resume.personalInfo.location }}</span>
                <span *ngIf="resume.personalInfo.phone">• {{ resume.personalInfo.phone }}</span>
                <span *ngIf="resume.personalInfo.email">• {{ resume.personalInfo.email }}</span>
            </div>
            <div class="flex flex-wrap justify-center gap-3 text-sm mt-1 font-bold">
                 <a *ngIf="resume.personalInfo.linkedin" [href]="resume.personalInfo.linkedin" target="_blank">LinkedIn</a>
                 <a *ngIf="resume.personalInfo.github" [href]="resume.personalInfo.github" target="_blank">• GitHub</a>
                 <a *ngIf="resume.personalInfo.portfolio" [href]="resume.personalInfo.portfolio" target="_blank">• Portfolio</a>
            </div>
        </header>

        <!-- Summary -->
        <section *ngIf="resume.summary" class="mb-6">
            <h3 class="text-lg font-bold uppercase border-b border-black mb-2">Profile</h3>
            <p class="text-sm text-justify">{{ resume.summary }}</p>
        </section>

        <!-- Experience -->
        <section *ngIf="resume.experience?.length" class="mb-6">
            <h3 class="text-lg font-bold uppercase border-b border-black mb-4">Experience</h3>
            <div class="space-y-4">
                <div *ngFor="let job of resume.experience">
                    <div class="flex justify-between items-baseline font-bold">
                        <span class="text-lg">{{ job.company }}</span>
                        <span class="text-sm text-right">{{ job.location || '' }}</span>
                    </div>
                    <div class="flex justify-between items-baseline mb-1">
                        <span class="italic font-bold">{{ job.jobTitle }}</span>
                        <span class="text-sm">{{ job.startDate }} - {{ job.current ? 'Present' : job.endDate }}</span>
                    </div>
                    <p class="text-sm mt-1">{{ job.description }}</p>
                </div>
            </div>
        </section>

        <!-- Projects -->
        <section *ngIf="resume.projects?.length" class="mb-6">
             <h3 class="text-lg font-bold uppercase border-b border-black mb-4">Projects</h3>
             <div class="space-y-3">
                 <div *ngFor="let p of resume.projects">
                     <div class="flex justify-between items-baseline font-bold">
                         <span>{{ p.name }}</span>
                         <div class="flex gap-2 text-xs uppercase">
                             <a *ngIf="p.link" [href]="p.link" target="_blank">[Link]</a>
                             <a *ngIf="p.githubLink" [href]="p.githubLink" target="_blank">[GitHub]</a>
                             <a *ngIf="p.demoLink" [href]="p.demoLink" target="_blank">[Demo]</a>
                         </div>
                     </div>
                     <p class="text-sm">{{ p.description }}</p>
                 </div>
             </div>
        </section>

        <!-- Education -->
        <section *ngIf="resume.education?.length" class="mb-6">
            <h3 class="text-lg font-bold uppercase border-b border-black mb-4">Education</h3>
            <div class="space-y-2">
                <div *ngFor="let edu of resume.education">
                     <div class="flex justify-between font-bold">
                         <span>{{ edu.school }}</span>
                         <span class="text-sm font-normal">{{ edu.startDate }} - {{ edu.endDate }}</span>
                     </div>
                     <div class="italic text-sm">{{ edu.degree }}</div>
                </div>
            </div>
        </section>

        <!-- Languages -->
        <section *ngIf="resume.languages?.length" class="mb-6">
            <h3 class="text-lg font-bold uppercase border-b border-black mb-2">Languages</h3>
            <p class="text-sm">{{ resume.languages.join(', ') }}</p>
        </section>

        <!-- Skills -->
        <section *ngIf="resume.skills?.length">
            <h3 class="text-lg font-bold uppercase border-b border-black mb-2">Skills</h3>
            <p class="text-sm">
                <ng-container *ngFor="let s of resume.skills; let last = last">
                    {{ s }}<span *ngIf="!last">, </span>
                </ng-container>
            </p>
        </section>
    </div>
    `
})
export class Ats1StandardSerifComponent {
    @Input() resume: any;
}
