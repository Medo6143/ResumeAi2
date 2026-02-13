import { Injectable, signal, computed, effect, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Resume, INITIAL_RESUME } from '../models/resume.model';

@Injectable({ providedIn: 'root' })
export class CvStateService {
    // The single source of truth for the Resume data
    private resumeState = signal<Resume>(INITIAL_RESUME);

    // Read-only signal for consumers
    resume = computed(() => this.resumeState());

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            // Load state
            const saved = sessionStorage.getItem('resumeState');
            if (saved) {
                try {
                    this.resumeState.set(JSON.parse(saved));
                } catch (e) { console.error('Failed to load resume state', e); }
            }

            // Auto-save effect
            effect(() => {
                const state = this.resumeState();
                sessionStorage.setItem('resumeState', JSON.stringify(state));
            });
        }
    }

    updatePersonalInfo(info: Partial<Resume['personalInfo']>) {
        this.resumeState.update(current => ({
            ...current,
            personalInfo: { ...current.personalInfo, ...info }
        }));
    }

    updateSummary(summary: string) {
        this.resumeState.update(current => ({ ...current, summary }));
    }

    updateExperience(experience: Resume['experience']) {
        this.resumeState.update(current => ({ ...current, experience }));
    }

    updateEducation(education: Resume['education']) {
        this.resumeState.update(current => ({ ...current, education }));
    }

    updateProjects(projects: Resume['projects']) {
        this.resumeState.update(current => ({ ...current, projects }));
    }

    updateSkills(skills: string[]) {
        this.resumeState.update(current => ({ ...current, skills }));
    }

    updateCustomSections(customSections: Resume['customSections']) {
        this.resumeState.update(current => ({ ...current, customSections }));
    }

    // Helper to update entire resume (e.g. from AI generation)
    setResume(resume: Resume) {
        this.resumeState.set(resume);
    }
}
