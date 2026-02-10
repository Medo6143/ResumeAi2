import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateConfig } from '../../../../core/models/template.model';
import { CvPreviewComponent } from '../../../cv-creation/components/cv-preview/cv-preview.component';
import { MOCK_RESUME } from '../../../../core/constants/mock-resume';

@Component({
  selector: 'app-preview-modal',
  standalone: true,
  imports: [CommonModule, CvPreviewComponent],
  template: `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/80 backdrop-blur-md" (click)="close.emit()"></div>
        
        <!-- Modal Content -->
        <div class="relative bg-white dark:bg-slate-900 w-full max-w-5xl h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-scale-in">
            <!-- Header -->
            <div class="p-6 border-b border-slate-100 dark:border-white/10 flex justify-between items-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
                <div>
                    <h2 class="text-2xl font-bold dark:text-white">{{ template?.name }}</h2>
                    <p class="text-sm text-slate-500">{{ template?.description }}</p>
                </div>
                <button (click)="close.emit()" class="p-3 hover:bg-slate-100 dark:hover:bg-white/10 rounded-2xl transition-all">
                    <svg class="w-6 h-6 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Preview Body -->
            <div class="flex-1 overflow-y-auto p-4 sm:p-10 bg-slate-50 dark:bg-black/20 flex justify-center">
                <div class="shadow-2xl origin-top transition-all duration-500 scale-[0.5] sm:scale-[0.65] lg:scale-[0.8] xl:scale-100 hover:scale-[1.05]" style="width: 210mm;">
                     <app-cv-preview [templateId]="template?.id || 'modern'" [resumeData]="mockData"></app-cv-preview>
                </div>
            </div>

            <!-- Footer Action -->
            <div class="p-6 border-t border-slate-100 dark:border-white/10 flex justify-center bg-white dark:bg-slate-900">
                <button (click)="select.emit(template!.id)" 
                        class="px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all outline-none">
                    Use This Template
                </button>
            </div>
        </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .animate-fade-in { animation: fadeIn 0.3s ease-out; }
    .animate-scale-in { animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes scaleIn { from { opacity: 0; transform: scale(0.95) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
  `]
})
export class PreviewModalComponent {
  @Input() template: TemplateConfig | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() select = new EventEmitter<string>();

  mockData = MOCK_RESUME;
}
