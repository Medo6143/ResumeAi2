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

             <div class="flex flex-wrap justify-center gap-2 text-[10px] opacity-80 mt-2">
                <a [href]="'mailto:' + resume.personalInfo.email" class="hover:underline">{{ resume.personalInfo.email }}</a>
                <span *ngIf="resume.personalInfo.phone">| {{ resume.personalInfo.phone }}</span>
                <span *ngIf="resume.personalInfo.location">| {{ resume.personalInfo.location }}</span>
                <span *ngIf="resume.personalInfo.linkedin">| <a [href]="resume.personalInfo.linkedin" target="_blank" class="hover:underline">LinkedIn</a></span>
                <span *ngIf="resume.personalInfo.github">| <a [href]="resume.personalInfo.github" target="_blank" class="hover:underline">GitHub</a></span>
                <span *ngIf="resume.personalInfo.portfolio">| <a [href]="resume.personalInfo.portfolio" target="_blank" class="hover:underline">Portfolio</a></span>
             </div>
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
            <div *ngFor="let p of resume.projects" class="p-8 rounded-[2rem] border-2 border-indigo-50 flex flex-col gap-2">
                <p class="text-[9px] font-black text-indigo-600 uppercase">Projects</p>
                <h4 class="text-lg font-black leading-tight">{{ p.name }}</h4>
                <div class="flex gap-3 text-[10px] font-bold text-indigo-400">
                     <a *ngIf="p.link" [href]="p.link" target="_blank" class="hover:underline">Link</a>
                     <a *ngIf="p.githubLink" [href]="p.githubLink" target="_blank" class="hover:underline">GitHub</a>
                     <a *ngIf="p.demoLink" [href]="p.demoLink" target="_blank" class="hover:underline">Demo</a>
                </div>
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
                <p class="text-[9px] font-black opacity-40 uppercase tracking-widest">Skills</p>
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
