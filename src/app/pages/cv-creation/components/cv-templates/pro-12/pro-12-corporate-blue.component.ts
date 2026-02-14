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
            <div class="grid grid-cols-12 gap-12">
                <div class="col-span-8 space-y-10">
                    <section *ngIf="resume.experience && resume.experience.length">
                        <h3 class="text-xs font-bold text-[#1e3a8a] border-b pb-1 mb-4 uppercase font-sans tracking-widest">Experience</h3>
                        <app-experience-block [jobs]="resume.experience"></app-experience-block>
                    </section>
                    <section *ngIf="resume.projects && resume.projects.length">
                        <h3 class="text-xs font-bold text-[#1e3a8a] border-b pb-1 mb-4 uppercase font-sans tracking-widest">Projects</h3>
                        <div class="space-y-6">
                            <div *ngFor="let p of resume.projects">
                                <h4 class="text-sm font-bold text-slate-800">{{ p.name }}</h4>
                                <p class="text-xs text-slate-500 mt-1">{{ p.description }}</p>
                            </div>
                        </div>
                    </section>
                    <div *ngFor="let section of resume.customSections">
                        <section *ngIf="section.items && section.items.length">
                            <h3 class="text-xs font-bold text-[#1e3a8a] border-b pb-1 mb-4 uppercase font-sans tracking-widest">{{ section.title }}</h3>
                            <div class="space-y-6">
                                <div *ngFor="let item of section.items">
                                    <h4 class="text-sm font-bold text-slate-800">{{ item.name }}</h4>
                                    <p class="text-xs text-slate-500 mt-1">{{ item.description }}</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div class="col-span-4 space-y-10">
                    <section *ngIf="resume.education && resume.education.length">
                        <h3 class="text-xs font-bold text-[#1e3a8a] border-b pb-1 mb-4 uppercase font-sans tracking-widest">Education</h3>
                        <div class="space-y-4 font-sans">
                            <div *ngFor="let edu of resume.education">
                                <p class="text-[11px] font-bold text-slate-800 uppercase">{{ edu.degree }}</p>
                                <p class="text-[10px] text-slate-500">{{ edu.school }}</p>
                                <p class="text-[9px] text-[#1e3a8a] font-bold">{{ edu.startDate }} - {{ edu.endDate }}</p>
                            </div>
                        </div>
                    </section>
                    <section *ngIf="resume.skills && resume.skills.length">
                        <h3 class="text-xs font-bold text-[#1e3a8a] border-b pb-1 mb-4 uppercase font-sans tracking-widest">Competencies</h3>
                        <div class="flex flex-col gap-2 font-sans">
                            <span *ngFor="let s of resume.skills" class="text-[10px] font-bold text-slate-600 flex items-center gap-2">
                                <div class="w-1.5 h-1.5 bg-[#1e3a8a] flex-shrink-0"></div> {{ s }}
                            </span>
                        </div>
                    </section>
                    <section *ngIf="resume.languages && resume.languages.length">
                        <h3 class="text-xs font-bold text-[#1e3a8a] border-b pb-1 mb-4 uppercase font-sans tracking-widest">Languages</h3>
                        <div class="flex flex-col gap-2 font-sans">
                            <span *ngFor="let l of resume.languages" class="text-[10px] font-bold text-slate-600 italic">
                                {{ l }}
                            </span>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
  `
})
export class Pro12CorporateBlueComponent {
    @Input() resume: any;
    @Input() config: any;
}
