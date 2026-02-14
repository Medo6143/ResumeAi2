import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ThemeService } from '../../core/services/theme.service';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturesComponent } from './components/features/features.component';
import { StatsComponent } from './components/stats/stats.component';
import { CtaComponent } from './components/cta/cta.component';
import { AtsPreviewComponent } from './components/ats-preview/ats-preview.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { TemplatesPreviewComponent } from './components/templates-preview/templates-preview.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        HeroComponent,
        FeaturesComponent,
        StatsComponent,
        CtaComponent,
        AtsPreviewComponent,
        HowItWorksComponent,
        TemplatesPreviewComponent
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    isBrowser: boolean;

    particles = Array.from({ length: 12 }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 3,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 8,
        type: i % 3 // Different particle types for different colors
    }));

    userAvatars = [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=b6e3f4',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor&backgroundColor=c0aede',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan&backgroundColor=d1d4f9',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Casey&backgroundColor=ffd5dc',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=Riley&backgroundColor=ffdfbf'
    ];

    stats = [
        {
            value: '25K+',
            labelKey: 'STATS.ACTIVE_USERS',
            descKey: 'STATS.ACTIVE_USERS_DESC'
        },
        {
            value: '96%',
            labelKey: 'STATS.SUCCESS_RATE',
            descKey: 'STATS.SUCCESS_RATE_DESC'
        },
        {
            value: '50+',
            labelKey: 'STATS.ATS_SYSTEMS',
            descKey: 'STATS.ATS_SYSTEMS_DESC'
        },
        {
            value: '3.2K',
            labelKey: 'STATS.REVIEWS',
            descKey: 'STATS.REVIEWS_DESC'
        }
    ];

    constructor(
        private titleService: Title,
        private metaService: Meta,
        @Inject(PLATFORM_ID) private platformId: Object,
        public themeService: ThemeService
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit() {
        this.titleService.setTitle('ResumeAI - Land Your Dream Job with AI-Powered Resume Optimization');
        this.metaService.updateTag({
            name: 'description',
            content: 'Transform your resume with AI. Get 96% ATS match scores, instant keyword optimization, and land interviews at top companies. Used by 25,000+ professionals. Free forever.'
        });
    }

    getParticleClass(type: number): string {
        const classes = [
            'bg-gradient-to-r from-indigo-400/15 to-purple-400/15',
            'bg-gradient-to-r from-pink-400/10 to-rose-400/10',
            'bg-gradient-to-r from-cyan-400/12 to-blue-400/12'
        ];
        return classes[type] || classes[0];
    }

    trackByIndex(index: number): number {
        return index;
    }
}
