import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-stats',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    templateUrl: './stats.component.html'
})
export class StatsComponent {
    @Input() stats: any[] = [];

    trackByIndex(index: number): number {
        return index;
    }
}
