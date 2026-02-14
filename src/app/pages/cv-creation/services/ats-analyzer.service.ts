import { Injectable, inject } from '@angular/core';
import { Resume } from '../models/resume.model';
import { OpenRouterAiService } from '../../../core/services/openrouter-ai.service';
import { atsPrompt } from '../../../core/ai-prompts/ats.prompt';
import { Observable, map } from 'rxjs';

export interface AtsAnalysisResult {
    score: number;
    breakdown: {
        contact: number;
        content: number;
        keywords: number;
        formatting: number;
    };
    recommendations: string[];
}

@Injectable({ providedIn: 'root' })
export class AtsAnalyzerService {
    private aiService = inject(OpenRouterAiService);

    analyze(resume: Resume): AtsAnalysisResult {
        let recommendations: string[] = [];
        let contactScore = 0;
        let contentScore = 0;
        let keywordsScore = 0;
        let formattingScore = 0;

        const ACTION_VERBS = ['led', 'managed', 'developed', 'implemented', 'designed', 'optimized', 'streamlined', 'spearheaded', 'coordinated', 'architected', 'built', 'mentored', 'increased', 'reduced'];
        const METRIC_REGEX = /\d+(%|\+)?\s*(users|growth|revenue|reduction|increase|faster|budget|team)?/i;

        // 1. Contact Info (25 points)
        if (resume.personalInfo.fullName) contactScore += 5;

        if (resume.personalInfo.email) {
            const isProfessional = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(resume.personalInfo.email);
            contactScore += isProfessional ? 10 : 5;
            if (!isProfessional) recommendations.push('Use a professional email format.');
        } else {
            recommendations.push('Add an email address for recruiters to contact you.');
        }

        if (resume.personalInfo.phone) contactScore += 5;
        else recommendations.push('Add a phone number.');

        if (resume.personalInfo.linkedin) contactScore += 5;
        else if (resume.personalInfo.website) contactScore += 3;
        else recommendations.push('Add a LinkedIn profile for better credibility.');

        // 2. Content & Experience Quality (25 points)
        if (resume.summary && resume.summary.length > 50) contentScore += 5;
        else recommendations.push('A strong summary (50+ chars) improves your ATS ranking.');

        if (resume.experience && resume.experience.length > 0) {
            contentScore += 5;
            let hasActionVerbs = false;
            let hasMetrics = false;

            resume.experience.forEach(exp => {
                const desc = exp.description?.toLowerCase() || '';
                if (ACTION_VERBS.some(v => desc.includes(v))) hasActionVerbs = true;
                if (METRIC_REGEX.test(desc)) hasMetrics = true;
            });

            if (hasActionVerbs) contentScore += 10;
            else recommendations.push('Use strong action verbs (e.g., "Developed", "Optimized") in your experience.');

            if (hasMetrics) contentScore += 5;
            else recommendations.push('Add quantifiable results (e.g., "Increased sales by 20%", "Managed 10+ users").');
        } else {
            recommendations.push('Work experience is crucial for ATS matching.');
        }

        // 3. Keywords & Role Alignment (25 points)
        const jobTitle = resume.personalInfo.jobTitle?.toLowerCase() || '';
        const skillsCount = resume.skills?.length || 0;

        if (skillsCount >= 8) keywordsScore += 15;
        else if (skillsCount >= 5) keywordsScore += 10;
        else recommendations.push('List at least 8 relevant skills to bypass ATS filters.');

        // Check if skills match job title
        if (jobTitle) {
            const titleWords = jobTitle.split(' ').filter(w => w.length > 3);
            const hasMatch = titleWords.some(tw =>
                resume.skills.some(s => s.toLowerCase().includes(tw)) ||
                resume.summary?.toLowerCase().includes(tw)
            );

            if (hasMatch) keywordsScore += 10;
            else recommendations.push(`Add keywords related to "${resume.personalInfo.jobTitle}" in your skills or summary.`);
        } else {
            keywordsScore += 5; // Default if no title
        }

        // 4. Formatting & Structure (25 points)
        let sections = 0;
        if (resume.personalInfo.fullName && resume.personalInfo.jobTitle) sections++;
        if (resume.summary) sections++;
        if (resume.experience.length > 0) sections++;
        if (resume.education.length > 0) sections++;
        if (resume.skills.length > 4) sections++;

        formattingScore = (sections / 5) * 25;
        if (sections < 5) recommendations.push('Ensure your resume includes all standard sections (Summary, Experience, Education, Skills).');

        const totalScore = Math.min(100, contactScore + contentScore + keywordsScore + formattingScore);

        return {
            score: Math.round(totalScore),
            breakdown: {
                contact: contactScore,
                content: contentScore,
                keywords: keywordsScore,
                formatting: formattingScore
            },
            recommendations
        };
    }

    deepScan(resume: Resume): Observable<AtsAnalysisResult> {
        // Convert resume to text for AI
        const resumeText = JSON.stringify(resume);
        const prompt = atsPrompt(resume.personalInfo.jobTitle, '', resumeText);

        return this.aiService.sendPrompt(prompt).pipe(
            map(response => {
                let content = response?.choices?.[0]?.message?.content || '{}';

                // Robust extraction
                const firstBrace = content.indexOf('{');
                const lastBrace = content.lastIndexOf('}');
                if (firstBrace !== -1 && lastBrace !== -1) {
                    content = content.substring(firstBrace, lastBrace + 1);
                }

                try {
                    const raw = JSON.parse(content);
                    return {
                        score: Math.round(raw.score || 0),
                        breakdown: {
                            contact: 25,
                            content: Math.round((raw.score || 0) * 0.4), // Weighted
                            keywords: Math.round((raw.score || 0) * 0.3),
                            formatting: Math.round((raw.score || 0) * 0.3)
                        },
                        recommendations: raw.recommendations || []
                    };
                } catch (e) {
                    console.error('Failed to parse AI ATS response', e);
                    return this.analyze(resume); // Fallback to heuristics
                }
            })
        );
    }
}
