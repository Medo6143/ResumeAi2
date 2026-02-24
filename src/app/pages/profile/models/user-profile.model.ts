import { Resume } from '../../cv-creation/models/resume.model';

export interface UserProfile extends Omit<Resume, 'id'> {
    id: string;
    role?: 'user' | 'admin';
    status?: 'active' | 'blocked';
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
    masterLanguages: string[];
    masterCertifications: Resume['certifications'];
    masterCustomSections: Resume['customSections'];
    masterSkills: string[];

    // Preferences for resume generation
    preferences: {
        targetRoles: string[];
        desiredLocation: string;
        isRemote: boolean;
        salaryExpectation?: string;
        theme: 'light' | 'dark' | 'system';
        language: 'en' | 'ar';
    };

    strengthScore: number; // 0-100
    lastUpdated: number;
}

export const INITIAL_USER_PROFILE: UserProfile = {
    id: 'master-profile',
    role: 'user',
    status: 'active',
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
    certifications: [],
    customSections: [],
    sectionOrder: ['summary', 'experience', 'education', 'projects', 'skills', 'languages', 'certifications'],

    socialLinks: {},
    branding: {
        headline: '',
        aiBio: '',
    },
    masterExperience: [],
    masterEducation: [],
    masterProjects: [],
    masterLanguages: [],
    masterCertifications: [],
    masterCustomSections: [],
    masterSkills: [],
    preferences: {
        targetRoles: [],
        desiredLocation: '',
        isRemote: true,
        theme: 'system',
        language: 'en'
    },
    strengthScore: 0,
    lastUpdated: Date.now()
};
