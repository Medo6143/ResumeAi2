import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-photo-4-header-banner-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full bg-white font-sans min-h-[297mm] flex flex-col">
        <!-- Banner Header -->
        <div class="h-48 bg-slate-900 relative">
             <div class="absolute inset-0 bg-gradient-to-r from-blue-900 to-slate-900 opacity-90"></div>
             <!-- Decorative circles -->
             <div class="absolute top-0 right-0 p-4 opacity-10">
                 <div class="w-32 h-32 rounded-full border-4 border-white"></div>
             </div>
             <div class="absolute bottom-0 left-20 transform translate-y-1/2 z-10">
                <div class="w-40 h-40 rounded-full border-8 border-white bg-slate-200 overflow-hidden shadow-2xl">
                    <img *ngIf="resume.personalInfo.photo" [src]="resume.personalInfo.photo" class="w-full h-full object-cover">
                    <div *ngIf="!resume.personalInfo.photo" class="w-full h-full flex items-center justify-center text-slate-400 bg-slate-300">No Photo</div>
                </div>
             </div>
        </div>

        <!-- Header Content -->
        <div class="pt-24 px-12 pb-8 border-b border-slate-100 flex justify-between items-end">
            <div>
                <h1 class="text-4xl font-black text-slate-900 tracking-tight uppercase">{{ resume.personalInfo.fullName }}</h1>
                <p class="text-blue-600 font-bold uppercase tracking-widest text-sm mt-1 mb-4">{{ resume.personalInfo.jobTitle }}</p>
                <div class="text-sm text-slate-500 max-w-xl leading-relaxed">{{ resume.summary }}</div>
            </div>
            
            <!-- Contact Grid (compact) -->
            <div class="text-right text-xs font-medium text-slate-500 space-y-1">
                 <p *ngIf="resume.personalInfo.email"><a [href]="'mailto:' + resume.personalInfo.email" class="hover:underline">{{ resume.personalInfo.email }}</a> ✉️</p>
                 <p *ngIf="resume.personalInfo.phone">{{ resume.personalInfo.phone }} 📞</p>
                 <p *ngIf="resume.personalInfo.location">{{ resume.personalInfo.location }} 📍</p>
                 <p *ngIf="resume.personalInfo.linkedin"><a [href]="resume.personalInfo.linkedin" target="_blank" class="text-blue-600 hover:underline">LinkedIn</a> 🔗</p>
                 <p *ngIf="resume.personalInfo.github"><a [href]="resume.personalInfo.github" target="_blank" class="text-blue-600 hover:underline">GitHub</a> 💻</p>
                 <p *ngIf="resume.personalInfo.portfolio"><a [href]="resume.personalInfo.portfolio" target="_blank" class="text-blue-600 hover:underline">Portfolio</a> 🎨</p>
            </div>
        </div>

        <div class="flex-1 grid grid-cols-12 gap-8 p-12">
            <!-- Left: Main -->
            <div class="col-span-8 space-y-10">
                <!-- Experience -->
                <section *ngIf="resume.experience?.length">
                    <h3 class="text-sm font-bold text-slate-900 uppercase mb-6 flex items-center gap-3">
                        <span class="w-6 h-6 bg-blue-100 text-blue-600 rounded flex items-center justify-center text-xs">💼</span>
                        Work Experience
                    </h3>
                    <div class="space-y-8 relative border-l-2 border-slate-100 ml-3 pl-8 pb-2">
                        <div *ngFor="let job of resume.experience" class="relative">
                            <div class="absolute -left-[39px] top-1 w-4 h-4 rounded-full bg-white border-2 border-slate-300"></div>
                            <div class="flex flex-col sm:flex-row justify-between mb-2">
                                <h4 class="font-bold text-lg text-slate-800">{{ job.jobTitle }}</h4>
                                <span class="text-xs font-bold text-slate-400 uppercase">{{ job.startDate }} — {{ job.current ? 'Present' : job.endDate }}</span>
                            </div>
                            <div class="text-sm font-bold text-blue-600 mb-2">{{ job.company }}</div>
                            <p class="text-sm text-slate-600 leading-relaxed">{{ job.description }}</p>
                        </div>
                    </div>
                </section>

                <!-- Projects -->
                <section *ngIf="resume.projects?.length">
                    <h3 class="text-sm font-bold text-slate-900 uppercase mb-6 flex items-center gap-3">
                        <span class="w-6 h-6 bg-blue-100 text-blue-600 rounded flex items-center justify-center text-xs">🚀</span>
                        Projects
                    </h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div *ngFor="let p of resume.projects" class="bg-slate-50 p-4 border-l-4 border-slate-300 hover:border-blue-500 transition-colors">
                            <h4 class="font-bold text-slate-800 mb-1 text-sm">{{ p.name }}</h4>
                            <div class="flex gap-3 text-[10px] font-bold text-blue-600 mb-1">
                                 <a *ngIf="p.link" [href]="p.link" target="_blank" class="hover:underline">Link</a>
                                 <a *ngIf="p.githubLink" [href]="p.githubLink" target="_blank" class="hover:underline">GitHub</a>
                                 <a *ngIf="p.demoLink" [href]="p.demoLink" target="_blank" class="hover:underline">Demo</a>
                            </div>
                            <p class="text-xs text-slate-500 line-clamp-3">{{ p.description }}</p>
                        </div>
                    </div>
                </section>

                <!-- Custom Sections -->
                <div *ngFor="let section of resume.customSections">
                    <section *ngIf="section.items && section.items.length" class="mt-10">
                        <h3 class="text-sm font-bold text-slate-900 uppercase mb-6 flex items-center gap-3">
                            <span class="w-6 h-6 bg-blue-100 text-blue-600 rounded flex items-center justify-center text-xs">⭐</span>
                            {{ section.title }}
                        </h3>
                        <div class="space-y-6 relative border-l-2 border-slate-100 ml-3 pl-8 pb-2">
                            <div *ngFor="let item of section.items" class="relative">
                                <div class="absolute -left-[39px] top-1 w-4 h-4 rounded-full bg-white border-2 border-slate-300"></div>
                                <h4 class="font-bold text-lg text-slate-800 mb-2">{{ item.name }}</h4>
                                <p class="text-sm text-slate-600 leading-relaxed">{{ item.description }}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <!-- Right: Sidebar -->
            <div class="col-span-4 space-y-10">
                 <!-- Skills -->
                 <section *ngIf="resume.skills?.length">
                    <h3 class="text-sm font-bold text-slate-900 uppercase mb-4 border-b-2 border-blue-500 inline-block pb-1">Skills</h3>
                    <div class="flex flex-col gap-2">
                        <div *ngFor="let s of resume.skills" class="bg-slate-100 text-slate-700 px-3 py-2 rounded text-xs font-medium border-l-4 border-blue-400">
                            {{ s }}
                        </div>
                    </div>
                 </section>

                 <!-- Education -->
                 <section *ngIf="resume.education?.length">
                    <h3 class="text-sm font-bold text-slate-900 uppercase mb-4 border-b-2 border-blue-500 inline-block pb-1">Education</h3>
                    <div class="space-y-4">
                        <div *ngFor="let edu of resume.education">
                            <h5 class="text-sm font-bold text-slate-800">{{ edu.degree }}</h5>
                            <div class="text-xs text-blue-600 mb-1">{{ edu.school }}</div>
                            <div class="text-[10px] text-slate-400 uppercase tracking-wide">{{ edu.startDate }} - {{ edu.endDate }}</div>
                        </div>
                    </div>
                 </section>

                 <!-- Languages -->
                 <section *ngIf="resume.languages?.length">
                    <h3 class="text-sm font-bold text-slate-900 uppercase mb-4 border-b-2 border-blue-500 inline-block pb-1">Languages</h3>
                    <div class="grid grid-cols-2 gap-2">
                        <div *ngFor="let l of resume.languages" class="text-xs text-slate-600 bg-slate-50 p-2 text-center rounded">
                            {{ l }}
                        </div>
                    </div>
                 </section>
            </div>
        </div>
    </div>
    `
})
export class Photo4HeaderBannerComponent {
    @Input() resume: any;
}
