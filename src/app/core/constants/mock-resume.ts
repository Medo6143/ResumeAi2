import { Resume } from '../../pages/cv-creation/models/resume.model';

export const MOCK_RESUME: Resume = {
    personalInfo: {
        fullName: 'Alexander J. Sterling',
        jobTitle: 'Senior Software Architect',
        email: 'alex.sterling@example.com',
        phone: '+1 (555) 000-1234',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/alexsterling'
    },
    summary: 'Highly accomplished Software Architect with 12+ years of experience in distributed systems and cloud-native applications. Proven track record of leading cross-functional teams to deliver scalable solutions for Fortune 500 companies.',
    experience: [
        {
            id: '1',
            jobTitle: 'Principal Engineer',
            company: 'TechFlow Systems',
            startDate: '2020-01',
            endDate: 'Present',
            current: true,
            description: 'Directed the architectural redesign of the core payment processing engine, improving throughput by 40%. Mentored a team of 15 senior developers across three time zones.'
        },
        {
            id: '2',
            jobTitle: 'Senior Software Engineer',
            company: 'DataStream Inc.',
            startDate: '2015-06',
            endDate: '2019-12',
            current: false,
            description: 'Developed high-performance ETL pipelines processing 10TB+ of data daily. Reduced infrastructure costs by 25% through strategic migration to Kubernetes.'
        }
    ],
    education: [
        {
            id: '1',
            school: 'Stanford University',
            degree: 'M.S. in Computer Science',
            startDate: '2013-09',
            endDate: '2015-05'
        }
    ],
    skills: ['System Design', 'Cloud Architecture', 'Distributed Systems', 'Python', 'Go', 'Kubernetes', 'AWS/Azure', 'Team Leadership'],
    languages: ['English (Native)', 'German (Professional)'],
    projects: [
        {
            id: '1',
            name: 'OpenSource ML Framework',
            description: 'A lightweight machine learning library with over 5k stars on GitHub.'
        }
    ],
    customSections: []
};
