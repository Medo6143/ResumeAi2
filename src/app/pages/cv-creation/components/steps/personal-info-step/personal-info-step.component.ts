import { Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CvStateService } from '../../../services/cv-state.service';

@Component({
    selector: 'app-personal-info-step',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './personal-info-step.component.html',
    styles: []
})
export class PersonalInfoStepComponent implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder, private cvState: CvStateService) {
        // Initialize form
        this.form = this.fb.group({
            fullName: ['', Validators.required],
            jobTitle: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: [''],
            location: [''],
            linkedin: [''],
            website: ['']
        });

        // Auto-save changes to State
        this.form.valueChanges.subscribe(value => {
            this.cvState.updatePersonalInfo(value);
        });
    }

    ngOnInit() {
        const info = this.cvState.resume().personalInfo;
        if (info) {
            this.form.patchValue(info, { emitEvent: false });
        }
    }
}
