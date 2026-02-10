import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pro9-skyline-modern-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full p-10 flex flex-col font-sans">
        <header class="mb-12 border-b-4 border-slate-900 pb-2">
            <h1 class="text-5xl font-black italic tracking-tighter">{{ resume.personalInfo.fullName }}</h1>
            <div class="flex justify-between items-center mt-2">
                <p class="text-xs font-bold uppercase tracking-widest text-indigo-600">{{ resume.personalInfo.jobTitle }}</p>
                <div class="flex gap-4 text-[9px] opacity-40 font-bold">
                    <span>{{ resume.personalInfo.email }}</span>
                    <span>{{ resume.personalInfo.phone }}</span>
                </div>
            </div>
        </header>
        <div class="flex-1 space-y-12">
            <section *ngIf="resume.summary" class="bg-slate-50 p-6 border-r-4 border-indigo-600">
                <p class="text-[10px] leading-relaxed italic text-slate-500">{{ resume.summary }}</p>
            </section>
            <section>
                <h3 class="text-xs font-black uppercase mb-6 flex items-center gap-2">
                    <span class="w-8 h-8 bg-slate-900 text-white flex items-center justify-center rounded">E</span>
                    Experience
                </h3>
                <div class="space-y-8">
                    <div *ngFor="let job of resume.experience">
                        <div class="flex items-baseline gap-4">
                            <span class="text-[10px] font-black opacity-20 w-24">{{ job.startDate }}</span>
                            <div class="flex-1">
                                <h4 class="text-sm font-bold">{{ job.jobTitle }}</h4>
                                <p class="text-[10px] text-indigo-600 font-bold mb-2">{{ job.company }}</p>
                                <div class="text-[10px] leading-relaxed opacity-60" [innerHTML]="job.description"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
  `
})
export class Pro9SkylineModernComponent {
    @Input() resume: any;
    @Input() config: any;
}
