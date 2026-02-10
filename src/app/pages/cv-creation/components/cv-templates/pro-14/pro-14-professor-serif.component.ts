import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pro14-professor-serif-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full bg-[#f4ece4] p-16 font-serif text-[#2d241c]">
        <div class="border-y border-[#2d241c] py-10 mb-12 text-center">
            <h1 class="text-3xl font-normal italic mb-2 tracking-wide">{{ resume.personalInfo.fullName }}</h1>
            <p class="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">{{ resume.personalInfo.jobTitle }}</p>
            <div *ngIf="resume.summary" class="mt-8 max-w-xl mx-auto text-xs italic leading-relaxed opacity-80">
                “{{ resume.summary }}”
            </div>
        </div>
        <div class="columns-2 gap-12 text-justify">
            <section class="break-inside-avoid mb-10">
                <h3 class="text-[10px] font-bold uppercase border-b border-[#2d241c] mb-4 pb-1">Experience</h3>
                <div class="space-y-6">
                    <div *ngFor="let job of resume.experience">
                        <h4 class="text-[11px] font-bold mb-1 italic">{{ job.jobTitle }}</h4>
                        <p class="text-[10px] opacity-60 font-medium mb-2">{{ job.company }}</p>
                        <div class="text-[10px] leading-relaxed font-light" [innerHTML]="job.description"></div>
                    </div>
                </div>
            </section>
        </div>
    </div>
  `
})
export class Pro14ProfessorSerifComponent {
    @Input() resume: any;
    @Input() config: any;
}
