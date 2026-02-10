import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from '../shared/experience/experience.component';

@Component({
    selector: 'app-pro12-corporate-blue-template',
    standalone: true,
    imports: [CommonModule, ExperienceComponent],
    template: `
    <div class="h-full bg-slate-50 p-10 font-serif">
        <div class="bg-white p-12 shadow-sm h-full border-t-[10px] border-[#1e3a8a]">
            <div class="flex justify-between items-start border-b pb-8 mb-8">
                <div>
                    <h1 class="text-3xl font-bold text-[#1e3a8a]">{{ resume.personalInfo.fullName }}</h1>
                    <p class="text-sm font-bold text-slate-400 mt-1 uppercase">{{ resume.personalInfo.jobTitle }}</p>
                </div>
                <div class="text-right text-[10px] space-y-1 font-sans">
                    <p class="font-bold">{{ resume.personalInfo.email }}</p>
                    <p>{{ resume.personalInfo.phone }}</p>
                </div>
            </div>
            <div *ngIf="resume.summary" class="mb-8 p-6 bg-slate-50 border-l-4 border-[#1e3a8a] italic text-slate-600 text-sm">
                {{ resume.summary }}
            </div>
            <section>
                <h3 class="text-xs font-bold text-[#1e3a8a] border-b pb-1 mb-4 uppercase font-sans">Professional History</h3>
                <app-experience-block [jobs]="resume.experience"></app-experience-block>
            </section>
        </div>
    </div>
  `
})
export class Pro12CorporateBlueComponent {
    @Input() resume: any;
    @Input() config: any;
}
