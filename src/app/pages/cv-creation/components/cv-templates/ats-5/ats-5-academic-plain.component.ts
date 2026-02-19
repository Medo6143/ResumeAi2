import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-ats-5-academic-plain-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full bg-white text-black font-serif min-h-[297mm] p-16 text-sm">
        <header class="text-center mb-10">
            <h1 class="text-2xl font-bold uppercase mb-4">{{ resume.personalInfo.fullName }}</h1>
            <p>{{ resume.personalInfo.location }}</p>
            <p>{{ resume.personalInfo.phone }} • {{ resume.personalInfo.email }}</p>
            <div class="mt-2 text-xs">
                <a *ngIf="resume.personalInfo.linkedin" [href]="resume.personalInfo.linkedin" target="_blank" class="underline mx-2">LinkedIn</a>
                <a *ngIf="resume.personalInfo.github" [href]="resume.personalInfo.github" target="_blank" class="underline mx-2">GitHub</a>
                <a *ngIf="resume.personalInfo.portfolio" [href]="resume.personalInfo.portfolio" target="_blank" class="underline mx-2">Portfolio</a>
            </div>
        </header>

        <section *ngIf="resume.education?.length" class="mb-8">
            <h3 class="font-bold uppercase text-center border-b border-black mb-4 pb-1">Education</h3>
            <div class="space-y-4">
                <div *ngFor="let edu of resume.education">
                    <div class="flex justify-between font-bold">
                        <span>{{ edu.school }}</span>
                        <span>{{ edu.startDate }} - {{ edu.endDate }}</span>
                    </div>
                    <div>{{ edu.degree }}</div>
                </div>
            </div>
        </section>

        
            <section *ngIf="resume.summary" class="mb-4">
                <h3 class="font-bold uppercase text-center border-b border-black mb-4 pb-1">Profile</h3>
                <p class="text-sm opacity-80 whitespace-pre-line">{{ resume.summary }}</p>
            </section>
<section *ngIf="resume.experience?.length" class="mb-8">
            <h3 class="font-bold uppercase text-center border-b border-black mb-4 pb-1">Experience</h3>
            <div class="space-y-6">
                <div *ngFor="let job of resume.experience">
                    <div class="flex justify-between font-bold">
                        <span>{{ job.company }}</span>
                        <span>{{ job.location || '' }}</span>
                    </div>
                    <div class="flex justify-between italic mb-2">
                        <span>{{ job.jobTitle }}</span>
                        <span>{{ job.startDate }} - {{ job.current ? 'Present' : job.endDate }}</span>
                    </div>
                    <ul class="list-disc pl-5 space-y-1">
                        <li *ngFor="let line of job.description.split('. ')">{{ line }}</li>
                    </ul>
                </div>
            </div>
        </section>

        <section *ngIf="resume.projects?.length" class="mb-8">
            <h3 class="font-bold uppercase text-center border-b border-black mb-4 pb-1">Projects</h3>
            <div class="space-y-4">
                <div *ngFor="let p of resume.projects">
                    <div class="font-bold">{{ p.name }}</div>
                    <p>{{ p.description }}</p>
                    <a *ngIf="p.link" [href]="p.link" target="_blank" class="text-xs underline block mt-1">Project Link</a>
                </div>
            </div>
        </section>

        <section *ngIf="resume.skills?.length">
            <h3 class="font-bold uppercase text-center border-b border-black mb-4 pb-1">Skills</h3>
            <div class="text-center">
                {{ resume.skills.join(' • ') }}
            </div>
        </section>
    </div>
    `
})
export class Ats5AcademicPlainComponent {
    @Input() resume: any;
}
