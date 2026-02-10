import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-minimal-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full p-12 font-serif">
        <header class="text-center border-b pb-8 mb-8">
            <h1 class="text-4xl uppercase tracking-[0.2em] mb-2">{{ resume.personalInfo.fullName }}</h1>
            <p class="text-xs italic text-slate-500">{{ resume.personalInfo.jobTitle }}</p>
        </header>
        <div class="space-y-8">
            <section *ngIf="resume.summary">
                <p class="text-[11px] leading-relaxed text-center italic">{{ resume.summary }}</p>
            </section>
            <section>
                <div class="space-y-6">
                    <div *ngFor="let job of resume.experience">
                        <div class="flex justify-between font-sans text-[10px] uppercase font-bold text-slate-400">
                            <span>{{ job.company }}</span>
                            <span>{{ job.startDate }}-{{ job.endDate }}</span>
                        </div>
                        <h4 class="text-sm font-bold my-1">{{ job.jobTitle }}</h4>
                        <div class="text-[11px] leading-relaxed" [innerHTML]="job.description"></div>
                    </div>
                </div>
            </section>
        </div>
    </div>
  `
})
export class MinimalComponent {
    @Input() resume: any;
    @Input() config: any;
}
