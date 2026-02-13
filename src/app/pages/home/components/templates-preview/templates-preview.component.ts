import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-templates-preview',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './templates-preview.component.html',
    styles: []
})
export class TemplatesPreviewComponent {
    templates = [
        { id: 'modern', name: 'Modern', color: 'bg-blue-500' },
        { id: 'minimal', name: 'Minimal', color: 'bg-gray-800' },
        { id: 'executive', name: 'Professional', color: 'bg-indigo-600' },
        { id: 'pro-2', name: 'Creative', color: 'bg-purple-600' }
    ];
}
