import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-ats-preview',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './ats-preview.component.html',
    styles: []
})
export class AtsPreviewComponent {
    score = 92;
    skills = ['React', 'Angular', 'TypeScript', 'Tailwind', 'Node.js'];
}
