import { Resume } from '../../cv-creation/models/resume.model';

export interface UserProfile extends Omit<Resume, 'id'> {
    id: string;
    avatarUrl?: string;
    professionalMotto?: string;
    socialLinks: {
        linkedin?: string;
        github?: string;
        portfolio?: string;
        twitter?: string;
    };
    branding: {
        headline: string;
        aiBio: string;
    };
    // Master Lists (Historical repository)
    masterExperience: Resume['experience'];
    masterEducation: Resume['education'];
    masterProjects: Resume['projects'];
    masterSkills: string[];

    // Preferences for resume generation
    preferences: {
        targetRoles: string[];
        desiredLocation: string;
        isRemote: boolean;
        salaryExpectation?: string;
    };

    strengthScore: number; // 0-100
    lastUpdated: number;
}

export const INITIAL_USER_PROFILE: UserProfile = {
    id: 'master-profile',
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        jobTitle: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    languages: [],
    projects: [],
    customSections: [],
    sectionOrder: ['summary', 'experience', 'education', 'skills', 'projects'],

    socialLinks: {},
    branding: {
        headline: '',
        aiBio: '',
    },
    masterExperience: [],
    masterEducation: [],
    masterProjects: [],
    masterSkills: [],
    preferences: {
        targetRoles: [],
        desiredLocation: '',
        isRemote: true
    },
    strengthScore: 0,
    lastUpdated: Date.now()
};
