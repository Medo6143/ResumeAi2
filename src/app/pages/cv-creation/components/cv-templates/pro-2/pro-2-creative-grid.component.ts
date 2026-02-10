import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from '../shared/experience/experience.component';

@Component({
    selector: 'app-pro2-creative-grid-template',
    standalone: true,
    imports: [CommonModule, ExperienceComponent],
    template: `
    <div class="h-full p-6 flex flex-col gap-6 font-sans">
        <div class="grid grid-cols-3 gap-6">
            <div class="col-span-1 bg-slate-900 text-white p-6 rounded-3xl flex flex-col justify-center">
                <h1 class="text-2xl font-black leading-none mb-2">{{ resume.personalInfo.fullName.split(' ')[0] }}<br>{{ resume.personalInfo.fullName.split(' ')[1] }}</h1>
                <p class="text-[10px] font-bold opacity-60 uppercase">{{ resume.personalInfo.jobTitle }}</p>
            </div>
            <div class="col-span-2 p-6 rounded-3xl border-2 border-slate-100 flex items-center">
                <p class="text-[10px] leading-relaxed text-slate-500 italic">{{ resume.summary }}</p>
            </div>
        </div>
        <div class="flex-1 grid grid-cols-12 gap-6">
            <div class="col-span-7 space-y-6">
                <h3 class="text-xs font-black uppercase tracking-[0.3em] flex items-center gap-2">
                    <span class="w-8 h-0.5 bg-pink-500"></span> History
                </h3>
                <app-experience-block [jobs]="resume.experience"></app-experience-block>
            </div>
            <div class="col-span-5 flex flex-col gap-6">
                <div class="p-6 bg-pink-50 rounded-3xl">
                    <h4 class="text-[10px] font-black uppercase mb-4">Stack</h4>
                    <div class="flex flex-wrap gap-2">
                        <span *ngFor="let s of resume.skills" class="px-2 py-1 bg-white text-[9px] font-bold rounded-lg shadow-sm">{{ s }}</span>
                    </div>
                </div>
                <div class="p-6 bg-slate-50 rounded-3xl flex-1">
                    <h4 class="text-[10px] font-black uppercase mb-4">Reach</h4>
                    <div class="text-[10px] space-y-2 opacity-60">
                        <p>M: {{ resume.personalInfo.phone }}</p>
                        <p>E: {{ resume.personalInfo.email }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `
})
export class Pro2CreativeGridComponent {
    @Input() resume: any;
    @Input() config: any;
}
