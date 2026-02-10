import { Component, inject, Input, computed, signal, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvStateService } from '../../services/cv-state.service';
import { TemplateService } from '../../../../core/services/template.service';
import { TemplateConfig } from '../../../../core/models/template.model';

// Template Components
import { ModernComponent } from '../cv-templates/modern/modern.component';
import { MinimalComponent } from '../cv-templates/minimal/minimal.component';
import { ExecutiveComponent } from '../cv-templates/executive/executive.component';
import { Pro1AtsSentinelComponent } from '../cv-templates/pro-1/pro-1-ats-sentinel.component';
import { Pro2CreativeGridComponent } from '../cv-templates/pro-2/pro-2-creative-grid.component';
import { Pro3TechCompactComponent } from '../cv-templates/pro-3/pro-3-tech-compact.component';
import { Pro4ElegantGoldComponent } from '../cv-templates/pro-4/pro-4-elegant-gold.component';
import { Pro5DarkModeProComponent } from '../cv-templates/pro-5/pro-5-dark-mode-pro.component';
import { Pro6ClassicChronoComponent } from '../cv-templates/pro-6/pro-6-classic-chrono.component';
import { Pro7SoftPastelComponent } from '../cv-templates/pro-7/pro-7-soft-pastel.component';
import { Pro8BoldImpactComponent } from '../cv-templates/pro-8/pro-8-bold-impact.component';
import { Pro9SkylineModernComponent } from '../cv-templates/pro-9/pro-9-skyline-modern.component';
import { Pro10RubyExecutiveComponent } from '../cv-templates/pro-10/pro-10-ruby-executive.component';
import { Pro11EmeraldCleanComponent } from '../cv-templates/pro-11/pro-11-emerald-clean.component';
import { Pro12CorporateBlueComponent } from '../cv-templates/pro-12/pro-12-corporate-blue.component';
import { Pro13StartupVibeComponent } from '../cv-templates/pro-13/pro-13-startup-vibe.component';
import { Pro14ProfessorSerifComponent } from '../cv-templates/pro-14/pro-14-professor-serif.component';
import { Pro15MinimalistDotComponent } from '../cv-templates/pro-15/pro-15-minimalist-dot.component';
import { Pro16VibrantPulseComponent } from '../cv-templates/pro-16/pro-16-vibrant-pulse.component';
import { Pro17StudioArtistComponent } from '../cv-templates/pro-17/pro-17-studio-artist.component';

@Component({
    selector: 'app-cv-preview',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cv-preview.component.html',
    styleUrls: ['./cv-preview.component.scss']
})
export class CvPreviewComponent {
    private cvState = inject(CvStateService);
    private templateService = inject(TemplateService);

    resume = computed(() => this.resumeOverride() || this.cvState.resume());

    // Map of template IDs to components
    private templateMap: Record<string, Type<any>> = {
        'modern': ModernComponent,
        'minimal': MinimalComponent,
        'executive': ExecutiveComponent,
        'pro-1': Pro1AtsSentinelComponent,
        'pro-2': Pro2CreativeGridComponent,
        'pro-3': Pro3TechCompactComponent,
        'pro-4': Pro4ElegantGoldComponent,
        'pro-5': Pro5DarkModeProComponent,
        'pro-6': Pro6ClassicChronoComponent,
        'pro-7': Pro7SoftPastelComponent,
        'pro-8': Pro8BoldImpactComponent,
        'pro-9': Pro9SkylineModernComponent,
        'pro-10': Pro10RubyExecutiveComponent,
        'pro-11': Pro11EmeraldCleanComponent,
        'pro-12': Pro12CorporateBlueComponent,
        'pro-13': Pro13StartupVibeComponent,
        'pro-14': Pro14ProfessorSerifComponent,
        'pro-15': Pro15MinimalistDotComponent,
        'pro-16': Pro16VibrantPulseComponent,
        'pro-17': Pro17StudioArtistComponent
    };

    activeComponent = computed(() => {
        const id = this.config().id;
        return this.templateMap[id] || ModernComponent;
    });

    componentInputs = computed(() => ({
        resume: this.resume(),
        config: this.config()
    }));

    @Input() set templateId(id: string) {
        const config = this.templateService.getTemplateById(id);
        if (config) {
            this.config.set(config);
        }
    }

    @Input() set resumeData(data: any) {
        if (data) this.resumeOverride.set(data);
    }

    // Keep compatibility
    @Input() set template(t: any) {
        if (t) {
            const config = this.templateService.getTemplateById(t);
            if (config) this.config.set(config);
        }
    }

    config = signal<TemplateConfig>(this.templateService.getTemplates()[0]);
    resumeOverride = signal<any>(null);
}
