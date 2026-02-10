import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pro17-studio-artist-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full p-10 flex flex-col font-sans bg-white">
        <header class="grid grid-cols-4 gap-4 mb-20">
            <div class="col-span-3">
                <h1 class="text-8xl font-black uppercase leading-[0.7] tracking-tighter mb-4">{{ resume.personalInfo.fullName.split(' ')[0] }}</h1>
            </div>
            <div class="flex flex-col justify-end text-right">
                <h3 class="text-xs font-black uppercase tracking-widest mb-4">{{ resume.personalInfo.jobTitle }}</h3>
                <p *ngIf="resume.summary" class="text-[10px] font-medium leading-tight opacity-60">{{ resume.summary }}</p>
            </div>
        </header>
        <div class="grid grid-cols-3 gap-8 flex-1">
            <div *ngFor="let job of resume.experience; let i = index" [class]="i % 3 === 0 ? 'bg-slate-900 text-white' : 'border-2 border-slate-100'" class="p-8 rounded-[2rem] flex flex-col gap-4">
                <p class="text-[9px] font-bold opacity-40 uppercase">{{ job.startDate }}</p>
                <h4 class="text-lg font-black leading-tight">{{ job.jobTitle }}</h4>
                <p class="text-[10px] font-bold">{{ job.company }}</p>
            </div>
        </div>
    </div>
  `
})
export class Pro17StudioArtistComponent {
    @Input() resume: any;
    @Input() config: any;
}
