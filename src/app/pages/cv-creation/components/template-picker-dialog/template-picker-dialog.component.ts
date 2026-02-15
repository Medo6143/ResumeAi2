import { Component, Input, Output, EventEmitter, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TemplateService } from '../../../../core/services/template.service';
import { TemplateConfig } from '../../../../core/models/template.model';
import { CvPreviewComponent } from '../cv-preview/cv-preview.component';
import { MOCK_RESUME } from '../../../../core/constants/mock-resume';

@Component({
    selector: 'app-template-picker-dialog',
    standalone: true,
    imports: [CommonModule, FormsModule, TranslateModule, CvPreviewComponent],
    template: `
    <!-- Overlay backdrop -->
    <div class="picker-overlay" (click)="close.emit()">
        <div class="picker-panel" (click)="$event.stopPropagation()">

            <!-- Header -->
            <div class="picker-header">
                <button (click)="close.emit()" class="studio-icon-btn">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 class="text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
                    {{ 'TEMPLATES.TITLE' | translate }}
                </h2>

                <!-- Search -->
                <div class="relative">
                    <svg class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text"
                        [(ngModel)]="searchQuery"
                        [placeholder]="'TEMPLATES.SEARCH_PLACEHOLDER' | translate"
                        class="studio-input !py-1.5 !pl-8 !pr-3 !text-xs w-48">
                </div>
            </div>

            <!-- Category filter pills -->
            <div class="picker-filters">
                <button *ngFor="let cat of categories"
                    (click)="selectedCategory.set(cat.id)"
                    class="filter-pill"
                    [class.active]="selectedCategory() === cat.id">
                    {{ cat.label }}
                </button>
                <div class="flex-1"></div>
                <span class="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                    {{ filteredTemplates().length }} templates
                </span>
            </div>

            <!-- Grid -->
            <div class="picker-grid studio-scrollbar">
                <div *ngFor="let template of filteredTemplates()"
                    (click)="onSelect(template.id)"
                    class="picker-card"
                    [class.selected]="template.id === currentTemplateId">

                    <!-- Mini preview -->
                    <div class="picker-preview-container">
                        <div class="picker-preview-inner">
                            <app-cv-preview
                                [templateId]="template.id"
                                [resumeData]="mockData"
                                class="pointer-events-none block">
                            </app-cv-preview>
                        </div>

                        <!-- ATS badge -->
                        <span *ngIf="template.isAtsOptimized"
                            class="absolute top-1.5 right-1.5 z-10 px-1.5 py-0.5 bg-emerald-500 text-white text-[8px] font-black uppercase tracking-wider rounded font-mono">
                            ATS
                        </span>

                        <!-- Selected checkmark -->
                        <div *ngIf="template.id === currentTemplateId"
                            class="absolute inset-0 bg-indigo-600/10 flex items-center justify-center z-10">
                            <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg">
                                <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Template info -->
                    <div class="p-2.5">
                        <div class="flex items-center gap-1.5">
                            <span class="w-2 h-2 rounded-full flex-shrink-0" [style.background]="template.primaryColor"></span>
                            <span class="text-[11px] font-bold text-neutral-900 dark:text-white truncate">{{ template.name }}</span>
                        </div>
                        <p class="text-[10px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">{{ template.description }}</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
    `,
    styles: [`
      :host { display: block; }

      .picker-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        animation: fadeIn 150ms ease-out;
      }

      .picker-panel {
        width: 100%;
        max-width: 1100px;
        max-height: 85vh;
        background: white;
        border: 1px solid #e5e5e5;
        border-radius: 16px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        animation: scaleIn 200ms ease-out;
      }

      :host-context(.dark) .picker-panel {
        background: #171717;
        border-color: #262626;
      }

      .picker-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-bottom: 1px solid #e5e5e5;
        flex-shrink: 0;
      }

      :host-context(.dark) .picker-header {
        border-color: #262626;
      }

      .picker-filters {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 10px 16px;
        border-bottom: 1px solid #e5e5e5;
        flex-shrink: 0;
        overflow-x: auto;
      }

      :host-context(.dark) .picker-filters {
        border-color: #262626;
      }

      .filter-pill {
        padding: 4px 12px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 600;
        white-space: nowrap;
        color: #737373;
        background: transparent;
        border: 1px solid #e5e5e5;
        cursor: pointer;
        transition: all 150ms ease-out;
      }

      .filter-pill:hover {
        border-color: #a3a3a3;
        color: #171717;
      }

      .filter-pill.active {
        background: #4f46e5;
        border-color: #4f46e5;
        color: white;
      }

      :host-context(.dark) .filter-pill {
        border-color: #404040;
        color: #a3a3a3;
      }

      :host-context(.dark) .filter-pill:hover {
        border-color: #737373;
        color: #fafafa;
      }

      :host-context(.dark) .filter-pill.active {
        background: #4f46e5;
        border-color: #4f46e5;
        color: white;
      }

      .picker-grid {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        align-content: start;
      }

      @media (min-width: 640px) {
        .picker-grid { grid-template-columns: repeat(3, 1fr); }
      }

      @media (min-width: 1024px) {
        .picker-grid { grid-template-columns: repeat(4, 1fr); }
      }

      .picker-card {
        border: 1px solid #e5e5e5;
        border-radius: 12px;
        overflow: hidden;
        cursor: pointer;
        transition: all 150ms ease-out;
        background: white;
      }

      .picker-card:hover {
        border-color: #a3a3a3;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }

      .picker-card.selected {
        border-color: #4f46e5;
        box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.3);
      }

      :host-context(.dark) .picker-card {
        background: #0a0a0a;
        border-color: #262626;
      }

      :host-context(.dark) .picker-card:hover {
        border-color: #404040;
      }

      :host-context(.dark) .picker-card.selected {
        border-color: #818cf8;
        box-shadow: 0 0 0 2px rgba(129, 140, 248, 0.3);
      }

      .picker-preview-container {
        position: relative;
        width: 100%;
        aspect-ratio: 210 / 297;
        overflow: hidden;
        background: #f5f5f5;
      }

      :host-context(.dark) .picker-preview-container {
        background: #0f0f0f;
      }

      .picker-preview-inner {
        position: absolute;
        inset: 0;
        overflow: hidden;
      }

      .picker-preview-inner > app-cv-preview {
        display: block;
        transform-origin: top left;
        transform: scale(0.24);
        width: 210mm;
        min-height: 297mm;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.96) translateY(8px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
    `]
})
export class TemplatePickerDialogComponent {
    private templateService = inject(TemplateService);

    @Input() currentTemplateId: string = 'modern';
    @Output() selectTemplate = new EventEmitter<string>();
    @Output() close = new EventEmitter<void>();

    mockData = MOCK_RESUME;

    allTemplates = this.templateService.getTemplates();

    searchQuery = signal('');
    selectedCategory = signal('All');

    categories = [
        { id: 'All', label: 'All' },
        { id: 'ats', label: 'ATS Friendly' },
        { id: 'modern', label: 'Modern' },
        { id: 'creative', label: 'Creative' },
        { id: 'professional', label: 'Professional' },
        { id: 'simple', label: 'Simple' }
    ];

    filteredTemplates = computed(() => {
        const query = this.searchQuery().toLowerCase();
        const category = this.selectedCategory().toLowerCase();

        return this.allTemplates.filter((t: TemplateConfig) => {
            const matchesSearch = t.name.toLowerCase().includes(query) ||
                                  t.description.toLowerCase().includes(query);
            const matchesCategory = category === 'all' ||
                (category === 'ats' && t.isAtsOptimized) ||
                (category === 'modern' && (t.layoutType === 'modern' || t.layoutType === 'grid')) ||
                (category === 'creative' && t.layoutType === 'grid') ||
                (category === 'professional' && (t.layoutType === 'standard' || t.layoutType === 'sidebar' || t.layoutType === 'executive')) ||
                (category === 'simple' && (t.layoutType === 'minimal' || t.layoutType === 'standard'));

            return matchesSearch && matchesCategory;
        });
    });

    onSelect(templateId: string) {
        this.selectTemplate.emit(templateId);
    }
}
