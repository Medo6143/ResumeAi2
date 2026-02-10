import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenRouterAiService } from '../../core/services/openrouter-ai.service';
import { atsPrompt } from '../../core/ai-prompts/ats.prompt';
import { AtsResult } from './models/ats-result.model';
import { AnalysisFormComponent } from './components/analysis-form/analysis-form.component';
import { AnalysisResultComponent } from './components/analysis-result/analysis-result.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-ats-analysis',
    standalone: true,
    imports: [CommonModule, AnalysisFormComponent, AnalysisResultComponent],
    templateUrl: './ats-analysis.component.html',
    styles: []
})
export class AtsAnalysisComponent {
    loading = false;
    status: string = '';
    error: string | null = null;
    errorDetail: string | null = null;
    result: AtsResult | null = null;

    // Diagnostic info
    showDiagnostics = false;
    diagnostics: string[] = [];
    isTestingConnection = false;

    constructor(
        private aiService: OpenRouterAiService,
        private cdr: ChangeDetectorRef
    ) { }

    private log(msg: string) {
        const time = new Date().toLocaleTimeString();
        this.diagnostics.push(`[${time}] ${msg}`);
        console.log(`[ATS DIAGNOSTIC] ${msg}`);
    }

    testConnection() {
        this.isTestingConnection = true;
        this.log('Testing connectivity to OpenRouter...');
        this.aiService.testConnectivity().subscribe({
            next: (success) => {
                this.isTestingConnection = false;
                this.log('Connectivity test successful!');
                alert('Connection to AI service is WORKING correctly.');
            },
            error: (err) => {
                this.isTestingConnection = false;
                this.log(`Connectivity test failed: ${err.message}`);
                alert(`Connection FAILED: ${err.message}. Check your network and API key.`);
            }
        });
    }

    onAnalyze(data: { jobTitle: string, jobDescription: string, resume: string }) {
        if (this.loading) return;

        this.loading = true;
        this.status = 'Preparing analysis...';
        this.error = null;
        this.errorDetail = null;
        this.result = null;
        this.diagnostics = [];

        this.log(`Analysis started for "${data.jobTitle}"`);
        this.log(`Resume length: ${data.resume.length} characters`);

        const prompt = atsPrompt(data.jobTitle, data.jobDescription, data.resume, 'en');
        this.log('AI Prompt generated.');

        this.status = 'Requesting AI Feedback...';
        this.log('Sending request to OpenRouter...');

        this.aiService.sendPrompt(prompt).subscribe({
            next: (response) => {
                this.log('Response received from AI.');
                this.status = 'Interpreting Results...';
                try {
                    let content = response?.choices?.[0]?.message?.content;
                    if (!content) {
                        this.log('Error: AI response content is empty.');
                        const errorMsg = response?.error?.message || 'The AI service returned an empty response.';
                        throw new Error(errorMsg);
                    }

                    this.log('Extracting and parsing JSON...');
                    // Robust JSON Extraction
                    const firstBrace = content.indexOf('{');
                    const lastBrace = content.lastIndexOf('}');

                    if (firstBrace === -1 || lastBrace === -1) {
                        this.log('Error: No valid JSON block found in the AI response.');
                        throw new Error('AI response was not in a valid format. (No JSON found)');
                    }

                    content = content.substring(firstBrace, lastBrace + 1);
                    const rawResult = JSON.parse(content);

                    // Map to expected camelCase structure regardless of what AI sent
                    this.result = {
                        score: Number(rawResult.score || rawResult.match_score || 0),
                        matchPercentage: Number(rawResult.matchPercentage || rawResult.match_percentage || rawResult.matchPercentage || 0),
                        strengths: Array.isArray(rawResult.strengths) ? rawResult.strengths : [],
                        missingSkills: Array.isArray(rawResult.missingSkills || rawResult.missing_skills) ? (rawResult.missingSkills || rawResult.missing_skills) : [],
                        recommendations: Array.isArray(rawResult.recommendations) ? rawResult.recommendations : []
                    };

                    this.log('Analysis results successfully parsed and mapped.');
                    this.log(`Mapped Result: ${JSON.stringify(this.result)}`);
                    this.status = 'Analysis Successful!';
                    this.cdr.detectChanges();
                } catch (e: any) {
                    this.log(`Critical Error: ${e.message}`);
                    this.error = 'Interpretation Failed';
                    this.errorDetail = e.message || 'The AI response could not be parsed correctly.';
                    this.status = '';
                    this.cdr.detectChanges();
                } finally {
                    this.loading = false;
                    this.cdr.detectChanges();
                }
            },
            error: (err) => {
                this.log(`Network Failure (Status ${err.status}): ${err.message}`);
                this.loading = false;
                this.status = '';

                if (err.status === 401) {
                    this.error = 'Invalid API Key';
                    this.errorDetail = 'The OpenRouter API key provided is not valid or has expired.';
                } else if (err.status === 402) {
                    this.error = 'Insufficient Credits';
                    this.errorDetail = 'Your OpenRouter account has run out of credits.';
                } else if (err.status === 0) {
                    this.error = 'Connection Blocked';
                    this.errorDetail = 'The request was blocked by your browser or network. Please check for AdBlockers or try a different browser.';
                } else {
                    this.error = 'AI service unavailable';
                    this.errorDetail = err.message || 'A network error occurred while contacting the AI.';
                }
            }
        });
    }
}
