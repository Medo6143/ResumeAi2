import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OpenRouterAiService {
    private apiUrl = 'https://openrouter.ai/api/v1/chat/completions';

    constructor(private http: HttpClient) { }

    sendPrompt(prompt: string, attempt = 0): Observable<any> {
        const models = [
      
            "openrouter/auto"
        ];

        const selectedModel = models[attempt] || models[0];

        const headers = new HttpHeaders({
            'Authorization': `Bearer ${environment.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://resume-studio.ai', // Required by OpenRouter for free tier
            'X-Title': 'Resume Studio'
        });

        const body = {
            model: selectedModel,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.3,
            max_tokens: 1500
        };

        console.log(`[AI Request] Attempt ${attempt + 1}/${models.length} | Model: ${selectedModel}`);

        return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
            timeout(30000), // 30s timeout for faster fallback
            catchError(error => {
                const isTimeout = error.name === 'TimeoutError';
                // Add 402 (Payment Required) to retryable statuses to allow fallback to free models
                const isRetryableStatus = [0, 402, 404, 408, 429, 500, 502, 503, 504].includes(error.status);

                if (attempt < models.length - 1 && (isTimeout || isRetryableStatus)) {
                    console.warn(`[AI Fallback] ${selectedModel} failed. Trying next model...`);
                    return this.sendPrompt(prompt, attempt + 1);
                }

                console.error('[AI Final Error]', {
                    model: selectedModel,
                    status: error.status,
                    message: error.message,
                    errorDetails: error.error
                });

                const enhancedError = error;
                (enhancedError as any).modelUsed = selectedModel;
                return throwError(() => enhancedError);
            })
        );
    }

    generateProfileSummary(fullName: string, jobTitle: string, skills: string[], company?: string): Observable<string> {
        const prompt = `Write a professional resume summary for ${fullName}, a ${jobTitle}. 
    Key skills: ${skills.join(', ')}. 
    ${company ? `Most recent experience: ${company}` : ''}
    
    IMPORTANT: You MUST start the summary strictly with the exact phrase: "I am ${fullName} and I am a ${jobTitle}".
    Make the rest concise (max 3 sentences), professional, and impactful.`;

        return this.sendPrompt(prompt).pipe(makeContentOnly());
    }

    improveResumeSection(content: string, sectionType: string, role: string): Observable<string> {
        const prompt = `Rewrite and improve the following ${sectionType} section for a ${role} position.
    Use strong action verbs, quantify achievements where possible, and make it sound professional.
    Original Content:
    ${content}
    
    Return ONLY the improved text.`;

        return this.sendPrompt(prompt).pipe(makeContentOnly());
    }

    suggestSkillsForJob(jobTitle: string): Observable<string[]> {
        const prompt = `List 10 key technical and soft skills for a ${jobTitle} role.
    Return ONLY a comma-separated list of skills.`;

        return this.sendPrompt(prompt).pipe(
            makeContentOnly(),
            // @ts-ignore
            map(text => text.split(',').map(s => s.trim()))
        );
    }

    updateCvFromChat(currentResume: any, userMessage: string): Observable<any> {
        const prompt = `
    You are an AI Resume Assistant. The user wants to update their resume.
    
    Current Resume State (JSON):
    ${JSON.stringify(currentResume)}
    
    User Request: "${userMessage}"
    
    Return a JSON object with this structure:
    {
      "message": "A friendly confirmation message explaining what you did.",
      "action": "update" | "add",
      "path": "The path to the field being updated (e.g., 'personalInfo.phone', 'experience[0].description', 'skills')",
      "value": "The new value for the field"
    }
    
    Rules:
    - If the user asks to change the summary, set path to 'summary'.
    - If the user asks to add a skill, set path to 'skills' and value to the new skill(s) array.
    - If the user asks to fix the description of the first job, set path to 'experience[0].description'.
    - Respond strictly in JSON format without markdown.
    `;

        return this.sendPrompt(prompt).pipe(
            makeContentOnly(),
            // @ts-ignore
            map(text => {
                try {
                    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
                    return JSON.parse(cleanText);
                } catch (e) {
                    return { message: text }; // Fallback to plain text
                }
            })
        );
    }

    testConnectivity(): Observable<boolean> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${environment.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json'
        });
        const body = {
            model: "google/gemini-flash-1.5",
            messages: [{ role: 'user', content: 'Say connected' }],
            max_tokens: 10
        };
        return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
            timeout(10000),
            map(res => !!res?.choices?.[0]?.message?.content),
            catchError(() => throwError(() => new Error('Connection failed')))
        );
    }
}

// Helper operator to extract content
import { map } from 'rxjs/operators';
const makeContentOnly = () => map((res: any) => {
    if (!res?.choices?.[0]?.message?.content) {
        console.warn('AI Response missing content:', res);
        return '';
    }
    return res.choices[0].message.content;
});
