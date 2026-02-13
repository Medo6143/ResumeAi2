import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-ats-3-compact-tech-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full bg-white text-black font-mono min-h-[297mm] p-10 text-xs leading-relaxed">
        <header class="border-b-2 border-black pb-4 mb-6">
            <h1 class="text-2xl font-bold mb-1">{{ resume.personalInfo.fullName }}</h1>
            <div class="flex flex-col gap-1">
                <div>{{ resume.personalInfo.email }} | {{ resume.personalInfo.phone }} | {{ resume.personalInfo.location }}</div>
                <div class="flex gap-4 font-bold">
                    <a *ngIf="resume.personalInfo.linkedin" [href]="resume.personalInfo.linkedin" target="_blank">[ LinkedIn ]</a>
                    <a *ngIf="resume.personalInfo.github" [href]="resume.personalInfo.github" target="_blank">[ GitHub ]</a>
                    <a *ngIf="resume.personalInfo.portfolio" [href]="resume.personalInfo.portfolio" target="_blank">[ Portfolio ]</a>
                </div>
            </div>
        </header>

        <section *ngIf="resume.skills?.length" class="mb-6">
            <h2 class="font-bold uppercase border-b border-gray-400 mb-2">Technical Skills</h2>
            <div class="flex flex-wrap gap-2">
                <span *ngFor="let s of resume.skills" class="bg-gray-100 px-1 border border-gray-300 rounded">{{ s }}</span>
            </div>
        </section>

        <section *ngIf="resume.experience?.length" class="mb-6">
            <h2 class="font-bold uppercase border-b border-gray-400 mb-4">Experience</h2>
            <div class="space-y-4">
                <div *ngFor="let job of resume.experience">
                    <div class="flex justify-between items-baseline">
                        <span class="font-bold text-sm">{{ job.jobTitle }}</span>
                        <span class="font-bold">{{ job.startDate }} - {{ job.current ? 'Present' : job.endDate }}</span>
                    </div>
                    <div class="mb-1 font-bold">{{ job.company }}</div>
                    <p class="whitespace-pre-line">{{ job.description }}</p>
                </div>
            </div>
        </section>

        <section *ngIf="resume.projects?.length" class="mb-6">
             <h2 class="font-bold uppercase border-b border-gray-400 mb-3">Projects</h2>
             <div class="space-y-3">
                 <div *ngFor="let p of resume.projects">
                     <div class="font-bold">{{ p.name }} <a *ngIf="p.link" [href]="p.link" target="_blank" class="font-normal underline ml-1">-> code</a></div>
                     <p>{{ p.description }}</p>
                 </div>
             </div>
        </section>

        <section *ngIf="resume.education?.length">
            <h2 class="font-bold uppercase border-b border-gray-400 mb-3">Education</h2>
            <div *ngFor="let edu of resume.education" class="mb-2">
                <div class="flex justify-between">
                    <span class="font-bold">{{ edu.school }}</span>
                    <span>{{ edu.startDate }} - {{ edu.endDate }}</span>
                </div>
                <div>{{ edu.degree }}</div>
            </div>
        </section>
    </div>
    `
})
export class Ats3CompactTechComponent {
    @Input() resume: any;
}
