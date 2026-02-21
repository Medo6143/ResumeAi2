import { Injectable, signal, computed, effect, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Resume, INITIAL_RESUME } from '../models/resume.model';
import { ProfileStateService } from '../../profile/services/profile-state.service';
import { AuthService } from '../../../core/services/auth.service';
import { UserDataService } from '../../../core/services/user-data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { User } from '@angular/fire/auth';

export interface Profile {
    id: string;
    name: string;
    data: Resume;
    updatedAt: number;
}

export interface ProfileState {
    profiles: Profile[];
    activeProfileId: string;
}

const INITIAL_STATE: ProfileState = {
    profiles: [],
    activeProfileId: ''
};

@Injectable({ providedIn: 'root' })
export class CvStateService {
    private authService = inject(AuthService);
    private userDataService = inject(UserDataService);
    private profileStateService = inject(ProfileStateService);
    // The single source of truth for the Profile data
    private state = signal<ProfileState>(INITIAL_STATE);
    private isInitialized = signal(false);

    // Computed signals for consumers
    profiles = computed(() => this.state().profiles);
    activeProfileId = computed(() => this.state().activeProfileId);

    // The current active resume
    resume = computed(() => {
        const current = this.state();
        const profile = current.profiles.find(p => p.id === current.activeProfileId);
        return profile ? profile.data : INITIAL_RESUME;
    });

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            this.loadState();

            // Sync with Firestore when user logs in
            this.authService.user$.pipe(
                takeUntilDestroyed(),
                filter((user: User | null) => !!user)
            ).subscribe(async (user: User | null) => {
                const firestoreProfiles = await this.userDataService.getResumesOnce(user!.uid);
                if (firestoreProfiles && firestoreProfiles.length > 0) {
                    this.state.update(current => {
                        const profiles = firestoreProfiles.map(p => ({
                            id: p.id,
                            name: p.name,
                            data: p.data,
                            updatedAt: p.updatedAt
                        }));
                        const activeId = profiles.some(p => p.id === current.activeProfileId)
                            ? current.activeProfileId
                            : profiles[0].id;

                        return { profiles, activeProfileId: activeId };
                    });
                }
                this.isInitialized.set(true);
            });

            // Auto-save effect
            effect(() => {
                const state = this.state();
                sessionStorage.setItem('resumeProfilesState', JSON.stringify(state));

                // Save to Firestore if logged in AND initialized
                const user = this.authService.currentUser();
                if (user && this.isInitialized()) {
                    // We only save the profiles themselves, not the activeProfileId (optional)
                    state.profiles.forEach(profile => {
                        this.userDataService.saveResume(user.uid, profile.id, profile);
                    });
                }
            });
        }
    }

    private loadState() {
        // Try loading new state format
        const savedState = sessionStorage.getItem('resumeProfilesState');
        if (savedState) {
            try {
                this.state.set(JSON.parse(savedState));
                return;
            } catch (e) {
                console.error('Failed to load profile state', e);
            }
        }

        // Migration: Check for old single-resume state
        const oldResume = sessionStorage.getItem('resumeState');
        if (oldResume) {
            try {
                const data = JSON.parse(oldResume);
                this.createProfile('Default Profile', data);
                // Optional: clear old state
                // sessionStorage.removeItem('resumeState'); 
                return;
            } catch (e) {
                console.error('Failed to migrate old resume state', e);
            }
        }

        // Initialize with default if nothing exists
        this.createProfile('My Resume');
    }

    // --- Profile Management ---

    createProfile(name: string, initialData: Resume = INITIAL_RESUME) {
        const newProfile: Profile = {
            id: crypto.randomUUID(),
            name,
            data: JSON.parse(JSON.stringify(initialData)), // Deep copy
            updatedAt: Date.now()
        };

        this.state.update(current => ({
            profiles: [...current.profiles, newProfile],
            activeProfileId: newProfile.id
        }));
    }

    deleteProfile(id: string) {
        this.state.update(current => {
            const newProfiles = current.profiles.filter(p => p.id !== id);
            let newActiveId = current.activeProfileId;

            // If we deleted the active profile, switch to the first available or create new
            if (id === current.activeProfileId) {
                newActiveId = newProfiles.length > 0 ? newProfiles[0].id : '';
            }

            return {
                profiles: newProfiles,
                activeProfileId: newActiveId
            };
        });

        // Delete from Firestore if logged in
        const user = this.authService.currentUser();
        if (user) {
            this.userDataService.deleteResume(user.uid, id).catch(err => {
                console.error('Failed to delete resume from Firestore', err);
            });
        }

        // If all profiles deleted, create a default one
        if (this.state().profiles.length === 0) {
            this.createProfile('My Resume');
        }
    }

    switchProfile(id: string) {
        if (this.state().profiles.some(p => p.id === id)) {
            this.state.update(current => ({ ...current, activeProfileId: id }));
        }
    }

    duplicateProfile(id: string) {
        const profileToClone = this.state().profiles.find(p => p.id === id);
        if (profileToClone) {
            this.createProfile(`${profileToClone.name} (Copy)`, profileToClone.data);
        }
    }

    renameProfile(id: string, newName: string) {
        this.state.update(current => ({
            ...current,
            profiles: current.profiles.map(p =>
                p.id === id ? { ...p, name: newName, updatedAt: Date.now() } : p
            )
        }));
    }

    // --- Resume Updates (Targets Active Profile) ---

    private updateActiveResume(updater: (resume: Resume) => Resume) {
        this.state.update(current => {
            const activeId = current.activeProfileId;
            return {
                ...current,
                profiles: current.profiles.map(p =>
                    p.id === activeId
                        ? { ...p, data: updater(p.data), updatedAt: Date.now() }
                        : p
                )
            };
        });
    }

    updatePersonalInfo(info: Partial<Resume['personalInfo']>) {
        this.updateActiveResume(current => ({
            ...current,
            personalInfo: { ...current.personalInfo, ...info }
        }));
    }

    updateSummary(summary: string) {
        this.updateActiveResume(current => ({ ...current, summary }));
    }

    updateExperience(experience: Resume['experience']) {
        this.updateActiveResume(current => ({ ...current, experience }));
    }

    updateEducation(education: Resume['education']) {
        this.updateActiveResume(current => ({ ...current, education }));
    }

    updateProjects(projects: Resume['projects']) {
        this.updateActiveResume(current => ({ ...current, projects }));
    }

    updateSkills(skills: string[]) {
        this.updateActiveResume(current => ({ ...current, skills }));
    }

    updateCustomSections(customSections: Resume['customSections']) {
        this.updateActiveResume(current => ({ ...current, customSections }));
    }

    // Helper to update entire resume (e.g. from AI generation)
    setResume(resume: Resume) {
        this.updateActiveResume(() => resume);
    }

    importFromMaster() {
        const master = this.profileStateService.profile();
        this.updateActiveResume(current => ({
            ...current,
            // Personal info
            personalInfo: {
                ...current.personalInfo,
                ...master.personalInfo,
                // Map social links into personalInfo fields used by CV templates
                linkedin: master.socialLinks?.linkedin || current.personalInfo.linkedin,
                github: master.socialLinks?.github || current.personalInfo.github,
                portfolio: master.socialLinks?.portfolio || current.personalInfo.portfolio,
                website: master.socialLinks?.portfolio || current.personalInfo.website,
            },
            // Summary
            summary: master.summary || current.summary,
            // All master lists
            experience: master.masterExperience?.length
                ? master.masterExperience.map(e => ({ ...e }))
                : current.experience,
            projects: master.masterProjects?.length
                ? master.masterProjects.map(p => ({
                    ...p,
                    githubLink: p.githubLink || '',
                    demoLink: p.demoLink || ''
                }))
                : current.projects,
            certifications: master.masterCertifications?.length
                ? master.masterCertifications.map(c => ({ ...c }))
                : current.certifications,
            customSections: master.masterCustomSections?.length
                ? master.masterCustomSections.map(s => ({ ...s }))
                : current.customSections,
            skills: master.masterSkills?.length
                ? [...master.masterSkills]
                : current.skills,
            languages: master.masterLanguages?.length
                ? [...master.masterLanguages]
                : current.languages,
        }));
    }
}
