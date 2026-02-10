export interface Resume {
    personalInfo: {
        fullName: string;
        jobTitle: string;
        email: string;
        phone: string;
        linkedin?: string;
        website?: string;
        location?: string;
    };
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: string[];
    languages: string[];
    projects: Project[];
    customSections: CustomSection[];
}

export interface Experience {
    id: string;
    jobTitle: string;
    company: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
}

export interface Education {
    id: string;
    degree: string;
    school: string;
    startDate: string;
    endDate?: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    link?: string;
}

export interface CustomSection {
    id: string;
    title: string;
    items: { name: string; description: string }[];
}

export const INITIAL_RESUME: Resume = {
    personalInfo: {
        fullName: '',
        jobTitle: '',
        email: '',
        phone: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    languages: [],
    projects: [],
    customSections: []
};
