import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-photo-10-floating-card-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full bg-slate-100 font-sans min-h-[297mm] p-6 flex flex-col">
        <!-- Top Card -->
        <div class="bg-white rounded-xl shadow-lg p-8 mb-6 flex gap-8 items-center border border-slate-200">
             <div class="w-32 h-32 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-1 shrink-0">
                 <img *ngIf="resume.personalInfo.photo" [src]="resume.personalInfo.photo" class="w-full h-full object-cover rounded-lg bg-white">
                 <div *ngIf="!resume.personalInfo.photo" class="w-full h-full rounded-lg bg-white flex items-center justify-center text-xs text-slate-400">No Photo</div>
             </div>
             <div class="flex-1">
                 <h1 class="text-3xl font-bold text-slate-800 mb-1">{{ resume.personalInfo.fullName }}</h1>
                 <p class="text-indigo-600 font-medium text-lg mb-4">{{ resume.personalInfo.jobTitle }}</p>
                 <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                     <span *ngIf="resume.personalInfo.email">📧 {{ resume.personalInfo.email }}</span>
                     <span *ngIf="resume.personalInfo.phone">📞 {{ resume.personalInfo.phone }}</span>
                     <span *ngIf="resume.personalInfo.location">📍 {{ resume.personalInfo.location }}</span>
                 </div>
                 <div class="flex gap-4 mt-3 text-xs font-bold text-indigo-600 uppercase tracking-wider">
                     <a *ngIf="resume.personalInfo.linkedin" [href]="resume.personalInfo.linkedin" target="_blank" class="hover:underline">LinkedIn</a>
                     <a *ngIf="resume.personalInfo.github" [href]="resume.personalInfo.github" target="_blank" class="hover:underline">GitHub</a>
                     <a *ngIf="resume.personalInfo.portfolio" [href]="resume.personalInfo.portfolio" target="_blank" class="hover:underline">Portfolio</a>
                 </div>
             </div>
        </div>

        <div class="w-full px-2 mb-4">
             <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-slate-600 text-sm leading-relaxed" *ngIf="resume.summary">
                 {{ resume.summary }}
             </div>
        </div>

        <div class="flex-1 grid grid-cols-12 gap-6">
            <!-- Left: Main -->
            <div class="col-span-8 flex flex-col gap-6">
                <div class="bg-white p-8 rounded-xl shadow-sm border border-slate-200 flex-1">
                    <h3 class="text-sm font-bold uppercase text-slate-400 mb-6 tracking-wider">Experience</h3>
                    <div class="space-y-8">
                        <div *ngFor="let job of resume.experience" class="pl-4 border-l-2 border-indigo-100 relative">
                            <div class="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-indigo-500"></div>
                            <div class="flex justify-between items-baseline mb-1">
                                <h4 class="font-bold text-slate-800">{{ job.jobTitle }}</h4>
                                <span class="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded">{{ job.startDate }} - {{ job.current ? 'Present' : job.endDate }}</span>
                            </div>
                            <div class="text-sm text-indigo-600 font-medium mb-2">{{ job.company }}</div>
                            <p class="text-sm text-slate-600 leading-relaxed">{{ job.description }}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-8 rounded-xl shadow-sm border border-slate-200" *ngIf="resume.projects?.length">
                    <h3 class="text-sm font-bold uppercase text-slate-400 mb-6 tracking-wider">Projects</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div *ngFor="let p of resume.projects" class="bg-slate-50 p-4 rounded-lg">
                            <div class="flex flex-col mb-2">
                                <h4 class="font-bold text-slate-800 text-sm mb-1">{{ p.name }}</h4>
                                <div class="flex gap-2">
                                    <a *ngIf="p.link" [href]="p.link" target="_blank" class="text-[10px] text-white bg-slate-900 px-2 py-0.5 rounded hover:bg-slate-700">Link ➜</a>
                                    <a *ngIf="p.githubLink" [href]="p.githubLink" target="_blank" class="text-[10px] text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded hover:bg-indigo-200">GitHub</a>
                                    <a *ngIf="p.demoLink" [href]="p.demoLink" target="_blank" class="text-[10px] text-purple-700 bg-purple-100 px-2 py-0.5 rounded hover:bg-purple-200">Demo</a>
                                </div>
                            </div>
                            <p class="text-xs text-slate-500">{{ p.description }}</p>
                        </div>
                    </div>
                </div>

                <!-- Custom Sections -->
                <ng-container *ngFor="let section of resume.customSections">
                    <div class="bg-white p-8 rounded-xl shadow-sm border border-slate-200" *ngIf="section.items && section.items.length">
                        <h3 class="text-sm font-bold uppercase text-slate-400 mb-6 tracking-wider">{{ section.title }}</h3>
                        <div class="grid grid-cols-1 gap-4">
                            <div *ngFor="let item of section.items" class="bg-slate-50 p-4 rounded-lg">
                                <h4 class="font-bold text-slate-800 text-sm mb-2">{{ item.name }}</h4>
                                <p class="text-xs text-slate-500">{{ item.description }}</p>
                            </div>
                        </div>
                    </div>
                </ng-container>
            </div>

            <!-- Right: Side -->
            <div class="col-span-4 flex flex-col gap-6">
                 <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 class="text-xs font-bold uppercase text-slate-400 mb-4 tracking-wider">Skills</h3>
                    <div class="flex flex-wrap gap-2">
                        <span *ngFor="let s of resume.skills" class="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-indigo-100">
                            {{ s }}
                        </span>
                    </div>
                 </div>

                 <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 class="text-xs font-bold uppercase text-slate-400 mb-4 tracking-wider">Education</h3>
                    <div class="space-y-4">
                        <div *ngFor="let edu of resume.education" class="border-b border-slate-50 last:border-0 pb-2 last:pb-0">
                            <div class="font-bold text-slate-800 text-sm">{{ edu.degree }}</div>
                            <div class="text-xs text-slate-500">{{ edu.school }}</div>
                            <div class="text-[10px] text-slate-400 mt-1">{{ edu.startDate }} - {{ edu.endDate }}</div>
                        </div>
                    </div>
                 </div>

                 <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex-1">
                    <h3 class="text-xs font-bold uppercase text-slate-400 mb-4 tracking-wider">Languages</h3>
                    <div class="flex flex-col gap-2">
                        <span *ngFor="let l of resume.languages" class="text-sm text-slate-600 border-l-4 border-indigo-200 pl-2">
                            {{ l }}
                        </span>
                    </div>
                 </div>
            </div>
        </div>
    </div>
    `
})
export class Photo10FloatingCardComponent {
    @Input() resume: any;
}
