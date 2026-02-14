import { Injectable } from '@angular/core';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { Resume, Experience, Education } from '../../pages/cv-creation/models/resume.model';
import { saveAs } from 'file-saver';

@Injectable({ providedIn: 'root' })
export class WordExportService {

    async generateResume(resume: Resume) {
        const sections = [];

        // Header
        sections.push(
            new Paragraph({
                text: resume.personalInfo.fullName,
                heading: HeadingLevel.TITLE,
                alignment: AlignmentType.CENTER
            }),
            new Paragraph({
                text: resume.personalInfo.jobTitle,
                heading: HeadingLevel.HEADING_2,
                alignment: AlignmentType.CENTER
            }),
            new Paragraph({
                text: `Email: ${resume.personalInfo.email} | Phone: ${resume.personalInfo.phone}`,
                alignment: AlignmentType.CENTER
            })
        );

        // Summary
        if (resume.summary) {
            sections.push(
                new Paragraph({ text: "Professional Summary", heading: HeadingLevel.HEADING_1 }),
                new Paragraph({ text: resume.summary })
            );
        }

        // Experience
        if (resume.experience.length) {
            sections.push(new Paragraph({ text: "Experience", heading: HeadingLevel.HEADING_1 }));
            resume.experience.forEach((job: Experience) => {
                sections.push(
                    new Paragraph({
                        children: [
                            new TextRun({ text: job.jobTitle, bold: true }),
                            new TextRun({ text: ` at ${job.company}`, italics: true }),
                        ]
                    }),
                    new Paragraph({
                        text: `${job.startDate} - ${job.endDate || 'Present'}`,
                        alignment: AlignmentType.RIGHT
                    }),
                    new Paragraph({ text: job.description })
                );
            });
        }

        // Education
        if (resume.education.length) {
            sections.push(new Paragraph({ text: "Education", heading: HeadingLevel.HEADING_1 }));
            resume.education.forEach((edu: Education) => {
                sections.push(
                    new Paragraph({
                        children: [
                            new TextRun({ text: edu.degree, bold: true }),
                            new TextRun({ text: `, ${edu.school}` }),
                        ]
                    }),
                    new Paragraph({ text: `${edu.startDate} - ${edu.endDate || 'Present'}` })
                );
            });
        }

        // Skills
        if (resume.skills.length) {
            sections.push(new Paragraph({ text: "Skills", heading: HeadingLevel.HEADING_1 }));
            sections.push(new Paragraph({ text: resume.skills.join(", ") }));
        }

        const doc = new Document({
            sections: [{
                properties: {},
                children: sections
            }]
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, `${resume.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.docx`);
    }
}
