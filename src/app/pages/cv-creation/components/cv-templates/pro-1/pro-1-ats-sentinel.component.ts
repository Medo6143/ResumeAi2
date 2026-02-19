import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pro1-ats-sentinel-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full p-12 text-slate-900 leading-tight">
        <div class="border-b-2 border-slate-900 pb-4 mb-4">
            <h1 class="text-2xl font-bold">{{ resume.personalInfo.fullName }}</h1>
            <p class="text-xs font-bold uppercase text-slate-600">{{ resume.personalInfo.jobTitle }}</p>
            <p class="text-[10px] mt-2"><!-- Email & Links --> 
          <a [href]="'mailto:' + resume.personalInfo.email" class="hover:underline">{{ resume.personalInfo.email }}</a>
          <span *ngIf="resume.personalInfo.linkedin"> | <a [href]="resume.personalInfo.linkedin" target="_blank" class="hover:underline">LinkedIn</a></span>
          <span *ngIf="resume.personalInfo.github"> | <a [href]="resume.personalInfo.github" target="_blank" class="hover:underline">GitHub</a></span>
          <span *ngIf="resume.personalInfo.portfolio"> | <a [href]="resume.personalInfo.portfolio" target="_blank" class="hover:underline">Portfolio</a></span>
           <!-- End Links --> | {{ resume.personalInfo.phone }} | {{ resume.personalInfo.location }}</p>
        </div>
        <div class="space-y-4">
            <section *ngIf="resume.summary">
                <h2 class="text-[12px] font-bold border-b mb-1 pb-0.5 uppercase">Profile</h2>
                <p class="text-[10px]">{{ resume.summary }}</p>
            </section>
            <section *ngIf="resume.skills && resume.skills.length">
                <h2 class="text-[12px] font-bold border-b mb-2 pb-0.5 uppercase">Core Competencies</h2>
                <p class="text-[10px]">{{ resume.skills.join(' • ') }}</p>
            </section>
            <section *ngIf="resume.education && resume.education.length">
                <h2 class="text-[12px] font-bold border-b mb-2 pb-0.5 uppercase">Education</h2>
                <div *ngFor="let edu of resume.education" class="mb-2">
                    <div class="flex justify-between font-bold text-[10px]">
                        <span>{{ edu.degree }}</span>
                        <span>{{ edu.startDate }} - {{ edu.endDate }}</span>
                    </div>
                    <div class="text-[10px] opacity-70">{{ edu.school }}</div>
                </div>
            </section>
            <section *ngIf="resume.languages && resume.languages.length">
                <h2 class="text-[12px] font-bold border-b mb-2 pb-0.5 uppercase">Languages</h2>
                <p class="text-[10px]">{{ resume.languages.join(' | ') }}</p>
            </section>
            <section *ngIf="resume.experience && resume.experience.length">
                <h2 class="text-[12px] font-bold border-b mb-2 pb-0.5 uppercase">Experience</h2>
                <div *ngFor="let job of resume.experience" class="mb-3">
                    <div class="flex justify-between font-bold text-[10px]">
                        <span>{{ job.company }}</span>
                        <span>{{ job.startDate }} - {{ job.endDate }}</span>
                    </div>
                    <div class="italic text-[10px]">{{ job.jobTitle }}</div>
                    <div class="text-[10px] mt-0.5" [innerHTML]="job.description"></div>
                </div>
            </section>
            <section *ngIf="resume.projects && resume.projects.length">
                <h2 class="text-[12px] font-bold border-b mb-2 pb-0.5 uppercase">Projects</h2>
                <div *ngFor="let p of resume.projects" class="mb-2">
                    <div class="font-bold text-[10px]">{{ p.name }}</div>
                    <div class="text-[10px] mt-0.5 opacity-80">{{ p.description }}</div>
                </div>
            </section>
            <div *ngFor="let section of resume.customSections">
                <section *ngIf="section.items && section.items.length">
                    <h2 class="text-[12px] font-bold border-b mb-2 pb-0.5 uppercase">{{ section.title }}</h2>
                    <div *ngFor="let item of section.items" class="mb-2">
                        <div class="font-bold text-[10px]">{{ item.name }}</div>
                        <div class="text-[10px] mt-0.5 opacity-80">{{ item.description }}</div>
                    </div>
                </section>
            </div>
        </div>
    </div>
  `
})
export class Pro1AtsSentinelComponent {
    @Input() resume: any;
    @Input() config: any;
}
