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
            <p class="text-[10px] mt-2">{{ resume.personalInfo.email }} | {{ resume.personalInfo.phone }} | {{ resume.personalInfo.location }}</p>
        </div>
        <div class="space-y-4">
            <section *ngIf="resume.summary">
                <h2 class="text-[12px] font-bold border-b mb-1 pb-0.5 uppercase">Professional Summary</h2>
                <p class="text-[10px]">{{ resume.summary }}</p>
            </section>
            <section>
                <h2 class="text-[12px] font-bold border-b mb-2 pb-0.5 uppercase">Core Competencies</h2>
                <p class="text-[10px]">{{ resume.skills.join(' • ') }}</p>
            </section>
            <section>
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
        </div>
    </div>
  `
})
export class Pro1AtsSentinelComponent {
    @Input() resume: any;
    @Input() config: any;
}
