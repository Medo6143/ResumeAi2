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
                <p class="text-[9px] font-bold opacity-40 uppercase">{{ job.startDate }} - {{ job.endDate || 'Present' }}</p>
                <h4 class="text-lg font-black leading-tight">{{ job.jobTitle }}</h4>
                <p class="text-[10px] font-bold">{{ job.company }}</p>
                <div class="text-[10px] leading-relaxed opacity-60" [innerHTML]="job.description"></div>
            </div>
            <div *ngFor="let p of resume.projects" class="p-8 rounded-[2rem] border-2 border-indigo-50 flex flex-col gap-4">
                <p class="text-[9px] font-black text-indigo-600 uppercase">Project</p>
                <h4 class="text-lg font-black leading-tight">{{ p.name }}</h4>
                <p class="text-[10px] font-medium opacity-60">{{ p.description }}</p>
            </div>
            <div *ngFor="let section of resume.customSections">
                <div *ngFor="let item of section.items" class="p-8 rounded-[2rem] border-2 border-emerald-50 flex flex-col gap-4">
                    <p class="text-[9px] font-black text-emerald-600 uppercase">{{ section.title }}</p>
                    <h4 class="text-lg font-black leading-tight">{{ item.name }}</h4>
                    <p class="text-[10px] font-medium opacity-60">{{ item.description }}</p>
                </div>
            </div>
            <div *ngIf="resume.education && resume.education.length" class="p-8 rounded-[2rem] bg-slate-50 flex flex-col gap-6">
                <p class="text-[9px] font-black opacity-40 uppercase tracking-widest">Education</p>
                <div *ngFor="let edu of resume.education" class="space-y-1">
                    <h4 class="text-sm font-black leading-tight">{{ edu.degree }}</h4>
                    <p class="text-[9px] font-bold opacity-60 uppercase">{{ edu.school }}</p>
                </div>
            </div>
            <div *ngIf="resume.skills && resume.skills.length" class="p-8 rounded-[2rem] border-2 border-slate-900 flex flex-col gap-6">
                <p class="text-[9px] font-black opacity-40 uppercase tracking-widest">Stack</p>
                <div class="flex flex-wrap gap-2">
                    <span *ngFor="let s of resume.skills" class="text-[10px] font-black border-b-2 border-slate-900">{{ s }}</span>
                </div>
            </div>
            <div *ngIf="resume.languages && resume.languages.length" class="p-8 rounded-[2rem] bg-slate-900 text-white flex flex-col gap-6">
                <p class="text-[9px] font-black opacity-40 uppercase tracking-widest">Languages</p>
                <div class="space-y-2">
                    <p *ngFor="let l of resume.languages" class="text-[10px] font-black italic">{{ l }}</p>
                </div>
            </div>
        </div>
    </div>
  `
})
export class Pro17StudioArtistComponent {
    @Input() resume: any;
    @Input() config: any;
}
