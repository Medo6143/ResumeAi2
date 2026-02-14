import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CvStateService } from '../../../services/cv-state.service';

@Component({
    selector: 'app-projects-step',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TranslateModule],
    templateUrl: './projects-step.component.html'
})
export class ProjectsStepComponent implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder, private cvState: CvStateService) {
        this.form = this.fb.group({
            projects: this.fb.array([])
        });

        this.form.valueChanges.subscribe(val => {
            this.cvState.updateProjects(val.projects);
        });
    }

    ngOnInit() {
        // Init with existing
        const existing = this.cvState.resume().projects;
        if (existing && existing.length > 0) {
            existing.forEach(p => this.addProject(p));
        } else {
            // Optional: Start with 0 or 1 project? Let's start with 0 for optional section
        }
    }

    get projectsControls() {
        return (this.form.get('projects') as FormArray).controls;
    }

    addProject(data?: any) {
        const group = this.fb.group({
            name: [data?.name || ''],
            description: [data?.description || ''],
            link: [data?.link || '']
        });
        (this.form.get('projects') as FormArray).push(group);
    }

    removeProject(index: number) {
        (this.form.get('projects') as FormArray).removeAt(index);
    }
}
