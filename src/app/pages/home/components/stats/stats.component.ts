import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-stats',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './stats.component.html'
})
export class StatsComponent {
    @Input() stats: any[] = [];

    trackByIndex(index: number): number {
        return index;
    }
}
