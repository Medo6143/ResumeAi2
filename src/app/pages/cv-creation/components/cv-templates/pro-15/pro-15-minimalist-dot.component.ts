import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pro15-minimalist-dot-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full p-12 flex flex-col items-center font-sans">
        <div class="flex flex-col items-center mb-16">
            <div class="w-3 h-3 bg-slate-200 rounded-full mb-8"></div>
            <h1 class="text-2xl font-black uppercase tracking-[0.5em] mb-2">{{ resume.personalInfo.fullName }}</h1>
            <p class="text-[10px] font-bold opacity-30 tracking-[0.3em] uppercase">{{ resume.personalInfo.jobTitle }}</p>
            <div *ngIf="resume.summary" class="mt-8 text-center max-w-md text-xs font-medium opacity-60 leading-relaxed">
                {{ resume.summary }}
            </div>
        </div>
        <div class="w-full max-w-lg space-y-12">
            <div *ngFor="let job of resume.experience" class="flex gap-8">
                <div class="w-32 shrink-0 text-right">
                    <p class="text-[9px] font-black opacity-20 uppercase">{{ job.startDate }}</p>
                </div>
                <div class="flex-1 space-y-2">
                    <h4 class="text-sm font-black italic">{{ job.jobTitle }}</h4>
                    <p class="text-[10px] font-bold" [style.color]="config.primaryColor">{{ job.company }}</p>
                    <div class="text-[10px] opacity-50 leading-relaxed" [innerHTML]="job.description"></div>
                </div>
            </div>
        </div>
    </div>
  `
})
export class Pro15MinimalistDotComponent {
    @Input() resume: any;
    @Input() config: any;
}
