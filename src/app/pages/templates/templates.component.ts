import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TemplateService } from '../../core/services/template.service';
import { TemplateConfig } from '../../core/models/template.model';
import { PreviewModalComponent } from './components/preview-modal/preview-modal';
import { CvPreviewComponent } from '../cv-creation/components/cv-preview/cv-preview.component';
import { MOCK_RESUME } from '../../core/constants/mock-resume';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [CommonModule, PreviewModalComponent, CvPreviewComponent, TranslateModule],
  templateUrl: './templates.component.html',
  styles: [`
    .animate-gradient-x {
      background-size: 200% 200%;
      animation: gradient-x 15s ease infinite;
    }
    @keyframes gradient-x {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .glass-panel {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    :host-context(.dark) .glass-panel {
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
  `]
})
export class TemplatesComponent {
  private templateService = inject(TemplateService);
  private router = inject(Router);

  allTemplates = this.templateService.getTemplates();
  mockResume = MOCK_RESUME;

  // Pagination
  pageSize = 8;
  currentPage = signal(0);

  paginatedTemplates = computed(() => {
    const start = this.currentPage() * this.pageSize;
    return this.allTemplates.slice(start, start + this.pageSize);
  });

  totalPages = Math.ceil(this.allTemplates.length / this.pageSize);

  // Modal State
  selectedTemplateForPreview = signal<TemplateConfig | null>(null);

  nextPage() {
    if (this.currentPage() < this.totalPages - 1) {
      this.currentPage.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 0) {
      this.currentPage.update(p => p - 1);
    }
  }

  openPreview(template: TemplateConfig) {
    this.selectedTemplateForPreview.set(template);
  }

  closePreview() {
    this.selectedTemplateForPreview.set(null);
  }

  selectTemplate(templateId: string) {
    this.router.navigate(['/create'], { queryParams: { template: templateId } });
  }
}
