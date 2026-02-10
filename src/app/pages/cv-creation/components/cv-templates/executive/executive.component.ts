import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from '../shared/experience/experience.component';

@Component({
    selector: 'app-executive-template',
    standalone: true,
    imports: [CommonModule, ExperienceComponent],
    template: `
    <div class="h-full flex">
        <div class="w-1/3 bg-slate-50 p-8 border-r">
            <div class="space-y-8">
                <div>
                    <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Contact</h3>
                    <div class="text-[10px] space-y-2">
                        <p>{{ resume.personalInfo.email }}</p>
                        <p>{{ resume.personalInfo.phone }}</p>
                    </div>
                </div>
                <div>
                    <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Expertise</h3>
                    <div class="flex flex-col gap-2">
                        <span *ngFor="let s of resume.skills" class="text-[10px] font-bold">• {{ s }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-2/3 p-10">
            <h1 class="text-4xl font-black mb-1 uppercase tracking-tighter">{{ resume.personalInfo.fullName }}</h1>
            <p class="text-lg font-bold opacity-40 mb-8">{{ resume.personalInfo.jobTitle }}</p>
            <section class="mb-10">
                <p class="text-[11px] leading-relaxed opacity-60">{{ resume.summary }}</p>
            </section>
            <section>
                <h2 class="text-[10px] font-black uppercase mb-6 tracking-widest" [style.color]="config.primaryColor">Career Narrative</h2>
                <app-experience-block [jobs]="resume.experience" [primaryColor]="config.primaryColor"></app-experience-block>
            </section>
        </div>
    </div>
  `
})
export class ExecutiveComponent {
    @Input() resume: any;
    @Input() config: any;
}
