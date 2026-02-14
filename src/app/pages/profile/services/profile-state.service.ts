import { Injectable, signal, computed, effect, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserProfile, INITIAL_USER_PROFILE } from '../models/user-profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileStateService {
    private profileState = signal<UserProfile>(INITIAL_USER_PROFILE);

    // Public signals
    profile = computed(() => this.profileState());
    strengthScore = computed(() => this.profileState().strengthScore);

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            this.loadProfile();

            // Auto-save effect
            effect(() => {
                const state = this.profileState();
                localStorage.setItem('masterUserProfile', JSON.stringify(state));
            });
        }
    }

    private loadProfile() {
        const saved = localStorage.getItem('masterUserProfile');
        if (saved) {
            try {
                this.profileState.set(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to load master profile', e);
            }
        }
    }

    updatePersonalInfo(info: Partial<UserProfile['personalInfo']>) {
        this.profileState.update(current => ({
            ...current,
            personalInfo: { ...current.personalInfo, ...info },
            lastUpdated: Date.now()
        }));
        this.calculateStrength();
    }

    updateSummary(summary: string) {
        this.profileState.update(current => ({
            ...current,
            summary,
            lastUpdated: Date.now()
        }));
        this.calculateStrength();
    }

    updateSocialLinks(links: Partial<UserProfile['socialLinks']>) {
        this.profileState.update(current => ({
            ...current,
            socialLinks: { ...current.socialLinks, ...links },
            lastUpdated: Date.now()
        }));
    }

    updateBranding(branding: Partial<UserProfile['branding']>) {
        this.profileState.update(current => ({
            ...current,
            branding: { ...current.branding, ...branding },
            lastUpdated: Date.now()
        }));
    }

    updateMotto(motto: string) {
        this.profileState.update(current => ({
            ...current,
            professionalMotto: motto,
            lastUpdated: Date.now()
        }));
    }

    deleteExperience(id: string) {
        this.profileState.update(current => ({
            ...current,
            masterExperience: current.masterExperience.filter(e => e.id !== id),
            lastUpdated: Date.now()
        }));
        this.calculateStrength();
    }

    updateExperience(id: string, exp: Partial<UserProfile['experience'][0]>) {
        this.profileState.update(current => ({
            ...current,
            masterExperience: current.masterExperience.map(e => e.id === id ? { ...e, ...exp } : e),
            lastUpdated: Date.now()
        }));
        this.calculateStrength();
    }

    addExperience(exp: UserProfile['experience'][0]) {
        this.profileState.update(current => ({
            ...current,
            masterExperience: [exp, ...current.masterExperience],
            lastUpdated: Date.now()
        }));
        this.calculateStrength();
    }

    updateSkills(skills: string[]) {
        this.profileState.update(current => ({
            ...current,
            masterSkills: Array.from(new Set([...current.masterSkills, ...skills])),
            lastUpdated: Date.now()
        }));
        this.calculateStrength();
    }

    private calculateStrength() {
        const p = this.profileState();
        let score = 0;

        if (p.personalInfo.fullName) score += 10;
        if (p.personalInfo.email) score += 5;
        if (p.personalInfo.jobTitle) score += 10;
        if (p.summary && p.summary.length > 100) score += 15;
        if (p.masterExperience.length > 0) score += 20;
        if (p.masterExperience.length > 2) score += 10;
        if (p.masterSkills.length > 5) score += 15;
        if (p.socialLinks.linkedin || p.socialLinks.github) score += 15;

        this.profileState.update(current => ({
            ...current,
            strengthScore: Math.min(100, score)
        }));
    }
}
