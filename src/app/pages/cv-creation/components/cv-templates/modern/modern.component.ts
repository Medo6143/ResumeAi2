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
            </div>
            <div class="col-span-4 space-y-6">
                <section>
                    <h3 class="text-xs font-bold uppercase tracking-wider border-b-2 border-slate-200 pb-1 mb-2">Skills</h3>
                    <div class="flex flex-wrap gap-1">
                        <span *ngFor="let s of resume.skills" class="px-2 py-0.5 bg-slate-100 text-[9px] rounded">{{ s }}</span>
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
