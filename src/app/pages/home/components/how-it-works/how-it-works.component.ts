import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-how-it-works',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './how-it-works.component.html',
    styles: []
})
export class HowItWorksComponent {
    steps = [
        { num: '01', title: 'Paste Job Description', desc: 'Copy the job details you are targeting.' },
        { num: '02', title: 'AI Analysis', desc: 'Our engine identifies keywords and missing skills.' },
        { num: '03', title: 'Generate & Edit', desc: 'Get tailored content suggestions and perfect your resume.' },
        { num: '04', title: 'Download PDF', desc: 'Export your ATS-optimized resume instantly.' }
    ];
}
