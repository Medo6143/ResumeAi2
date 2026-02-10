import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pro6-classic-chrono-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full p-12 flex flex-col font-sans">
        <header class="flex gap-8 mb-12 items-end">
            <h1 class="text-6xl font-black leading-none tracking-tighter">{{ resume.personalInfo.fullName.split(' ')[0] }}<span class="block text-slate-300">{{ resume.personalInfo.fullName.split(' ').slice(1).join(' ') }}</span></h1>
            <div class="text-right pb-2">
                <p class="text-xs font-bold uppercase tracking-widest text-indigo-600">{{ resume.personalInfo.jobTitle }}</p>
            </div>
        </header>

        <div *ngIf="resume.summary" class="mb-12 max-w-3xl">
            <p class="text-sm font-medium text-slate-600 leading-relaxed indent-8">{{ resume.summary }}</p>
        </div>

        <div class="flex-1 flex gap-12">
            <div class="w-12 flex flex-col items-center py-4 text-slate-100"><div class="flex-1 w-1 bg-current"></div></div>
            <div class="flex-1 space-y-12">
                <section *ngFor="let job of resume.experience" class="relative">
                    <div class="absolute -left-[56px] top-1 w-2 h-2 rounded-full bg-white border-2 border-slate-900 z-10"></div>
                    <div class="flex gap-8">
                        <div class="w-32 shrink-0">
                            <p class="text-[10px] font-black uppercase opacity-20">{{ job.startDate }}</p>
                            <p class="text-[10px] font-black uppercase">{{ job.endDate || 'Now' }}</p>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-xl font-black mb-1 uppercase italic tracking-tighter">{{ job.jobTitle }}</h4>
                            <p class="text-xs font-bold text-indigo-600 mb-3">{{ job.company }}</p>
                            <div class="text-xs leading-relaxed text-slate-500" [innerHTML]="job.description"></div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
  `
})
export class Pro6ClassicChronoComponent {
    @Input() resume: any;
    @Input() config: any;
}
