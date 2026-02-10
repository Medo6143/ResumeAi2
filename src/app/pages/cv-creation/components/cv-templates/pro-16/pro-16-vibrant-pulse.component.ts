import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from '../shared/experience/experience.component';

@Component({
    selector: 'app-pro16-vibrant-pulse-template',
    standalone: true,
    imports: [CommonModule, ExperienceComponent],
    template: `
    <div class="h-full flex flex-col font-sans overflow-hidden">
        <div class="h-64 bg-slate-900 relative p-12 flex flex-col justify-end">
            <h1 class="text-6xl font-black text-white leading-none tracking-tighter mb-4">{{ resume.personalInfo.fullName }}</h1>
            <p class="text-slate-400 font-bold uppercase text-xs">{{ resume.personalInfo.jobTitle }}</p>
        </div>
        <div class="p-12 flex-1">
            <div *ngIf="resume.summary" class="mb-12 max-w-2xl">
                <p class="text-sm font-bold text-slate-800 leading-relaxed border-l-4 border-slate-900 pl-4">{{ resume.summary }}</p>
            </div>
            <section>
                <h4 class="text-[10px] font-black uppercase text-slate-300 mb-8 tracking-widest">History</h4>
                <app-experience-block [jobs]="resume.experience"></app-experience-block>
            </section>
        </div>
    </div>
  `
})
export class Pro16VibrantPulseComponent {
    @Input() resume: any;
    @Input() config: any;
}
