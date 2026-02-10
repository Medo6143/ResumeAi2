import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from '../shared/experience/experience.component';

@Component({
    selector: 'app-pro13-startup-vibe-template',
    standalone: true,
    imports: [CommonModule, ExperienceComponent],
    template: `
    <div class="h-full p-8 font-sans">
        <div class="bg-amber-50 rounded-[2rem] p-10 h-full flex flex-col gap-8 border-4 border-slate-900">
            <header class="flex justify-between items-center">
                <div class="p-6 bg-white rounded-3xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a]">
                    <h1 class="text-3xl font-black tracking-tight">{{ resume.personalInfo.fullName }}</h1>
                    <p class="text-amber-600 font-black uppercase text-xs">{{ resume.personalInfo.jobTitle }}</p>
                </div>
                <div class="space-y-2 text-right">
                    <span class="px-4 py-2 bg-slate-900 text-white rounded-full text-[10px] font-bold">{{ resume.personalInfo.email }}</span>
                </div>
            </header>
            <div class="grid grid-cols-12 gap-8 flex-1">
                <div class="col-span-12 space-y-8">
                    <section *ngIf="resume.summary" class="bg-white rounded-3xl p-6 border-4 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
                        <h3 class="text-sm font-black uppercase mb-2">About Me</h3>
                        <p class="text-sm font-medium">{{ resume.summary }}</p>
                    </section>
                    <section class="bg-white rounded-3xl p-8 border-4 border-slate-900 overflow-hidden">
                        <h3 class="text-lg font-black italic mb-4">What I've Done</h3>
                        <app-experience-block [jobs]="resume.experience"></app-experience-block>
                    </section>
                </div>
            </div>
        </div>
    </div>
  `
})
export class Pro13StartupVibeComponent {
    @Input() resume: any;
    @Input() config: any;
}
