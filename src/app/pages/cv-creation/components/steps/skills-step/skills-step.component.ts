import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormControl } from '@angular/forms';
import { CvStateService } from '../../../services/cv-state.service';
import { OpenRouterAiService } from '../../../../../core/services/openrouter-ai.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-skills-step',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule],
    templateUrl: './skills-step.component.html'
})
export class SkillsStepComponent implements OnInit {
    skillsInput = new FormControl('');
    skillsList: string[] = [];
    isAnalyzingSkills = signal(false);

    constructor(
        private cvState: CvStateService,
        private ai: OpenRouterAiService
    ) { }

    ngOnInit() {
        this.skillsList = this.cvState.resume().skills || [];
        this.updateInput();

        // Sync on change
        this.skillsInput.valueChanges.subscribe(() => {
            // Debounce? For now just parse on blur mostly, but if user types we wait
        });
    }

    parseSkills() {
        const input = this.skillsInput.value || '';
        if (input) {
            this.skillsList = input
                .split(/[,;\n]/)
                .map((s: string) => s.trim())
                .filter((s: string) => s.length > 0)
                // unique
                .filter((s: string, i: number, arr: string[]) => arr.indexOf(s) === i);

            this.cvState.updateSkills(this.skillsList);
        } else {
            this.skillsList = [];
            this.cvState.updateSkills([]);
        }
    }

    private updateInput() {
        this.skillsInput.setValue(this.skillsList.join(', '));
    }

    removeSkill(index: number) {
        this.skillsList.splice(index, 1);
        this.updateInput();
        this.cvState.updateSkills(this.skillsList);
    }

    analyzeSkills() {
        const jobTitle = this.cvState.resume().personalInfo.jobTitle;
        if (!jobTitle) {
            alert('Please enter your job title in the Personal Info step first.');
            return;
        }

        this.isAnalyzingSkills.set(true);

        this.ai.suggestSkillsForJob(jobTitle)
            .subscribe({
                next: (skills: string[]) => {
                    // Merge unique
                    this.skillsList = [...new Set([...this.skillsList, ...skills])];
                    this.cvState.updateSkills(this.skillsList);
                    this.updateInput();
                    this.isAnalyzingSkills.set(false);
                },
                error: (err) => {
                    console.error(err);
                    this.isAnalyzingSkills.set(false);
                    alert('AI failed to suggest skills.');
                }
            });
    }
}
