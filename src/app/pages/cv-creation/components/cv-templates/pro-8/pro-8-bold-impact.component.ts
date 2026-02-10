import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pro8-bold-impact-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full p-8 flex flex-col font-black">
        <div class="p-12 border-[12px] border-black flex-1 flex flex-col">
            <h1 class="text-7xl uppercase leading-[0.8] mb-4 tracking-tighter">{{ resume.personalInfo.fullName.split(' ')[0] }}<br>{{ resume.personalInfo.fullName.split(' ').slice(1).join(' ') }}</h1>
            <p class="text-xl bg-black text-white self-start px-4 py-1 uppercase mb-12">{{ resume.personalInfo.jobTitle }}</p>
            <div class="grid grid-cols-2 gap-12 flex-1">
                <section>
                    <p class="text-xs leading-tight mb-8">{{ resume.summary }}</p>
                    <div class="flex flex-col gap-8">
                        <div *ngFor="let job of resume.experience">
                            <h4 class="text-sm font-black border-b-4 border-black pb-1 mb-2">{{ job.jobTitle }}</h4>
                            <p class="text-[10px] font-bold mb-1">{{ job.company }} | {{ job.startDate }} - {{ job.endDate }}</p>
                            <div class="text-[9px] font-medium leading-tight opacity-60" [innerHTML]="job.description"></div>
                        </div>
                    </div>
                </section>
                <section class="flex flex-col gap-12">
                    <div class="p-8 bg-slate-100">
                        <h4 class="text-xs uppercase mb-4">Capabilities</h4>
                        <div class="flex flex-wrap gap-1">
                            <span *ngFor="let s of resume.skills" class="text-[10px]">• {{ s }}</span>
                        </div>
                    </div>
                    <div class="p-8 border-4 border-black flex-1">
                        <h4 class="text-xs uppercase mb-4">Direct Contact</h4>
                        <div class="text-xs space-y-2">
                            <p>{{ resume.personalInfo.email }}</p>
                            <p>{{ resume.personalInfo.phone }}</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
  `
})
export class Pro8BoldImpactComponent {
    @Input() resume: any;
    @Input() config: any;
}
