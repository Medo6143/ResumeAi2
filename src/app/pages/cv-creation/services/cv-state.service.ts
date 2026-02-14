import { Injectable, signal, computed, effect, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Resume, INITIAL_RESUME } from '../models/resume.model';
import { ProfileStateService } from '../../profile/services/profile-state.service';

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
    private profileStateService = inject(ProfileStateService);
    // The single source of truth for the Profile data
    private state = signal<ProfileState>(INITIAL_STATE);

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

            // Auto-save effect
            effect(() => {
                const state = this.state();
                sessionStorage.setItem('resumeProfilesState', JSON.stringify(state));
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
            personalInfo: { ...master.personalInfo },
            summary: master.summary,
            skills: [...master.masterSkills],
            languages: [...master.languages],
            // We only import basic info, experience/projects might needs selection UI later
        }));
    }
}
