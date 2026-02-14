import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OpenRouterAiService } from '../../../core/services/openrouter-ai.service';
import { Resume } from '../models/resume.model';

export interface JobMatchResult {
    score: number;
    matchedKeywords: string[];
    missingKeywords: string[];
    recommendations: string[];
}

@Injectable({ providedIn: 'root' })
export class JobMatcherService {

    constructor(private aiService: OpenRouterAiService) { }

    analyzeMatch(resume: Resume, jobDescription: string): Observable<JobMatchResult> {
        // Convert resume to a simplified string representation to save tokens
        const resumeText = this.resumeToString(resume);

        const prompt = `
        You are an expert Resume Analyst. Compare the following Resume with the Job Description.

        JOB DESCRIPTION:
        ${jobDescription.substring(0, 2000)}... (truncated if too long)

        RESUME:
        ${resumeText.substring(0, 2000)}...

        Analyze the match. Return a JSON object strictly in this format:
        {
            "score": number (0-100),
            "matchedKeywords": ["keyword1", "keyword2"],
            "missingKeywords": ["keyword3", "keyword4"],
            "recommendations": ["suggestion 1", "suggestion 2"]
        }
        
        Rules:
        - Identify STRICTLY technical skills and important soft skills found in the JD.
        - matchedKeywords: skills present in BOTH JD and Resume.
        - missingKeywords: key skills in JD but MOT in Resume.
        - Provide actionable recommendations to improve the match.
        `;

        return this.aiService.sendPrompt(prompt).pipe(
            map((res: any) => {
                const content = res?.choices?.[0]?.message?.content;
                if (!content) throw new Error('No AI response');

                try {
                    const cleanText = content.replace(/```json/g, '').replace(/```/g, '').trim();
                    return JSON.parse(cleanText) as JobMatchResult;
                } catch (e) {
                    console.error('Failed to parse AI response', e);
                    return {
                        score: 0,
                        matchedKeywords: [],
                        missingKeywords: [],
                        recommendations: ['Failed to analyze. Please try again.']
                    };
                }
            })
        );
    }

    private resumeToString(resume: Resume): string {
        return `
        Name: ${resume.personalInfo.fullName}
        Title: ${resume.personalInfo.jobTitle}
        Summary: ${resume.summary}
        Skills: ${resume.skills.join(', ')}
        Experience: ${resume.experience.map(e => `${e.jobTitle} at ${e.company}: ${e.description}`).join('; ')}
        Projects: ${resume.projects.map(p => `${p.name}: ${p.description}`).join('; ')}
        `;
    }
}
