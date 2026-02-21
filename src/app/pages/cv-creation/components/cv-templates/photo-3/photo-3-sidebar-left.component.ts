import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-photo-3-sidebar-left-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full bg-white text-slate-800 font-sans grid grid-cols-12 min-h-[297mm]">
        <!-- Left Sidebar -->
        <div class="col-span-4 bg-slate-100 p-8 space-y-8 h-full border-r border-slate-200">
            <!-- Photo -->
            <div class="w-40 h-40 mx-auto rounded-lg overflow-hidden shadow-lg border-4 border-white transform rotate-3 hover:rotate-0 transition-transform">
                <img *ngIf="resume.personalInfo.photo" [src]="resume.personalInfo.photo" class="w-full h-full object-cover">
                <div *ngIf="!resume.personalInfo.photo" class="w-full h-full bg-slate-200 flex items-center justify-center text-xs text-slate-500">No Photo</div>
            </div>

            <!-- Contact -->
             <section class="text-center space-y-3">
                <div class="w-10 h-1 bg-indigo-500 mx-auto rounded"></div>
                 <div *ngIf="resume.personalInfo.email" class="text-xs text-slate-600 break-words font-medium"><a [href]="'mailto:' + resume.personalInfo.email" class="hover:underline">{{ resume.personalInfo.email }}</a></div>
                 <div *ngIf="resume.personalInfo.phone" class="text-xs text-slate-600">{{ resume.personalInfo.phone }}</div>
                 <div *ngIf="resume.personalInfo.location" class="text-xs text-slate-600">{{ resume.personalInfo.location }}</div>
                 <div *ngIf="resume.personalInfo.linkedin" class="text-xs text-indigo-600 break-words hover:underline"><a [href]="resume.personalInfo.linkedin" target="_blank">LinkedIn</a></div>
                 <div *ngIf="resume.personalInfo.github" class="text-xs text-indigo-600 break-words hover:underline"><a [href]="resume.personalInfo.github" target="_blank">GitHub</a></div>
                 <div *ngIf="resume.personalInfo.portfolio" class="text-xs text-indigo-600 break-words hover:underline"><a [href]="resume.personalInfo.portfolio" target="_blank">Portfolio</a></div>
             </section>

             <!-- Education -->
             <section *ngIf="resume.education?.length">
                <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-300 pb-2">Education</h3>
                <div class="space-y-4">
                    <div *ngFor="let edu of resume.education" class="bg-white p-3 rounded shadow-sm">
                         <div class="font-bold text-xs text-slate-900">{{ edu.degree }}</div>
                         <div class="text-[10px] uppercase tracking-wide text-indigo-600 mt-1">{{ edu.school }}</div>
                         <div class="text-[10px] text-slate-400 mt-1">{{ edu.startDate }} - {{ edu.endDate }}</div>
                    </div>
                </div>
             </section>

             <!-- Skills -->
             <section *ngIf="resume.skills?.length">
                <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-300 pb-2">Skills</h3>
                <div class="flex flex-wrap gap-2">
                    <span *ngFor="let s of resume.skills" class="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-medium border border-indigo-100">{{ s }}</span>
                </div>
             </section>

             <!-- Languages -->
             <section *ngIf="resume.languages?.length">
                <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-300 pb-2">Languages</h3>
                <div class="space-y-1">
                    <div *ngFor="let l of resume.languages" class="text-xs text-slate-600 font-medium flex justify-between">
                        <span>{{ l }}</span>
                    </div>
                </div>
             </section>
        </div>

        <!-- Right Content -->
        <div class="col-span-8 p-10 bg-white h-full relative">
            <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            
            <!-- Header -->
            <div class="mb-10 text-left">
                <h1 class="text-5xl font-black text-slate-900 tracking-tighter mb-2">{{ resume.personalInfo.fullName }}</h1>
                <p class="text-xl text-indigo-600 font-medium tracking-wide">{{ resume.personalInfo.jobTitle }}</p>
            </div>

            <!-- Summary -->
             <section *ngIf="resume.summary" class="mb-10">
                <p class="text-slate-600 leading-relaxed border-l-4 border-slate-200 pl-4 italic">{{ resume.summary }}</p>
             </section>

             <!-- Experience -->
             <section *ngIf="resume.experience?.length" class="space-y-8">
                <h3 class="flex items-center gap-3 text-lg font-bold text-slate-900 uppercase tracking-wider">
                    <span class="w-8 h-8 flex items-center justify-center bg-slate-900 text-white rounded-full text-xs">01</span>
                    Experience
                </h3>
                
                <div class="space-y-8 pl-4 border-l border-slate-200 ml-4 pb-4">
                    <div *ngFor="let job of resume.experience" class="relative pl-6">
                        <div class="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-white"></div>
                        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                            <h4 class="text-lg font-bold text-slate-800">{{ job.jobTitle }}</h4>
                            <span class="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-500">{{ job.startDate }} - {{ job.current ? 'Present' : job.endDate }}</span>
                        </div>
                        <p class="text-sm font-bold text-indigo-600 mb-2">{{ job.company }}</p>
                        <p class="text-sm text-slate-600 leading-relaxed">{{ job.description }}</p>
                    </div>
                </div>
             </section>

             <!-- Projects -->
             <section *ngIf="resume.projects?.length" class="space-y-6 mt-10">
                <h3 class="flex items-center gap-3 text-lg font-bold text-slate-900 uppercase tracking-wider">
                    <span class="w-8 h-8 flex items-center justify-center bg-slate-900 text-white rounded-full text-xs">02</span>
                    Projects
                </h3>
                
                <div class="grid grid-cols-2 gap-4">
                    <div *ngFor="let p of resume.projects" class="group p-4 rounded-xl bg-slate-50 hover:bg-indigo-50 transition-colors border border-transparent hover:border-indigo-100">
                        <h4 class="font-bold text-slate-900 mb-1 group-hover:text-indigo-700">{{ p.name }}</h4>
                        <div class="flex gap-2 text-[10px] font-bold text-indigo-500 mb-1">
                             <a *ngIf="p.link" [href]="p.link" target="_blank" class="hover:underline">Link</a>
                             <a *ngIf="p.githubLink" [href]="p.githubLink" target="_blank" class="hover:underline">GitHub</a>
                             <a *ngIf="p.demoLink" [href]="p.demoLink" target="_blank" class="hover:underline">Demo</a>
                        </div>
                        <p class="text-xs text-slate-500 leading-normal">{{ p.description }}</p>
                    </div>
                </div>
             </section>
        </div>
    </div>
    `
})
export class Photo3SidebarLeftComponent {
    @Input() resume: any;
}
