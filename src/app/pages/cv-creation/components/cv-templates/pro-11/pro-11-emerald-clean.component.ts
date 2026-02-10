import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pro11-emerald-clean-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full p-16 font-sans text-slate-800">
        <div class="max-w-2xl mx-auto space-y-16">
            <header class="text-center">
                <h1 class="text-2xl font-medium tracking-widest uppercase mb-2">{{ resume.personalInfo.fullName }}</h1>
                <div class="w-12 h-1 bg-emerald-500 mx-auto my-4"></div>
                <p class="text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em]">{{ resume.personalInfo.jobTitle }}</p>
            </header>
            <div *ngIf="resume.summary" class="text-xs text-center max-w-lg mx-auto leading-relaxed text-slate-600">
                {{ resume.summary }}
            </div>
            <section class="space-y-10">
                <div *ngFor="let job of resume.experience" class="grid grid-cols-4 gap-4">
                    <div class="text-[9px] font-bold text-emerald-600 uppercase pt-1">{{ job.startDate }}—{{ job.endDate }}</div>
                    <div class="col-span-3">
                        <h3 class="text-xs font-bold mb-1">{{ job.jobTitle }}</h3>
                        <p class="text-[10px] font-bold opacity-40 mb-3 italic">{{ job.company }}</p>
                        <div class="text-[10px] leading-relaxed text-slate-500" [innerHTML]="job.description"></div>
                    </div>
                </div>
            </section>
        </div>
    </div>
  `
})
export class Pro11EmeraldCleanComponent {
    @Input() resume: any;
    @Input() config: any;
}
