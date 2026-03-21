import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-photo-1-modern-circle-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full bg-white text-slate-800 font-sans grid grid-cols-12 min-h-[297mm]">
        <!-- Sidebar -->
        <div class="col-span-4 bg-slate-900 text-white p-8 space-y-8 flex flex-col h-full">
            <div class="flex flex-col items-center text-center">
                <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-700 mb-4 shadow-xl bg-slate-800">
                    <img *ngIf="resume.personalInfo.photo" [src]="resume.personalInfo.photo" class="w-full h-full object-cover">
                    <div *ngIf="!resume.personalInfo.photo" class="w-full h-full flex items-center justify-center text-xs text-slate-500">No Photo</div>
                </div>
                <h1 class="text-2xl font-bold tracking-tight">{{ resume.personalInfo.fullName }}</h1>
                <p class="text-indigo-400 font-medium mt-1 uppercase text-xs tracking-wider">{{ resume.personalInfo.jobTitle }}</p>
            </div>
            
            <div class="space-y-6 flex-1 text-sm">
                <!-- Contact -->
                <section>
                    <h3 class="text-xs font-bold uppercase text-slate-500 mb-3 tracking-widest border-b border-slate-800 pb-1">Contact</h3>
                    <div class="space-y-2 text-slate-300">
                        <p class="truncate text-xs" *ngIf="resume.personalInfo.email" title="{{ resume.personalInfo.email }}">📧 {{ resume.personalInfo.email }}</p>
                        <p class="text-xs" *ngIf="resume.personalInfo.phone">📱 {{ resume.personalInfo.phone }}</p>
                        <p class="text-xs" *ngIf="resume.personalInfo.location">📍 {{ resume.personalInfo.location }}</p>
                        <p class="truncate text-xs" *ngIf="resume.personalInfo.linkedin">🔗 <a [href]="resume.personalInfo.linkedin" target="_blank" class="hover:underline">LinkedIn</a></p>
                        <p class="truncate text-xs" *ngIf="resume.personalInfo.github">💻 <a [href]="resume.personalInfo.github" target="_blank" class="hover:underline">GitHub</a></p>
                        <p class="truncate text-xs" *ngIf="resume.personalInfo.portfolio">🎨 <a [href]="resume.personalInfo.portfolio" target="_blank" class="hover:underline">Portfolio</a></p>
                    </div>
                </section>

                <!-- Skills -->
                <section *ngIf="resume.skills?.length">
                    <h3 class="text-xs font-bold uppercase text-slate-500 mb-3 tracking-widest border-b border-slate-800 pb-1">Skills</h3>
                    <div class="flex flex-wrap gap-2">
                        <span *ngFor="let s of resume.skills" class="bg-slate-800 px-2 py-1 rounded text-[10px] text-indigo-300 border border-slate-700">
                            {{ s }}
                        </span>
                    </div>
                </section>

                <!-- Languages -->
                <section *ngIf="resume.languages?.length">
                    <h3 class="text-xs font-bold uppercase text-slate-500 mb-3 tracking-widest border-b border-slate-800 pb-1">Languages</h3>
                    <ul class="space-y-1 text-slate-300 text-xs">
                        <li *ngFor="let l of resume.languages">• {{ l }}</li>
                    </ul>
                </section>
            </div>
        </div>

        <!-- Main Content -->
        <div class="col-span-8 p-10 space-y-8 bg-slate-50 h-full">
             <!-- Summary -->
             <section *ngIf="resume.summary">
                <h3 class="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Profile</h3>
                <p class="text-slate-700 leading-relaxed text-sm border-l-4 border-indigo-500 pl-4 py-1 bg-white shadow-sm rounded-r-lg">{{ resume.summary }}</p>
             </section>

             <!-- Experience -->
             <section *ngIf="resume.experience?.length">
                <h3 class="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest border-b border-slate-200 pb-2">Experience</h3>
                <div class="space-y-6">
                    <div *ngFor="let job of resume.experience" class="relative pl-6 border-l-2 border-indigo-200">
                        <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-50 border-2 border-indigo-500"></div>
                        <div class="mb-1">
                            <h4 class="text-sm font-bold text-slate-900">{{ job.jobTitle }}</h4>
                            <div class="flex justify-between items-center text-xs text-slate-500">
                                <span class="font-medium text-indigo-600">{{ job.company }}</span>
                                <span>{{ job.startDate }} - {{ job.current ? 'Present' : job.endDate }}</span>
                            </div>
                        </div>
                        <p class="text-xs text-slate-600 leading-relaxed mt-2">{{ job.description }}</p>
                    </div>
                </div>
             </section>

             <!-- Projects -->
             <section *ngIf="resume.projects?.length">
                <h3 class="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest border-b border-slate-200 pb-2">Projects</h3>
                <div class="grid grid-cols-2 gap-4">
                    <div *ngFor="let p of resume.projects" class="bg-white p-4 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <h4 class="text-sm font-bold text-slate-800 mb-1">{{ p.name }}</h4>
                        <div class="flex gap-2 text-[9px] font-bold text-indigo-500 mb-1">
                             <a *ngIf="p.link" [href]="p.link" target="_blank" class="hover:underline">Link</a>
                             <a *ngIf="p.githubLink" [href]="p.githubLink" target="_blank" class="hover:underline">GitHub</a>
                             <a *ngIf="p.demoLink" [href]="p.demoLink" target="_blank" class="hover:underline">Demo</a>
                        </div>
                        <p class="text-xs text-slate-500 line-clamp-3">{{ p.description }}</p>
                    </div>
                </div>
             </section>

             <!-- Education -->
             <section *ngIf="resume.education?.length">
                <h3 class="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest border-b border-slate-200 pb-2">Education</h3>
                <div class="grid gap-3">
                    <div *ngFor="let edu of resume.education" class="flex justify-between items-center bg-white px-4 py-3 rounded border border-slate-100">
                        <div>
                            <h4 class="text-sm font-bold text-slate-800">{{ edu.degree }}</h4>
                            <p class="text-xs text-slate-500">{{ edu.school }}</p>
                        </div>
                        <span class="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded">{{ edu.startDate }} - {{ edu.endDate }}</span>
                    </div>
                </div>
             </section>

             <!-- Custom Sections -->
             <div *ngFor="let section of resume.customSections">
                 <section *ngIf="section.items && section.items.length" class="mt-8">
                    <h3 class="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest border-b border-slate-200 pb-2">{{ section.title }}</h3>
                    <div class="space-y-4">
                        <div *ngFor="let item of section.items" class="bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                            <h4 class="text-sm font-bold text-slate-800 mb-1">{{ item.name }}</h4>
                            <p class="text-xs text-slate-500 leading-relaxed">{{ item.description }}</p>
                        </div>
                    </div>
                 </section>
             </div>
        </div>
    </div>
    `
})
export class Photo1ModernCircleComponent {
    @Input() resume: any;
}
