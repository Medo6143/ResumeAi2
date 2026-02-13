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
                    <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Education</h3>
                    <div class="space-y-4">
                        <div *ngFor="let edu of resume.education">
                            <p class="text-[10px] font-bold">{{ edu.degree }}</p>
                            <p class="text-[9px] opacity-60">{{ edu.school }}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 class="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Languages</h3>
                    <div class="flex flex-col gap-1">
                        <span *ngFor="let lang of resume.languages" class="text-[10px] font-medium opacity-60">{{ lang }}</span>
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
            <section class="mb-10">
                <h2 class="text-[10px] font-black uppercase mb-6 tracking-widest" [style.color]="config.primaryColor">Career Narrative</h2>
                <app-experience-block [jobs]="resume.experience" [primaryColor]="config.primaryColor"></app-experience-block>
            </section>
            <section *ngIf="resume.projects && resume.projects.length" class="mb-10">
                <h2 class="text-[10px] font-black uppercase mb-6 tracking-widest" [style.color]="config.primaryColor">Featured Projects</h2>
                <div class="space-y-6">
                    <div *ngFor="let p of resume.projects">
                        <h4 class="text-sm font-bold mb-1">{{ p.name }}</h4>
                        <p class="text-[11px] opacity-60">{{ p.description }}</p>
                    </div>
                </div>
            </section>
            <div *ngFor="let section of resume.customSections" class="mb-10">
                <h2 class="text-[10px] font-black uppercase mb-6 tracking-widest" [style.color]="config.primaryColor">{{ section.title }}</h2>
                <div class="space-y-6">
                    <div *ngFor="let item of section.items">
                        <h4 class="text-sm font-bold mb-1">{{ item.name }}</h4>
                        <p class="text-[11px] opacity-60">{{ item.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `
})
export class ExecutiveComponent {
    @Input() resume: any;
    @Input() config: any;
}
