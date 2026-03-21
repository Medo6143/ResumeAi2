import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-ats-3-compact-tech-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full bg-white text-black font-mono min-h-[297mm] p-10 text-xs leading-relaxed">
        <header class="border-b-2 border-black pb-4 mb-6">
            <h1 class="text-2xl font-bold mb-0.5">{{ resume.personalInfo.fullName }}</h1>
            <p class="font-bold text-gray-700 mb-1 uppercase text-[10px]" *ngIf="resume.personalInfo.jobTitle">{{ resume.personalInfo.jobTitle }}</p>
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
            <h2 class="font-bold uppercase border-b border-gray-400 mb-2">Skills</h2>
            <div class="flex flex-wrap gap-2">
                <span *ngFor="let s of resume.skills" class="bg-gray-100 px-1 border border-gray-300 rounded">{{ s }}</span>
            </div>
        </section>

        
            <section *ngIf="resume.summary" class="mb-4">
                <h2 class="font-bold uppercase border-b border-gray-400 mb-4">Profile</h2>
                <p class="text-sm opacity-80 whitespace-pre-line">{{ resume.summary }}</p>
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
                     <div class="flex justify-between items-baseline font-bold">
                         <span>{{ p.name }}</span>
                         <div class="flex gap-2 font-normal">
                             <a *ngIf="p.link" [href]="p.link" target="_blank" class="underline">-> code</a>
                             <a *ngIf="p.githubLink" [href]="p.githubLink" target="_blank" class="underline">-> github</a>
                             <a *ngIf="p.demoLink" [href]="p.demoLink" target="_blank" class="underline">-> demo</a>
                         </div>
                     </div>
                     <p>{{ p.description }}</p>
                 </div>
             </div>
        </section>

        <section *ngIf="resume.education?.length" class="mb-6">
            <h2 class="font-bold uppercase border-b border-gray-400 mb-3">Education</h2>
            <div *ngFor="let edu of resume.education" class="mb-2">
                <div class="flex justify-between">
                    <span class="font-bold">{{ edu.school }}</span>
                    <span>{{ edu.startDate }} - {{ edu.endDate }}</span>
                </div>
                <div>{{ edu.degree }}</div>
            </div>
        </section>

        <section *ngIf="resume.languages?.length" class="mb-6">
            <h2 class="font-bold uppercase border-b border-gray-400 mb-2">Languages</h2>
            <div class="flex gap-4">
                <span *ngFor="let l of resume.languages">{{ l }}</span>
            </div>
        </section>

        <!-- Custom Sections -->
        <div *ngFor="let section of resume.customSections">
            <section *ngIf="section.items && section.items.length" class="mb-6">
                <h2 class="font-bold uppercase border-b border-gray-400 mb-3">{{ section.title }}</h2>
                <div class="space-y-3">
                    <div *ngFor="let item of section.items">
                        <div class="font-bold">{{ item.name }}</div>
                        <p class="whitespace-pre-line">{{ item.description }}</p>
                    </div>
                </div>
            </section>
        </div>
    </div>
    `
})
export class Ats3CompactTechComponent {
    @Input() resume: any;
}
