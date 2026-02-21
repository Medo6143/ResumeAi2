import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-photo-7-left-accent-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full bg-white font-sans min-h-[297mm] flex">
        <!-- Sidebar Accent -->
        <div class="w-2 bg-rose-500 h-full flex-shrink-0"></div>
        
        <div class="flex-1 p-12">
            <!-- Header -->
            <header class="flex gap-8 mb-12 border-b border-rose-100 pb-12">
                <div class="w-32 h-40 bg-slate-200 overflow-hidden shadow-lg transform -rotate-2">
                    <img *ngIf="resume.personalInfo.photo" [src]="resume.personalInfo.photo" class="w-full h-full object-cover">
                    <div *ngIf="!resume.personalInfo.photo" class="w-full h-full flex items-center justify-center text-xs text-slate-400">Photo</div>
                </div>
                <div class="flex-1 pt-2">
                    <h1 class="text-5xl font-black text-slate-900 tracking-tighter mb-2">{{ resume.personalInfo.fullName }}</h1>
                    <p class="text-rose-500 font-bold uppercase tracking-widest text-sm mb-6">{{ resume.personalInfo.jobTitle }}</p>
                    
                     <div class="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-slate-500">
                          <a *ngIf="resume.personalInfo.email" [href]="'mailto:' + resume.personalInfo.email" class="hover:text-rose-500 transition">{{ resume.personalInfo.email }}</a>
                          <span *ngIf="resume.personalInfo.phone">{{ resume.personalInfo.phone }}</span>
                          <span *ngIf="resume.personalInfo.location">{{ resume.personalInfo.location }}</span>
                          <a *ngIf="resume.personalInfo.linkedin" [href]="resume.personalInfo.linkedin" target="_blank" class="text-rose-600 hover:text-rose-800">LinkedIn</a>
                          <a *ngIf="resume.personalInfo.github" [href]="resume.personalInfo.github" target="_blank" class="text-rose-600 hover:text-rose-800">GitHub</a>
                          <a *ngIf="resume.personalInfo.portfolio" [href]="resume.personalInfo.portfolio" target="_blank" class="text-rose-600 hover:text-rose-800">Portfolio</a>
                     </div>
                </div>
            </header>

            <div class="grid grid-cols-12 gap-16">
                <!-- Main -->
                <div class="col-span-8 space-y-12">
                    <section *ngIf="resume.summary">
                        <p class="text-lg text-slate-600 italic font-medium leading-relaxed border-l-4 border-rose-200 pl-4">{{ resume.summary }}</p>
                    </section>
                    
                    <section *ngIf="resume.experience?.length">
                        <h3 class="text-2xl font-black text-slate-900 mb-6">Experience</h3>
                        <div class="space-y-10 border-l border-slate-200 ml-2 pl-8 pb-2">
                            <div *ngFor="let job of resume.experience" class="relative">
                                <span class="absolute -left-[37px] top-2 w-4 h-4 bg-rose-500 rounded-full border-4 border-white"></span>
                                <h4 class="font-bold text-xl text-slate-800 mb-1">{{ job.jobTitle }}</h4>
                                <div class="flex justify-between items-center text-sm mb-2">
                                    <span class="font-bold text-rose-600">{{ job.company }}</span>
                                    <span class="font-medium text-slate-400">{{ job.startDate }} - {{ job.current ? 'Present' : job.endDate }}</span>
                                </div>
                                <p class="text-sm text-slate-600 leading-relaxed">{{ job.description }}</p>
                            </div>
                        </div>
                    </section>

                    <section *ngIf="resume.projects?.length">
                         <h3 class="text-2xl font-black text-slate-900 mb-6">Projects</h3>
                         <div class="space-y-6">
                            <div *ngFor="let p of resume.projects">
                                <h4 class="font-bold text-lg text-slate-800">{{ p.name }}</h4>
                                <div class="flex flex-wrap gap-3 mt-1 text-xs font-bold text-rose-500">
                                    <a *ngIf="p.link" [href]="p.link" target="_blank" class="hover:underline">View Project -></a>
                                    <a *ngIf="p.githubLink" [href]="p.githubLink" target="_blank" class="hover:underline">GitHub</a>
                                    <a *ngIf="p.demoLink" [href]="p.demoLink" target="_blank" class="hover:underline">Demo</a>
                                </div>
                                <p class="text-sm text-slate-600 mt-2">{{ p.description }}</p>
                            </div>
                         </div>
                    </section>
                </div>

                <!-- Side -->
                <div class="col-span-4 space-y-12">
                    <section *ngIf="resume.skills?.length">
                        <h3 class="text-sm font-black uppercase text-slate-400 tracking-widest mb-4">Expertise</h3>
                        <div class="flex flex-col gap-2">
                            <div *ngFor="let s of resume.skills" class="text-sm font-bold text-slate-700 border-b border-slate-100 pb-2">
                                {{ s }}
                            </div>
                        </div>
                    </section>

                    <section *ngIf="resume.education?.length">
                        <h3 class="text-sm font-black uppercase text-slate-400 tracking-widest mb-4">Education</h3>
                        <div class="space-y-6">
                            <div *ngFor="let edu of resume.education">
                                <div class="font-bold text-slate-900 leading-tight mb-1">{{ edu.degree }}</div>
                                <div class="text-xs font-bold text-rose-500 uppercase">{{ edu.school }}</div>
                                <div class="text-[10px] text-slate-400 mt-1">{{ edu.startDate }} - {{ edu.endDate }}</div>
                            </div>
                        </div>
                    </section>

                    <section *ngIf="resume.languages?.length">
                        <h3 class="text-sm font-black uppercase text-slate-400 tracking-widest mb-4">Languages</h3>
                        <div class="flex flex-col gap-2">
                            <div *ngFor="let l of resume.languages" class="text-sm font-bold text-slate-700 border-b border-slate-100 pb-2">
                                {{ l }}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
    `
})
export class Photo7LeftAccentComponent {
    @Input() resume: any;
}
