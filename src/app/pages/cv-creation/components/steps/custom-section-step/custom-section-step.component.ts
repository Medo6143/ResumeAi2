import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CvStateService } from '../../../services/cv-state.service';

@Component({
    selector: 'app-custom-section-step',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './custom-section-step.component.html'
})
export class CustomSectionStepComponent implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder, private cvState: CvStateService) {
        this.form = this.fb.group({
            customSections: this.fb.array([])
        });

        this.form.valueChanges.subscribe(val => {
            this.cvState.updateCustomSections(val.customSections);
        });
    }

    ngOnInit() {
        const existing = this.cvState.resume().customSections;
        if (existing && existing.length > 0) {
            existing.forEach(s => this.addCustomSection(s));
        }
    }

    get customSectionsControls() {
        return (this.form.get('customSections') as FormArray).controls;
    }

    getCustomSectionItems(sectionIndex: number) {
        return ((this.form.get('customSections') as FormArray).at(sectionIndex).get('items') as FormArray).controls;
    }

    addCustomSection(data?: any) {
        const group = this.fb.group({
            title: [data?.title || 'New Section'],
            items: this.fb.array([])
        });

        if (data?.items && data.items.length > 0) {
            data.items.forEach((item: any) => {
                (group.get('items') as FormArray).push(this.createCustomItem(item));
            });
        } else {
            (group.get('items') as FormArray).push(this.createCustomItem());
        }

        (this.form.get('customSections') as FormArray).push(group);
    }

    private createCustomItem(data?: any) {
        return this.fb.group({
            name: [data?.name || ''],
            description: [data?.description || '']
        });
    }

    addCustomItem(sectionIndex: number) {
        const items = (this.form.get('customSections') as FormArray).at(sectionIndex).get('items') as FormArray;
        items.push(this.createCustomItem());
    }

    removeCustomSection(index: number) {
        (this.form.get('customSections') as FormArray).removeAt(index);
    }

    removeCustomItem(sectionIndex: number, itemIndex: number) {
        const items = (this.form.get('customSections') as FormArray).at(sectionIndex).get('items') as FormArray;
        if (items.length > 1) {
            items.removeAt(itemIndex);
        }
    }
}
