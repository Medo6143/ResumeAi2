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
            website: [''],
            github: [''],
            portfolio: [''],
            photo: ['']
        });

        // Auto-save changes to State
        this.form.valueChanges.subscribe(value => {
            this.cvState.updatePersonalInfo(value);
        });
    }

    onFileSelected(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result as string;
                this.form.patchValue({ photo: base64 });
            };
            reader.readAsDataURL(file);
        }
    }

    removePhoto() {
        this.form.patchValue({ photo: '' });
    }

    ngOnInit() {
        const info = this.cvState.resume().personalInfo;
        if (info) {
            this.form.patchValue(info, { emitEvent: false });
        }
    }
}
