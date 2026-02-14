import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfile } from '../models/user-profile.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-profile-hero',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    template: `
    <div class="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-8 md:p-12 text-white shadow-2xl">
        <!-- Abstract Decorations -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]"></div>
        <div class="absolute -bottom-10 -left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>

        <div class="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <!-- Avatar Section -->
            <div class="relative group">
                <div class="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/10 overflow-hidden bg-slate-700 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                    <img *ngIf="profile.avatarUrl" [src]="profile.avatarUrl" class="w-full h-full object-cover">
                    <div *ngIf="!profile.avatarUrl" class="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                        <span class="text-4xl md:text-5xl font-black">{{ initials }}</span>
                    </div>
                </div>
                <button class="absolute bottom-2 right-2 p-3 bg-white text-slate-900 rounded-2xl shadow-xl hover:scale-110 active:scale-95 transition-all">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </div>

            <!-- Info Section -->
            <div class="flex-1 text-center md:text-left">
                <div class="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 mb-2">
                    <h1 class="text-3xl md:text-5xl font-black tracking-tight">{{ profile.personalInfo.fullName || ('PROFILE.HERO.IDENTITY_PLACEHOLDER' | translate) }}</h1>
                    <button (click)="edit.emit()" class="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-[10px] font-black uppercase tracking-widest transition-all">{{ 'PROFILE.HERO.EDIT_IDENTITY' | translate }}</button>
                </div>
                <p class="text-lg md:text-xl text-indigo-300 font-bold mb-6 tracking-wide uppercase">{{ profile.personalInfo.jobTitle || ('PROFILE.HERO.TITLE_PLACEHOLDER' | translate) }}</p>
                
                <div class="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
                    <a *ngIf="profile.socialLinks.linkedin" [href]="profile.socialLinks.linkedin" target="_blank" class="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                    <a *ngIf="profile.socialLinks.github" [href]="profile.socialLinks.github" target="_blank" class="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                    <button (click)="editSocial.emit()" class="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/5">{{ 'PROFILE.HERO.MANAGE_LINKS' | translate }}</button>
                </div>

                <div class="inline-flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                    <span class="text-indigo-400 font-black text-sm uppercase tracking-widest italic">{{ 'PROFILE.HERO.MOTTO' | translate }}</span>
                    <p class="text-sm font-medium text-slate-300 italic">"{{ profile.professionalMotto || ('PROFILE.HERO.MOTTO_DEFAULT' | translate) }}"</p>
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
