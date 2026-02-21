import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfile } from '../models/user-profile.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-profile-hero',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    template: `
    <div class="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-8 md:p-14 text-white shadow-2xl shadow-indigo-500/10 group/hero border border-white/10">
        <!-- Abstract Decorations -->
        <div class="absolute inset-0 bg-[url('/assets/noise.png')] opacity-10 mix-blend-overlay"></div>
        <div class="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-purple-500/20 rounded-full blur-[100px] animate-blob mix-blend-screen"></div>
        <div class="absolute -bottom-[30%] -left-[10%] w-[80%] h-[80%] bg-blue-500/20 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-screen"></div>
        
        <!-- Animated grid line -->
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div class="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-14">
            <!-- Avatar Section -->
            <div class="relative group/avatar shrink-0 pt-2 md:pt-0">
                <!-- Glowing ring -->
                <div class="absolute -inset-2 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-xl opacity-30 group-hover/avatar:opacity-60 transition-opacity duration-500 animate-pulse"></div>
                
                <div class="relative w-36 h-36 md:w-44 md:h-44 rounded-full border-[6px] border-white/10 bg-slate-800 shadow-2xl shadow-black/50 overflow-hidden transform group-hover/avatar:scale-[1.02] transition-transform duration-500 z-10 flex items-center justify-center backdrop-blur-sm">
                    <img *ngIf="profile.avatarUrl" [src]="profile.avatarUrl" class="w-full h-full object-cover">
                    <div *ngIf="!profile.avatarUrl" class="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700">
                        <span class="text-5xl md:text-6xl font-black text-white/90 drop-shadow-md">{{ initials }}</span>
                    </div>
                </div>
                
                <!-- Edit button for avatar -->
                <button (click)="edit.emit()" class="absolute bottom-2 right-2 md:bottom-4 md:right-4 p-3 bg-white text-indigo-600 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all z-20 hover:bg-indigo-50 border border-slate-100 dark:border-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 group/editbtn">
                    <svg class="w-5 h-5 group-hover/editbtn:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </div>

            <!-- Info Section -->
            <div class="flex-1 text-center md:text-left flex flex-col items-center md:items-start w-full">
                <div class="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 w-full mb-2">
                    <h1 class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-white drop-shadow-sm pb-1">
                        {{ profile.personalInfo.fullName || ('PROFILE.HERO.IDENTITY_PLACEHOLDER' | translate) }}
                    </h1>
                    <button (click)="edit.emit()" class="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-black uppercase tracking-widest transition-all backdrop-blur-md flex items-center gap-2 group/edit shrink-0 mt-2 sm:mt-0">
                        <svg class="w-4 h-4 text-indigo-300 group-hover/edit:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                        {{ 'PROFILE.HERO.EDIT_IDENTITY' | translate }}
                    </button>
                </div>
                
                <p class="text-xl md:text-2xl text-indigo-300 font-bold mb-8 tracking-wide flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                    {{ profile.personalInfo.jobTitle || ('PROFILE.HERO.TITLE_PLACEHOLDER' | translate) }}
                </p>
                
                <div class="flex flex-wrap justify-center md:justify-start gap-4 mb-8 w-full">
                    <a *ngIf="profile.socialLinks.linkedin" [href]="profile.socialLinks.linkedin" target="_blank" class="p-3.5 bg-white/5 hover:bg-indigo-500/20 rounded-xl transition-all border border-white/10 hover:border-indigo-400/50 group/social shadow-lg hover:shadow-indigo-500/20 backdrop-blur-sm hover:-translate-y-1">
                        <svg class="w-5 h-5 text-slate-300 group-hover/social:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a *ngIf="profile.socialLinks.github" [href]="profile.socialLinks.github" target="_blank" class="p-3.5 bg-white/5 hover:bg-indigo-500/20 rounded-xl transition-all border border-white/10 hover:border-indigo-400/50 group/social shadow-lg hover:shadow-indigo-500/20 backdrop-blur-sm hover:-translate-y-1">
                        <svg class="w-5 h-5 text-slate-300 group-hover/social:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                    
                    <div class="h-12 w-px bg-white/10 hidden sm:block mx-2"></div>
                    
                    <button (click)="editSocial.emit()" class="px-5 py-3.5 bg-white/5 hover:bg-white/15 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-white/10 backdrop-blur-md flex items-center gap-2 group/links">
                        <svg class="w-4 h-4 text-indigo-300 group-hover/links:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                        {{ 'PROFILE.HERO.MANAGE_LINKS' | translate }}
                    </button>
                </div>

                <div class="inline-flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 px-6 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-inner w-full sm:w-auto relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent"></div>
                    <span class="text-indigo-300 font-black text-xs uppercase tracking-widest italic relative z-10 py-1">{{ 'PROFILE.HERO.MOTTO' | translate }}</span>
                    <p class="text-[15px] font-medium text-slate-200 italic relative z-10 flex-1">"{{ profile.professionalMotto || ('PROFILE.HERO.MOTTO_DEFAULT' | translate) }}"</p>
                </div>
            </div>
        </div>
    </div>
    `
})
export class ProfileHeroComponent {
    @Input() profile!: UserProfile;
    @Output() edit = new EventEmitter<void>();
    @Output() editSocial = new EventEmitter<void>();

    get initials(): string {
        if (!this.profile.personalInfo.fullName) return '?';
        return this.profile.personalInfo.fullName
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    }
}
