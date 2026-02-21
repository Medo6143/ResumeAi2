import { Injectable, signal, computed, effect, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserProfile, INITIAL_USER_PROFILE } from '../models/user-profile.model';
import { AuthService } from '../../../core/services/auth.service';
import { UserDataService } from '../../../core/services/user-data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { User } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class ProfileStateService {
    private authService = inject(AuthService);
    private userDataService = inject(UserDataService);
    private profileState = signal<UserProfile>(INITIAL_USER_PROFILE);
    private isInitialized = signal(false);

    // Public signals
    profile = computed(() => this.profileState());
    strengthScore = computed(() => this.profileState().strengthScore);

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            this.loadProfile();

            // Sync with Firestore when user logs in
            this.authService.user$.pipe(
                takeUntilDestroyed(),
                filter((user: User | null) => !!user)
            ).subscribe(async (user: User | null) => {
                const profile = await this.userDataService.getMasterProfileOnce(user!.uid);
                if (profile) {
                    this.profileState.set({ ...INITIAL_USER_PROFILE, ...profile });
                }
                this.isInitialized.set(true);
            });

            // Auto-save effect
            effect(() => {
                const state = this.profileState();
                localStorage.setItem('masterUserProfile', JSON.stringify(state));

                // Save to Firestore if logged in AND initialized
                const user = this.authService.currentUser();
                if (user && this.isInitialized()) {
                    this.userDataService.saveMasterProfile(user.uid, state);
                }
            });
        }
    }

    async sync() {
        if (isPlatformBrowser(this.platformId)) {
            const user = this.authService.currentUser();
            if (user) {
                const profile = await this.userDataService.getMasterProfileOnce(user.uid);
                if (profile) {
                    this.profileState.set({ ...INITIAL_USER_PROFILE, ...profile });
                    localStorage.setItem('masterUserProfile', JSON.stringify(profile));
                }
            } else {
                this.loadProfile();
            }
            this.calculateStrength();
        }
    }

    private loadProfile() {
        const saved = localStorage.getItem('masterUserProfile');
        if (saved) {
            try {
                const profile = JSON.parse(saved);
                this.profileState.set({ ...INITIAL_USER_PROFILE, ...profile });
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

    // --- Projects ---
    addProject(project: UserProfile['projects'][0]) {
        this.profileState.update(current => ({
            ...current,
            masterProjects: [project, ...current.masterProjects],
            lastUpdated: Date.now()
        }));
        this.calculateStrength();
    }

    updateProject(id: string, project: Partial<UserProfile['projects'][0]>) {
        this.profileState.update(current => ({
            ...current,
            masterProjects: current.masterProjects.map(p => p.id === id ? { ...p, ...project } : p),
            lastUpdated: Date.now()
        }));
        this.calculateStrength();
    }

    deleteProject(id: string) {
        this.profileState.update(current => ({
            ...current,
            masterProjects: current.masterProjects.filter(p => p.id !== id),
            lastUpdated: Date.now()
        }));
        this.calculateStrength();
    }

    // --- Languages ---
    updateLanguages(languages: string[]) {
        this.profileState.update(current => ({
            ...current,
            masterLanguages: languages,
            lastUpdated: Date.now()
        }));
        this.calculateStrength();
    }

    // --- Certifications ---
    addCertification(cert: UserProfile['masterCertifications'][0]) {
        this.profileState.update(current => ({
            ...current,
            masterCertifications: [cert, ...current.masterCertifications],
            lastUpdated: Date.now()
        }));
        this.calculateStrength();
    }

    updateCertification(id: string, cert: Partial<UserProfile['masterCertifications'][0]>) {
        this.profileState.update(current => ({
            ...current,
            masterCertifications: current.masterCertifications.map(c => c.id === id ? { ...c, ...cert } : c),
            lastUpdated: Date.now()
        }));
        this.calculateStrength();
    }

    deleteCertification(id: string) {
        this.profileState.update(current => ({
            ...current,
            masterCertifications: current.masterCertifications.filter(c => c.id !== id),
            lastUpdated: Date.now()
        }));
        this.calculateStrength();
    }

    // --- Custom Sections ---
    addCustomSection(section: UserProfile['masterCustomSections'][0]) {
        this.profileState.update(current => ({
            ...current,
            masterCustomSections: [...current.masterCustomSections, section],
            lastUpdated: Date.now()
        }));
    }

    updateCustomSection(id: string, section: Partial<UserProfile['masterCustomSections'][0]>) {
        this.profileState.update(current => ({
            ...current,
            masterCustomSections: current.masterCustomSections.map(s => s.id === id ? { ...s, ...section } : s),
            lastUpdated: Date.now()
        }));
    }

    deleteCustomSection(id: string) {
        this.profileState.update(current => ({
            ...current,
            masterCustomSections: current.masterCustomSections.filter(s => s.id !== id),
            lastUpdated: Date.now()
        }));
    }

    private calculateStrength() {
        const p = this.profileState();
        let score = 0;

        if (p.personalInfo.fullName) score += 5;
        if (p.personalInfo.email) score += 5;
        if (p.personalInfo.jobTitle) score += 5;
        if (p.summary && p.summary.length > 50) score += 10;
        if (p.masterExperience.length > 0) score += 20;
        if (p.masterEducation.length > 0) score += 10;
        if (p.masterSkills.length > 0) score += 10;
        if (p.masterProjects.length > 0) score += 10;
        if (p.masterLanguages.length > 0) score += 5;
        if (p.masterCertifications.length > 0) score += 10;
        if (p.socialLinks.linkedin || p.socialLinks.github) score += 10;

        this.profileState.update(current => ({
            ...current,
            strengthScore: Math.min(100, score)
        }));
    }
}
