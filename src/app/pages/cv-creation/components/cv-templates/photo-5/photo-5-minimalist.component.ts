import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-photo-5-minimalist-template',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="h-full bg-white text-gray-800 font-sans min-h-[297mm] p-16">
        <!-- Header -->
        <header class="flex flex-col items-center mb-12 text-center">
            <div class="w-24 h-24 mb-6 rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
                <img *ngIf="resume.personalInfo.photo" [src]="resume.personalInfo.photo" class="w-full h-full object-cover grayscale opacity-90">
                <div *ngIf="!resume.personalInfo.photo" class="w-full h-full flex items-center justify-center text-xs text-gray-400">Photo</div>
            </div>
            
            <h1 class="text-3xl font-light tracking-wide text-gray-900 uppercase mb-2">{{ resume.personalInfo.fullName }}</h1>
            <p class="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-6">{{ resume.personalInfo.jobTitle }}</p>
            
            <div class="flex flex-wrap justify-center gap-4 text-[10px] text-gray-500 uppercase tracking-wider">
                <span *ngIf="resume.personalInfo.email">{{ resume.personalInfo.email }}</span>
                <span *ngIf="resume.personalInfo.location" class="text-gray-300">|</span>
                <span *ngIf="resume.personalInfo.location">{{ resume.personalInfo.location }}</span>
                <span *ngIf="resume.personalInfo.phone" class="text-gray-300">|</span>
                <span *ngIf="resume.personalInfo.phone">{{ resume.personalInfo.phone }}</span>
                <span *ngIf="resume.personalInfo.linkedin" class="text-gray-300">|</span>
                <span *ngIf="resume.personalInfo.linkedin">LinkedIn</span>
            </div>
        </header>

        <!-- Content -->
        <div class="grid grid-cols-12 gap-12">
             <!-- Left: Details -->
            <div class="col-span-4 space-y-12 text-right border-r border-gray-100 pr-12">
                 <!-- Summary -->
                 <section *ngIf="resume.summary">
                    <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-4">Profile</h3>
                    <p class="text-xs leading-relaxed text-gray-500 italic">{{ resume.summary }}</p>
                 </section>

                 <!-- Education -->
                 <section *ngIf="resume.education?.length">
                    <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-4">Education</h3>
                    <div class="space-y-6">
                        <div *ngFor="let edu of resume.education">
                            <h5 class="text-xs font-bold text-gray-800">{{ edu.degree }}</h5>
                            <div class="text-[10px] text-gray-500 mt-1">{{ edu.school }}</div>
                            <div class="text-[10px] text-gray-400 mt-1">{{ edu.startDate }} - {{ edu.endDate }}</div>
                        </div>
                    </div>
                 </section>

                 <!-- Skills -->
                 <section *ngIf="resume.skills?.length">
                    <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-4">Skills</h3>
                    <div class="flex flex-wrap justify-end gap-2">
                         <span *ngFor="let s of resume.skills" class="text-[10px] text-gray-600 border-b border-gray-200 pb-0.5">{{ s }}</span>
                    </div>
                 </section>
                 
                 <!-- Languages -->
                 <section *ngIf="resume.languages?.length">
                    <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-4">Languages</h3>
                    <ul class="space-y-1">
                        <li *ngFor="let l of resume.languages" class="text-[10px] text-gray-600">{{ l }}</li>
                    </ul>
                 </section>
            </div>

            <!-- Right: Experience -->
            <div class="col-span-8 space-y-12">
                <section *ngIf="resume.experience?.length">
                    <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-8 border-b border-gray-100 pb-2">Professional Experience</h3>
                    <div class="space-y-10">
                        <div *ngFor="let job of resume.experience">
                             <div class="flex justify-between items-baseline mb-2">
                                <h4 class="text-sm font-semibold text-gray-800">{{ job.jobTitle }}</h4>
                                <span class="text-[10px] font-mono text-gray-400">{{ job.startDate }} - {{ job.current ? 'Present' : job.endDate }}</span>
                             </div>
                             <p class="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">{{ job.company }}</p>
                             <p class="text-xs text-gray-600 leading-relaxed">{{ job.description }}</p>
                        </div>
                    </div>
                </section>

                <section *ngIf="resume.projects?.length">
                    <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900 mb-8 border-b border-gray-100 pb-2">Projects</h3>
                    <div class="space-y-6">
                        <div *ngFor="let p of resume.projects">
                            <h4 class="text-sm font-semibold text-gray-800 mb-1">{{ p.name }}</h4>
                            <p class="text-xs text-gray-500">{{ p.description }}</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
    `
})
export class Photo5MinimalistComponent {
    @Input() resume: any;
}
