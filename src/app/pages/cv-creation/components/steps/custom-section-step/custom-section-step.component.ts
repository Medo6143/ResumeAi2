import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CvStateService } from '../../../services/cv-state.service';

@Component({
    selector: 'app-custom-section-step',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TranslateModule],
    templateUrl: './custom-section-step.component.html'
})
export class CustomSectionStepComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private cvState: CvStateService
    ) {
        this.form = this.fb.group({
            customSections: this.fb.array([])
        });
    }

    ngOnInit() {
        // Load initial data from state
        const resume = this.cvState.resume();
        if (resume && resume.customSections) {
            this.setCustomSections(resume.customSections);
        }

        // Subscribe to form changes
        this.form.valueChanges.subscribe(value => {
            this.cvState.updateCustomSections(value.customSections);
        });
    }

    get customSectionsControls() {
        return (this.form.get('customSections') as FormArray).controls as FormGroup[];
    }

    private setCustomSections(sections: any[]) {
        const sectionsArray = this.form.get('customSections') as FormArray;
        sectionsArray.clear();
        sections.forEach(section => {
            const sectionGroup = this.fb.group({
                title: [section.title],
                items: this.fb.array(section.items.map((item: any) => this.fb.group({
                    name: [item.name],
                    description: [item.description]
                })))
            });
            sectionsArray.push(sectionGroup);
        });
    }

    addCustomSection() {
        const sectionsArray = this.form.get('customSections') as FormArray;
        sectionsArray.push(this.fb.group({
            title: [''],
            items: this.fb.array([this.createItem()])
        }));
    }

    removeCustomSection(index: number) {
        const sectionsArray = this.form.get('customSections') as FormArray;
        sectionsArray.removeAt(index);
    }

    private createItem() {
        return this.fb.group({
            name: [''],
            description: ['']
        });
    }

    addCustomItem(sectionIndex: number) {
        const itemsArray = this.customSectionsControls[sectionIndex].get('items') as FormArray;
        itemsArray.push(this.createItem());
    }

    removeCustomItem(sectionIndex: number, itemIndex: number) {
        const itemsArray = this.customSectionsControls[sectionIndex].get('items') as FormArray;
        itemsArray.removeAt(itemIndex);
    }

    getCustomSectionItems(sectionIndex: number) {
        return (this.customSectionsControls[sectionIndex].get('items') as FormArray).controls as FormGroup[];
    }
}
