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
            <section *ngIf="resume.education && resume.education.length" class="space-y-8">
                <h3 class="text-center flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.3em]">
                    <span class="w-12 h-[1px] bg-slate-200"></span> Academic Background <span class="w-12 h-[1px] bg-slate-200"></span>
                </h3>
                <div *ngFor="let edu of resume.education" class="text-center">
                    <h4 class="text-lg font-normal mb-1">{{ edu.degree }}</h4>
                    <p class="text-[11px] font-bold opacity-60 uppercase tracking-widest">{{ edu.school }}</p>
                    <div class="text-[10px] text-[#d4af37] font-bold mt-1">{{ edu.startDate }} — {{ edu.endDate }}</div>
                </div>
            </section>
            <div class="grid grid-cols-2 gap-12">
                <section *ngIf="resume.skills && resume.skills.length">
                    <h3 class="text-center flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                        Attributes
                    </h3>
                    <div class="flex flex-wrap justify-center gap-x-4 gap-y-2">
                        <span *ngFor="let s of resume.skills" class="text-[10px] uppercase tracking-wider opacity-60">{{ s }}</span>
                    </div>
                </section>
                <section *ngIf="resume.languages && resume.languages.length">
                    <h3 class="text-center flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                        Dialects
                    </h3>
                    <div class="flex flex-wrap justify-center gap-x-4 gap-y-2">
                        <span *ngFor="let l of resume.languages" class="text-[10px] uppercase tracking-wider opacity-60">{{ l }}</span>
                    </div>
                </section>
            </div>
            <section *ngIf="resume.projects && resume.projects.length" class="space-y-6">
                <h3 class="text-center flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.3em]">
                    <span class="w-12 h-[1px] bg-slate-200"></span> Signature Projects <span class="w-12 h-[1px] bg-slate-200"></span>
                </h3>
                <div class="grid grid-cols-2 gap-8">
                    <div *ngFor="let p of resume.projects" class="text-center space-y-1">
                        <h4 class="text-sm font-bold uppercase tracking-widest text-[#d4af37]">{{ p.name }}</h4>
                        <p class="text-[10px] italic opacity-60 leading-relaxed">{{ p.description }}</p>
                    </div>
                </div>
            </section>
            <div *ngFor="let section of resume.customSections">
                <section *ngIf="section.items && section.items.length" class="space-y-6">
                    <h3 class="text-center flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.3em]">
                        <span class="w-12 h-[1px] bg-slate-200"></span> {{ section.title }} <span class="w-12 h-[1px] bg-slate-200"></span>
                    </h3>
                    <div class="grid grid-cols-2 gap-8">
                        <div *ngFor="let item of section.items" class="text-center space-y-1">
                            <h4 class="text-sm font-bold uppercase tracking-widest text-[#d4af37]">{{ item.name }}</h4>
                            <p class="text-[10px] italic opacity-60 leading-relaxed">{{ item.description }}</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
  `
})
export class Pro4ElegantGoldComponent {
    @Input() resume: any;
    @Input() config: any;
}
