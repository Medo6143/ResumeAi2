import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CvStateService } from '../../../services/cv-state.service';
import { OpenRouterAiService } from '../../../../../core/services/openrouter-ai.service';

@Component({
    selector: 'app-summary-step',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './summary-step.component.html',
    styles: []
})
export class SummaryStepComponent {
    summary = '';
    loading = false;

    constructor(
        public cvState: CvStateService,
        private ai: OpenRouterAiService
    ) {
        this.summary = this.cvState.resume().summary;
    }

    updateSummary(value: string) {
        this.summary = value;
        this.cvState.updateSummary(value);
    }

    generateAiSummary() {
        const jobTitle = this.cvState.resume().personalInfo.jobTitle;
        if (!jobTitle) {
            alert('Please enter a Job Title in the previous step first!');
            return;
        }

        this.loading = true;
        const prompt = `Write a professional resume summary for a ${jobTitle}. 
    Make it concise (max 3 sentences), impactful, and use strong action verbs.
    Do not include any placeholders like [Years of Experience].`;

        this.ai.sendPrompt(prompt).subscribe({
            next: (res) => {
                let content = res.choices[0].message.content;
                this.updateSummary(content);
                this.loading = false;
            },
            error: () => this.loading = false
        });
    }
}
