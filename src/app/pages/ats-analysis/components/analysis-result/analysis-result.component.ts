import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AtsResult } from '../../models/ats-result.model';

@Component({
    selector: 'app-analysis-result',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    templateUrl: './analysis-result.component.html',
    styles: []
})
export class AnalysisResultComponent {
    @Input() result!: AtsResult;

    getScoreColor(score: number): string {
        if (score >= 75) return 'text-green-500 from-green-400 to-green-600';
        if (score >= 50) return 'text-yellow-500 from-yellow-400 to-yellow-600';
        return 'text-red-500 from-red-400 to-red-600';
    }

    getScoreStrokeColor(score: number): string {
        if (score >= 75) return 'text-green-400';
        if (score >= 50) return 'text-yellow-400';
        return 'text-red-400';
    }

    getScoreBg(score: number): string {
        if (score >= 75) return 'bg-green-500';
        if (score >= 50) return 'bg-yellow-500';
        return 'bg-red-500';
    }
}
