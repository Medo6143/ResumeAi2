import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-experience-block',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    template: `
    <div *ngFor="let job of jobs" [class]="className || 'mb-4'">
        <div class="flex justify-between items-baseline font-bold">
            <span>{{ job.jobTitle }}</span>
            <span class="text-[10px] opacity-60 uppercase">{{ job.startDate }} - {{ job.endDate }}</span>
        </div>
        <div class="text-[11px] font-semibold mb-1" [style.color]="primaryColor">{{ job.company }}</div>
        <div class="text-[10px] leading-relaxed opacity-80" [innerHTML]="job.description"></div>
    </div>
  `
})
export class ExperienceComponent {
    @Input() jobs: any[] = [];
    @Input() className: string = '';
    @Input() primaryColor: string = '#000000';
}
