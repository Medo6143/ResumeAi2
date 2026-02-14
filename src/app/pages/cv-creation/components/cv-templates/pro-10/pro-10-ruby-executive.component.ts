import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from '../shared/experience/experience.component';

@Component({
    selector: 'app-pro10-ruby-executive-template',
    standalone: true,
    imports: [CommonModule, ExperienceComponent],
    template: `
    <div class="h-full flex flex-col">
        <div class="h-4" [style.background]="config.primaryColor"></div>
        <div class="flex flex-1">
            <div class="w-1/4 bg-[#1a1a1a] text-white p-8 flex flex-col gap-10">
                <div>
                    <h4 class="text-[10px] font-bold opacity-40 uppercase mb-4">Details</h4>
                    <div class="text-[10px] space-y-2">
                        <p>{{ resume.personalInfo.email }}</p>
                        <p>{{ resume.personalInfo.phone }}</p>
                    </div>
                </div>
            </div>
            <div class="flex-1 p-12">
                <h1 class="text-5xl font-black mb-1" [style.color]="config.primaryColor">{{ resume.personalInfo.fullName.split(' ')[0] }}</h1>
                <h1 class="text-5xl font-black opacity-10 -mt-4">{{ resume.personalInfo.fullName.split(' ').slice(1).join(' ') }}</h1>
                <p class="text-sm font-bold mb-8 tracking-[0.3em] uppercase opacity-40">{{ resume.personalInfo.jobTitle }}</p>
                <div *ngIf="resume.summary" class="mb-12 text-sm leading-relaxed opacity-80">
                    {{ resume.summary }}
                </div>
                <div class="grid grid-cols-12 gap-16">
                    <div class="col-span-8 space-y-12">
                        <section>
                            <h3 class="text-xs font-black uppercase mb-6 border-l-4 pl-4" [style.border-color]="config.primaryColor">Career</h3>
                            <app-experience-block [jobs]="resume.experience" [primaryColor]="config.primaryColor"></app-experience-block>
                        </section>
                        <section *ngIf="resume.projects && resume.projects.length">
                            <h3 class="text-xs font-black uppercase mb-6 border-l-4 pl-4" [style.border-color]="config.primaryColor">Projects</h3>
                            <div class="space-y-6">
                                <div *ngFor="let p of resume.projects">
                                    <h4 class="text-sm font-black italic">{{ p.name }}</h4>
                                    <p class="text-[10px] opacity-60 leading-relaxed">{{ p.description }}</p>
                                </div>
                            </div>
                        </section>
                        <div *ngFor="let section of resume.customSections">
                            <section *ngIf="section.items && section.items.length">
                                <h3 class="text-xs font-black uppercase mb-6 border-l-4 pl-4" [style.border-color]="config.primaryColor">{{ section.title }}</h3>
                                <div class="space-y-6">
                                    <div *ngFor="let item of section.items">
                                        <h4 class="text-sm font-black italic">{{ item.name }}</h4>
                                        <p class="text-[10px] opacity-60 leading-relaxed">{{ item.description }}</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="col-span-4 space-y-12">
                        <section *ngIf="resume.education && resume.education.length">
                            <h3 class="text-xs font-black uppercase mb-6 border-l-4 pl-4" [style.border-color]="config.primaryColor">Credentials</h3>
                            <div class="space-y-6">
                                <div *ngFor="let edu of resume.education">
                                    <p class="text-[11px] font-black uppercase tracking-wider mb-1">{{ edu.degree }}</p>
                                    <p class="text-[10px] italic opacity-60">{{ edu.school }}</p>
                                </div>
                            </div>
                        </section>
                        <section *ngIf="resume.skills && resume.skills.length">
                            <h3 class="text-xs font-black uppercase mb-6 border-l-4 pl-4" [style.border-color]="config.primaryColor">Core Stack</h3>
                            <div class="flex flex-col gap-2">
                                <span *ngFor="let s of resume.skills" class="text-[10px] font-bold opacity-60">> {{ s }}</span>
                            </div>
                        </section>
                        <section *ngIf="resume.languages && resume.languages.length">
                            <h3 class="text-xs font-black uppercase mb-6 border-l-4 pl-4" [style.border-color]="config.primaryColor">Languages</h3>
                            <div class="flex flex-col gap-2">
                                <span *ngFor="let l of resume.languages" class="text-[10px] font-bold opacity-60">{{ l }}</span>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `
})
export class Pro10RubyExecutiveComponent {
    @Input() resume: any;
    @Input() config: any;
}
