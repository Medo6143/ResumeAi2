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
            jobTitle: 'Principal Software Architect',
            company: 'TechFlow Global Solutions',
            startDate: '2020-01',
            endDate: 'Present',
            current: true,
            description: 'Directed the architectural redesign of the core payment processing engine, improving throughput by 40%. Mentored a team of 15 senior developers and implemented CI/CD best practices.'
        },
        {
            id: '2',
            jobTitle: 'Senior Full Stack Engineer',
            company: 'Nexus Digital Systems',
            startDate: '2016-06',
            endDate: '2019-12',
            current: false,
            description: 'Developed high-performance microservices processing 10TB+ of data daily. Reduced infrastructure costs by 25% through strategic migration to Kubernetes and AWS.'
        }
    ],
    education: [
        {
            id: '1',
            school: 'Stanford University',
            degree: 'Master of Science in Computer Science',
            startDate: '2014-09',
            endDate: '2016-05'
        },
        {
            id: '2',
            school: 'Massachusetts Institute of Technology (MIT)',
            degree: 'Bachelor of Science in Software Engineering',
            startDate: '2010-09',
            endDate: '2014-05'
        }
    ],
    skills: ['System Design', 'Cloud Architecture', 'TypeScript/Angular', 'Python', 'Go', 'Kubernetes', 'AWS/Azure', 'Team Leadership', 'Agile Methodologies'],
    languages: ['English (Native)', 'German (Professional)', 'Spanish (Conversational)'],
    projects: [
        {
            id: '1',
            name: 'OpenSource Distributed Engine',
            description: 'A lightweight distributed queuing system with over 10k stars on GitHub.'
        },
        {
            id: '2',
            name: 'AI-Powered Resume Optimizer',
            description: 'Intelligent tool helping applicants boost ATS scores using NLP.'
        }
    ],
    customSections: [
        {
            id: '1',
            title: 'Certifications',
            items: [
                { name: 'Google Professional Data Engineer', description: 'Advanced data processing certification.' }
            ]
        }
    ],
    sectionOrder: ['summary', 'experience', 'education', 'skills', 'languages', 'projects', 'custom']
};
