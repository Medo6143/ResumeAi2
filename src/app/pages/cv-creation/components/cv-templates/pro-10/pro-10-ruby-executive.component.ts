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
                <section>
                    <h3 class="text-xs font-black uppercase mb-6 border-l-4 pl-4" [style.border-color]="config.primaryColor">Career</h3>
                    <app-experience-block [jobs]="resume.experience" [primaryColor]="config.primaryColor"></app-experience-block>
                </section>
            </div>
        </div>
    </div>
  `
})
export class Pro10RubyExecutiveComponent {
    @Input() resume: any;
    @Input() config: any;
}
