import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CvStateService } from '../../../services/cv-state.service';
import { OpenRouterAiService } from '../../../../../core/services/openrouter-ai.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-experience-step',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TranslateModule],
    templateUrl: './experience-step.component.html'
})
export class ExperienceStepComponent implements OnInit {
    form: FormGroup;
    loadingExperience = signal<Set<number>>(new Set());

    constructor(
        private fb: FormBuilder,
        private cvState: CvStateService,
        private ai: OpenRouterAiService
    ) {
        this.form = this.fb.group({
            experience: this.fb.array([])
        });

        // Auto-save
        this.form.valueChanges.subscribe(val => {
            this.cvState.updateExperience(val.experience);
        });
    }

    ngOnInit() {
        // Load initial data
        const existingExp = this.cvState.resume().experience;
        if (existingExp.length > 0) {
            existingExp.forEach(exp => this.addExperience(exp));
        } else {
            this.addExperience(); // Default one
        }
    }

    get experienceControls() {
        return (this.form.get('experience') as FormArray).controls;
    }

    addExperience(data?: any) {
        const expGroup = this.fb.group({
            role: [data?.role || data?.jobTitle || ''],
            company: [data?.company || ''],
            startDate: [data?.startDate || ''],
            endDate: [{ value: data?.endDate || '', disabled: data?.isCurrent || data?.current }],
            description: [data?.description || ''],
            isCurrent: [data?.isCurrent || data?.current || false]
        });

        (this.form.get('experience') as FormArray).push(expGroup);
    }

    removeExperience(index: number) {
        if (this.experienceControls.length > 1) {
            (this.form.get('experience') as FormArray).removeAt(index);
        }
    }

    toggleCurrentJob(index: number, event: Event) {
        const isChecked = (event.target as HTMLInputElement).checked;
        const control = this.experienceControls[index];
        if (isChecked) {
            control.get('endDate')?.setValue('Present');
            control.get('endDate')?.disable();
        } else {
            control.get('endDate')?.enable();
        }
        control.get('isCurrent')?.setValue(isChecked);
    }

    improveExperience(index: number) {
        const control = this.experienceControls[index];
        const role = control.get('role')?.value;
        const company = control.get('company')?.value;
        const desc = control.get('description')?.value;

        if (!role || !desc) {
            alert('Please fill in job title and description first.');
            return;
        }

        this.loadingExperience.update(s => { s.add(index); return new Set(s); });
        const content = `Role: ${role}\nCompany: ${company}\nDescription: ${desc}`;

        this.ai.improveResumeSection(content, 'Experience', role)
            .subscribe({
                next: (text: string) => {
                    control.patchValue({ description: text });
                    this.loadingExperience.update(s => { s.delete(index); return new Set(s); });
                },
                error: (err) => {
                    console.error(err);
                    this.loadingExperience.update(s => { s.delete(index); return new Set(s); });
                }
            });
    }
}
