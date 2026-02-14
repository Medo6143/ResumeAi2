import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CvStateService } from '../../../services/cv-state.service';

@Component({
    selector: 'app-education-step',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TranslateModule],
    templateUrl: './education-step.component.html'
})
export class EducationStepComponent implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder, private cvState: CvStateService) {
        this.form = this.fb.group({
            education: this.fb.array([])
        });

        this.form.valueChanges.subscribe(val => {
            this.cvState.updateEducation(val.education);
        });
    }

    ngOnInit() {
        const existing = this.cvState.resume().education;
        if (existing && existing.length > 0) {
            existing.forEach(e => this.addEducation(e));
        } else {
            this.addEducation();
        }
    }

    get educationControls() {
        return (this.form.get('education') as FormArray).controls;
    }

    addEducation(data?: any) {
        const group = this.fb.group({
            school: [data?.school || ''],
            degree: [data?.degree || ''],
            graduationDate: [data?.graduationDate || ''],
            gpa: [data?.gpa || '']
        });
        (this.form.get('education') as FormArray).push(group);
    }

    removeEducation(index: number) {
        if (this.educationControls.length > 1) {
            (this.form.get('education') as FormArray).removeAt(index);
        }
    }
}
