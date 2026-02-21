import { Component, Inject, PLATFORM_ID, signal, inject, HostListener, effect } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { OpenRouterAiService } from '../../core/services/openrouter-ai.service';
import { CvStateService } from './services/cv-state.service';
import { INITIAL_RESUME } from './models/resume.model';
import { TemplateService } from '../../core/services/template.service';

import { FileParserService } from '../../core/services/file-parser.service';
import { WordExportService } from '../../core/services/word-export.service';
import { CdkDragDrop, moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { PersonalInfoStepComponent } from './components/steps/personal-info-step/personal-info-step.component';
import { SummaryStepComponent } from './components/steps/summary-step/summary-step.component';
import { ExperienceStepComponent } from './components/steps/experience-step/experience-step.component';
import { ProjectsStepComponent } from './components/steps/projects-step/projects-step.component';
import { SkillsStepComponent } from './components/steps/skills-step/skills-step.component';
import { EducationStepComponent } from './components/steps/education-step/education-step.component';
import { CustomSectionStepComponent } from './components/steps/custom-section-step/custom-section-step.component';
import { ProfileSelectorComponent } from './components/profile-selector/profile-selector.component';
import { AtsScoreComponent } from './components/ats-score/ats-score.component';
import { JobMatcherComponent } from './components/job-matcher/job-matcher.component';
import { InterviewQuestionsComponent } from './components/interview-questions/interview-questions.component';
import { CvPreviewComponent } from './components/cv-preview/cv-preview.component';
import { TemplatePickerDialogComponent } from './components/template-picker-dialog/template-picker-dialog.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export type SectionId = 'personal' | 'summary' | 'experience' | 'projects' | 'education' | 'skills' | 'custom';
export type ToolTab = 'ats' | 'matcher' | 'interview' | null;

export interface SidebarSection {
    id: SectionId;
    labelKey: string;
    icon: string;
}

@Component({
    selector: 'app-create-cv',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DragDropModule,
        RouterModule,
        PersonalInfoStepComponent,
        SummaryStepComponent,
        ExperienceStepComponent,
        ProjectsStepComponent,
        SkillsStepComponent,
        EducationStepComponent,
        CustomSectionStepComponent,
        CvPreviewComponent,
        ProfileSelectorComponent,
        AtsScoreComponent,
        JobMatcherComponent,
        InterviewQuestionsComponent,
        TemplatePickerDialogComponent,
        TranslateModule
    ],
    templateUrl: './cv-creation.component.html',
    styleUrls: ['./cv-creation.component.scss']
})
export class CvCreationComponent {
    private templateService = inject(TemplateService);
    private route = inject(ActivatedRoute);
    private fileParser = inject(FileParserService);
    private wordExport = inject(WordExportService);
    private translate = inject(TranslateService);

    // Section navigation (replaces step wizard)
    sections: SidebarSection[] = [
        { id: 'personal', labelKey: 'CV_CREATE.STEPS.PERSONAL', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        { id: 'summary', labelKey: 'CV_CREATE.SUMMARY.TITLE', icon: 'M4 6h16M4 12h16M4 18h7' },
        { id: 'experience', labelKey: 'CV_CREATE.EXPERIENCE.TITLE', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
        { id: 'projects', labelKey: 'CV_CREATE.PROJECTS.TITLE', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
        { id: 'education', labelKey: 'CV_CREATE.EDUCATION.TITLE', icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222' },
        { id: 'skills', labelKey: 'CV_CREATE.SKILLS.TITLE', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
        { id: 'custom', labelKey: 'CV_CREATE.CUSTOM.TITLE', icon: 'M12 4v16m8-8H4' }
    ];

    activeSection = signal<SectionId>('personal');
    selectedTemplate = signal<string>('modern');
    activeTemplate = signal(this.templateService.getTemplates()[0]);
    darkMode = signal<boolean>(false);
    isDownloading = signal(false);

    // Tools tabs
    activeToolTab = signal<ToolTab>(null);

    // Template data
    templatesData = this.templateService.getTemplates();

    // Command Palette (AI Chat)
    showCommandPalette = signal(false);
    isChatThinking = false;
    chatMessages = signal<{ role: 'user' | 'assistant', content: string, actions?: any }[]>([]);
    currentChatInput = '';

    // Actions dropdown
    showActionsDropdown = signal(false);

    // Reorder modal
    isReorderModalOpen = signal(false);

    // Template picker dialog
    showTemplatePicker = signal(false);

    // Mobile view mode
    mobileView = signal<'form' | 'preview'>('form');

    private isBrowser: boolean;

    constructor(
        private openRouterService: OpenRouterAiService,
        public cvState: CvStateService,
        @Inject(PLATFORM_ID) platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(platformId);

        if (this.isBrowser) {
            // Load dark mode preference from localStorage
            const savedDarkMode = localStorage.getItem('cvDarkMode');
            if (savedDarkMode !== null) {
                this.darkMode.set(savedDarkMode === 'true');
            }

            // Save dark mode preference when it changes
            effect(() => {
                const isDark = this.darkMode();
                localStorage.setItem('cvDarkMode', String(isDark));
            });

            this.route.queryParams.subscribe(params => {
                if (params['template']) {
                    this.selectedTemplate.set(params['template']);
                }
            });

            setTimeout(() => {
                this.chatMessages.set([
                    { role: 'assistant', content: this.translate.instant('CV_CREATE.CHAT.WELCOME') }
                ]);
            }, 0);
        }
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        this.showActionsDropdown.set(false);
    }

    // Section navigation
    setSection(id: SectionId) {
        this.activeSection.set(id);
    }

    // Tool tabs
    setToolTab(tab: ToolTab) {
        this.activeToolTab.update(current => current === tab ? null : tab);
    }

    // Reorder
    toggleReorderModal() {
        this.isReorderModalOpen.update(v => !v);
    }

    // Template picker
    openTemplatePicker() {
        this.showTemplatePicker.set(true);
    }

    closeTemplatePicker() {
        this.showTemplatePicker.set(false);
    }

    onTemplateSelected(id: string) {
        this.selectedTemplate.set(id);
        this.showTemplatePicker.set(false);
    }

    importFromMaster() {
        this.cvState.importFromMaster();
    }

    drop(event: CdkDragDrop<string[]>) {
        const currentResume = this.cvState.resume();
        const newOrder = [...currentResume.sectionOrder];
        moveItemInArray(newOrder, event.previousIndex, event.currentIndex);
        this.cvState.setResume({ ...currentResume, sectionOrder: newOrder });
    }

    getFriendlyName(sectionId: string): string {
        const key = `CV_TEMPLATES.LABELS.${sectionId.toUpperCase()}`;
        const translated = this.translate.instant(key);
        if (translated === key) {
            const names: Record<string, string> = {
                'summary': 'Professional Summary',
                'experience': 'Work Experience',
                'education': 'Education',
                'projects': 'Projects',
                'skills': 'Skills',
                'languages': 'Languages',
                'custom': 'Custom Sections'
            };
            return names[sectionId] || sectionId;
        }
        return translated;
    }

    getSectionIndex(): number {
        return this.sections.findIndex(s => s.id === this.activeSection());
    }

    // Import/Export
    async onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files?.length) {
            const file = input.files[0];
            try {
                const text = await this.fileParser.parseFile(file);
                const prefix = this.translate.instant('CV_CREATE.CHAT.USER_PROMPT_PREFIX');
                const suffix = this.translate.instant('CV_CREATE.CHAT.USER_PROMPT_SUFFIX');
                this.chatMessages.update(msgs => [
                    ...msgs,
                    { role: 'user', content: `${prefix}${text}${suffix}` }
                ]);
                this.showCommandPalette.set(true);
                this.sendMessage();
            } catch (error) {
                console.error('Import failed', error);
                alert(this.translate.instant('CV_CREATE.COMMON.IMPORT_FAILED'));
            }
            input.value = '';
        }
    }

    exportToWord() {
        this.wordExport.generateResume(this.cvState.resume());
    }

    // Command Palette Chat
    toggleCommandPalette() {
        this.showCommandPalette.update(v => !v);
    }

    sendMessage() {
        if (!this.currentChatInput.trim() || this.isChatThinking) return;

        const userMsg = this.currentChatInput;
        this.chatMessages.update(msgs => [...msgs, { role: 'user', content: userMsg }]);
        this.currentChatInput = '';
        this.isChatThinking = true;

        const currentResume = this.cvState.resume();

        this.openRouterService.updateCvFromChat(currentResume, userMsg)
            .subscribe({
                next: (response: any) => {
                    this.isChatThinking = false;
                    if (response.action) {
                        this.applyAiAction(response);
                        this.chatMessages.update(msgs => [...msgs, {
                            role: 'assistant',
                            content: response.message || this.translate.instant('CV_CREATE.COMMON.UPDATED_AI'),
                            actions: response
                        }]);
                    } else {
                        const text = response.message || response.content || (typeof response === 'string' ? response : this.translate.instant('CV_CREATE.COMMON.PROCESS_ERROR'));
                        this.chatMessages.update(msgs => [...msgs, { role: 'assistant', content: text }]);
                    }
                },
                error: (err) => {
                    console.error('Chat error', err);
                    this.isChatThinking = false;
                    const msg = err.message || this.translate.instant('CV_CREATE.COMMON.UNKNOWN_ERROR');
                    this.chatMessages.update(msgs => [...msgs, { role: 'assistant', content: msg }]);
                }
            });
    }

    // PDF Download
    async downloadPDF() {
        if (!this.isBrowser) return;
        this.isDownloading.set(true);

        try {
            // Import html2pdf dynamically to avoid SSR issues
            const html2pdf = (await import('html2pdf.js')).default;

            const previewElement = document.querySelector('app-cv-preview') as HTMLElement;
            if (!previewElement) throw new Error('Preview element not found');

            const pdfContainer = previewElement.cloneNode(true) as HTMLElement;
            pdfContainer.classList.add('pdf-export');
            // Remove the hardcoded 297mm minHeight so it flows naturally
            pdfContainer.style.width = '210mm';
            pdfContainer.style.padding = '0';
            pdfContainer.style.margin = '0';
            pdfContainer.style.transform = 'none';

            const tempWrapper = document.createElement('div');
            tempWrapper.style.position = 'fixed';
            tempWrapper.style.left = '-9999px';
            tempWrapper.style.top = '0';
            tempWrapper.appendChild(pdfContainer);
            document.body.appendChild(tempWrapper);

            // Wait for images
            const images = Array.from(pdfContainer.querySelectorAll('img'));
            await Promise.all(images.map(img => {
                if (img.complete) return Promise.resolve();
                return new Promise(resolve => {
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            }));

            const fileName = `${this.cvState.resume().personalInfo.fullName.replace(/\s+/g, '_') || 'resume'}.pdf`;

            const opt = {
                margin: [0, 0] as [number, number], // Adjusted to 0 to remove top margin as requested
                filename: fileName,
                image: { type: 'jpeg' as const, quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: '#ffffff'
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
                pagebreak: { mode: 'css', avoid: 'tr, img, .project-item, .exp-item, .skill-item, .cert-item, p' } // Helps avoid cutting elements
            };

            await html2pdf().set(opt).from(pdfContainer).save();

            document.body.removeChild(tempWrapper);
        } catch (e) {
            console.error(e);
            alert(this.translate.instant('CV_CREATE.COMMON.PDF_FAILED'));
        } finally {
            this.isDownloading.set(false);
        }
    }

    resetForm() {
        if (confirm(this.translate.instant('CV_CREATE.COMMON.RESET_CONFIRM'))) {
            this.cvState.setResume(INITIAL_RESUME);
            if (this.isBrowser) sessionStorage.removeItem('resumeState');
            this.activeSection.set('personal');
        }
    }

    private applyAiAction(response: any) {
        if (!response.path || !response.value) return;
        try {
            const currentResume = JSON.parse(JSON.stringify(this.cvState.resume()));
            const pathParts = response.path.replace(/\]/g, '').split(/[\.\[]/);
            let current = currentResume;
            for (let i = 0; i < pathParts.length - 1; i++) {
                const part = pathParts[i];
                if (current[part] === undefined) return;
                current = current[part];
            }
            const lastPart = pathParts[pathParts.length - 1];
            current[lastPart] = response.value;
            this.cvState.setResume(currentResume);
        } catch (e) {
            console.error('Failed to apply AI action:', e);
        }
    }
}