import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pro3-tech-compact-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full p-8 font-mono text-[10px] bg-[#f8f9fa]">
        <div class="border-2 border-slate-200 p-6 rounded relative">
            <div class="absolute -top-3 left-4 bg-[#f8f9fa] px-2 font-bold text-blue-600">Main()</div>
            <h1 class="text-xl font-bold mb-1">> {{ resume.personalInfo.fullName }}</h1>
            <p class="opacity-50 mb-4">// {{ resume.personalInfo.jobTitle }}</p>
            <div class="grid grid-cols-2 gap-4 text-[9px] opacity-40 mb-6">
                <div>const EMAIL = "{{ resume.personalInfo.email }}";</div>
                <div>const LOC = "{{ resume.personalInfo.location }}";</div>
            </div>
            
            <div *ngIf="resume.summary" class="mb-6 pl-4 border-l-2 border-slate-200 opacity-60">
                <div class="text-[9px] font-bold text-blue-600">// Summary</div>
                <div class="italic">/* {{ resume.summary }} */</div>
            </div>

            <section class="mb-6">
                <h2 class="text-xs font-bold text-slate-800 mb-2">class Experience {{ '{' }}</h2>
                <div class="pl-4 space-y-4 border-l-2 border-slate-200">
                    <div *ngFor="let job of resume.experience">
                        <div class="text-blue-600">public {{ job.company }}() {{ '{' }}</div>
                        <div class="pl-4">
                            <p class="font-bold">// {{ job.jobTitle }} [{{ job.startDate }}..{{ job.endDate }}]</p>
                            <div class="opacity-60" [innerHTML]="job.description"></div>
                        </div>
                        <div>{{ '}' }}</div>
                    </div>
                </div>
                <h2 class="text-xs font-bold text-slate-800 mt-2">{{ '}' }}</h2>
            </section>
        </div>
    </div>
  `
})
export class Pro3TechCompactComponent {
    @Input() resume: any;
    @Input() config: any;
}
