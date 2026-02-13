import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from '../shared/experience/experience.component';

@Component({
    selector: 'app-modern-template',
    standalone: true,
    imports: [CommonModule, ExperienceComponent],
    template: `
    <div class="h-full flex flex-col p-8">
        <div class="p-6 -mx-8 -mt-8 mb-6" [style.background]="config.primaryColor" style="color: white;">
            <h1 class="text-3xl font-bold mb-1">{{ resume.personalInfo.fullName }}</h1>
            <p class="text-lg opacity-80 mb-3">{{ resume.personalInfo.jobTitle }}</p>
            <div class="flex flex-wrap gap-3 text-xs opacity-70">
                <span *ngIf="resume.personalInfo.email">📧 {{ resume.personalInfo.email }}</span>
                <span *ngIf="resume.personalInfo.phone">📱 {{ resume.personalInfo.phone }}</span>
            </div>
        </div>
        <div class="grid grid-cols-12 gap-6">
            <div class="col-span-8 space-y-6">
                <section *ngIf="resume.summary">
                    <h3 class="text-xs font-bold uppercase tracking-wider border-b-2 pb-1 mb-2" [style.border-color]="config.primaryColor">Profile</h3>
                    <p class="text-[10px] leading-relaxed">{{ resume.summary }}</p>
                </section>
                <section>
                    <h3 class="text-xs font-bold uppercase tracking-wider border-b-2 pb-1 mb-3" [style.border-color]="config.primaryColor">Experience</h3>
                    <app-experience-block [jobs]="resume.experience" [primaryColor]="config.primaryColor"></app-experience-block>
                </section>
                <section *ngIf="resume.projects && resume.projects.length">
                    <h3 class="text-xs font-bold uppercase tracking-wider border-b-2 pb-1 mb-3" [style.border-color]="config.primaryColor">Projects</h3>
                    <div class="space-y-4">
                        <div *ngFor="let project of resume.projects">
                            <h4 class="text-[11px] font-bold">{{ project.name }}</h4>
                            <p class="text-[10px] opacity-70">{{ project.description }}</p>
                        </div>
                    </div>
                </section>
                <div *ngFor="let section of resume.customSections">
                    <section *ngIf="section.items && section.items.length">
                        <h3 class="text-xs font-bold uppercase tracking-wider border-b-2 pb-1 mb-3" [style.border-color]="config.primaryColor">{{ section.title }}</h3>
                        <div class="space-y-3">
                            <div *ngFor="let item of section.items">
                                <h4 class="text-[11px] font-bold">{{ item.name }}</h4>
                                <p class="text-[10px] opacity-70">{{ item.description }}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div class="col-span-4 space-y-6">
                <section *ngIf="resume.education && resume.education.length">
                    <h3 class="text-xs font-bold uppercase tracking-wider border-b-2 border-slate-200 pb-1 mb-2">Education</h3>
                    <div class="space-y-4">
                        <div *ngFor="let edu of resume.education">
                            <p class="text-[10px] font-bold">{{ edu.degree }}</p>
                            <p class="text-[9px] opacity-60">{{ edu.school }}</p>
                            <p class="text-[8px] opacity-40">{{ edu.startDate }} - {{ edu.endDate }}</p>
                        </div>
                    </div>
                </section>
                <section *ngIf="resume.languages && resume.languages.length">
                    <h3 class="text-xs font-bold uppercase tracking-wider border-b-2 border-slate-200 pb-1 mb-2">Languages</h3>
                    <div class="flex flex-wrap gap-2">
                        <span *ngFor="let lang of resume.languages" class="text-[10px] opacity-70">{{ lang }}</span>
                    </div>
                </section>
            </div>
        </div>
    </div>
  `
})
export class ModernComponent {
    @Input() resume: any;
    @Input() config: any;
}
