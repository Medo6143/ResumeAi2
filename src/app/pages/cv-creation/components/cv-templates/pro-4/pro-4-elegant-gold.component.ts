import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pro4-elegant-gold-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full bg-[#fdfaf5] p-12 flex flex-col items-center font-serif text-[#4a3b2a]">
        <div class="w-24 h-0.5 bg-[#d4af37] mb-8"></div>
        <h1 class="text-4xl font-light uppercase tracking-[0.4em] mb-4 text-center">{{ resume.personalInfo.fullName }}</h1>
        <p class="text-sm tracking-[0.2em] opacity-60 mb-12 text-center uppercase">{{ resume.personalInfo.jobTitle }}</p>
        <div class="w-full max-w-2xl space-y-12">
            <section class="text-center italic text-sm leading-relaxed opacity-70 px-10">"{{ resume.summary }}"</section>
            <section class="space-y-8">
                <h3 class="text-center flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.3em]">
                    <span class="w-12 h-[1px] bg-slate-200"></span> Appointments <span class="w-12 h-[1px] bg-slate-200"></span>
                </h3>
                <div *ngFor="let job of resume.experience" class="text-center">
                    <div class="text-[10px] text-[#d4af37] font-bold mb-1 uppercase tracking-widest">{{ job.startDate }} — {{ job.endDate }}</div>
                    <h4 class="text-lg font-normal mb-1">{{ job.jobTitle }}</h4>
                    <p class="text-[11px] font-bold opacity-60 mb-2 italic">{{ job.company }}</p>
                    <div class="text-[11px] leading-relaxed opacity-70" [innerHTML]="job.description"></div>
                </div>
            </section>
        </div>
    </div>
  `
})
export class Pro4ElegantGoldComponent {
    @Input() resume: any;
    @Input() config: any;
}
