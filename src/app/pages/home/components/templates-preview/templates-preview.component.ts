import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-templates-preview',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './templates-preview.component.html',
    styles: []
})
export class TemplatesPreviewComponent {
    templates = [
        { name: 'Modern', color: 'bg-blue-500' },
        { name: 'Minimal', color: 'bg-gray-800' },
        { name: 'Professional', color: 'bg-indigo-600' },
        { name: 'Creative', color: 'bg-purple-600' }
    ];
}
