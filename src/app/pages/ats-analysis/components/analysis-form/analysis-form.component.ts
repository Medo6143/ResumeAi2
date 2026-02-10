import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileParsingService } from '../../../../core/services/file-parsing.service';

@Component({
    selector: 'app-analysis-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './analysis-form.component.html',
    styles: []
})
export class AnalysisFormComponent {
    @Input() loading = false;
    @Output() analyze = new EventEmitter<{ jobTitle: string, jobDescription: string, resume: string }>();

    form: FormGroup;
    isDragging = false;
    parsing = false;

    constructor(
        private fb: FormBuilder,
        private fileParsingService: FileParsingService
    ) {
        this.form = this.fb.group({
            jobTitle: ['', Validators.required],
            jobDescription: ['', Validators.required],
            resume: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.loading || this.parsing) return;

        if (this.form.valid) {
            this.analyze.emit(this.form.value);
        } else {
            this.form.markAllAsTouched();
        }
    }

    async onFileSelected(event: Event | DragEvent) {
        if (this.parsing) return;

        let file: File | null = null;
        if (event instanceof DragEvent) {
            event.preventDefault();
            this.isDragging = false;
            file = event.dataTransfer?.files[0] || null;
        } else {
            const input = event.target as HTMLInputElement;
            file = input.files?.[0] || null;
        }

        if (file) {
            try {
                this.parsing = true;
                const text = await this.fileParsingService.parseFile(file);
                this.form.patchValue({ resume: text });
            } catch (error: any) {
                console.error('File parsing failed:', error);
                alert(`File import failed: ${error.message || 'Unknown error'}`);
            } finally {
                this.parsing = false;
            }
        }
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
        this.isDragging = true;
    }

    onDragLeave(event: DragEvent) {
        event.preventDefault();
        this.isDragging = false;
    }
}
