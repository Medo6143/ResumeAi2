import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OpenRouterAiService } from '../../../core/services/openrouter-ai.service';
import { Resume } from '../models/resume.model';

export interface InterviewQuestion {
    question: string;
    context: string; // Why this question was asked (e.g., "Based on your project X")
    answerTip: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface InterviewFeedback {
    score: number;
    feedback: string;
    improvementTip: string;
}

@Injectable({ providedIn: 'root' })
export class InterviewGeneratorService {

    constructor(private aiService: OpenRouterAiService) { }

    generateQuestions(resume: Resume): Observable<InterviewQuestion[]> {
        const prompt = `
        detailed analysis of the following resume to generate 5 mock interview questions.

        RESUME:
        Name: ${resume.personalInfo.fullName}
        Title: ${resume.personalInfo.jobTitle}
        Summary: ${resume.summary}
        Skills: ${resume.skills.join(', ')}
        Experience: ${resume.experience.map(e => `${e.jobTitle} at ${e.company}: ${e.description}`).join('; ')}
        Projects: ${resume.projects.map(p => `${p.name}: ${p.description}`).join('; ')}

        Generate 5 diverse interview questions (Technical, Behavioral, and situational).
        For each question, explain WHY you asked it (Context) and provide a short Answer Tip.

        Return a JSON array strictly in this format:
        [
            {
                "question": "The actual question",
                "context": "Based on your experience at Company X...",
                "answerTip": "Focus on your leadership skills...",
                "difficulty": "Medium"
            }
        ]
        `;

        return this.aiService.sendPrompt(prompt).pipe(
            map((res: any) => {
                const content = res?.choices?.[0]?.message?.content;
                if (!content) throw new Error('No AI response');

                try {
                    const cleanText = content.replace(/```json/g, '').replace(/```/g, '').trim();
                    return JSON.parse(cleanText) as InterviewQuestion[];
                } catch (e) {
                    console.error('Failed to parse AI response', e);
                    return [];
                }
            })
        );
    }

    evaluateAnswer(question: string, answer: string): Observable<InterviewFeedback> {
        const prompt = `
        Evaluate the following answer to a mock interview question.

        QUESTION: "${question}"
        ANSWER: "${answer}"

        Provide a structured evaluation in JSON format:
        {
            "score": 85, // 0-100
            "feedback": "Good use of STAR method, but could be more specific about results.",
            "improvementTip": "Mention metrics like % increase in efficiency."
        }
        `;

        return this.aiService.sendPrompt(prompt).pipe(
            map((res: any) => {
                const content = res?.choices?.[0]?.message?.content;
                if (!content) throw new Error('No AI response');
                try {
                    const cleanText = content.replace(/```json/g, '').replace(/```/g, '').trim();
                    return JSON.parse(cleanText) as InterviewFeedback;
                } catch (e) {
                    return { score: 0, feedback: 'Failed to parse feedback', improvementTip: 'Try again' };
                }
            })
        );
    }
}
