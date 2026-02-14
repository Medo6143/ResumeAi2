import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-how-it-works',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    templateUrl: './how-it-works.component.html',
    styles: []
})
export class HowItWorksComponent {
    steps = [
        { num: '01', titleKey: 'HOW_IT_WORKS.STEPS.1.TITLE', descKey: 'HOW_IT_WORKS.STEPS.1.DESC' },
        { num: '02', titleKey: 'HOW_IT_WORKS.STEPS.2.TITLE', descKey: 'HOW_IT_WORKS.STEPS.2.DESC' },
        { num: '03', titleKey: 'HOW_IT_WORKS.STEPS.3.TITLE', descKey: 'HOW_IT_WORKS.STEPS.3.DESC' },
        { num: '04', titleKey: 'HOW_IT_WORKS.STEPS.4.TITLE', descKey: 'HOW_IT_WORKS.STEPS.4.DESC' }
    ];
}

