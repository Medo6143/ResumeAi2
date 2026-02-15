import { Component, Inject, PLATFORM_ID, signal, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { OpenRouterAiService } from '../../core/services/openrouter-ai.service';
import { CvStateService } from './services/cv-state.service';
import { INITIAL_RESUME } from './models/resume.model';
import { TemplateService } from '../../core/services/template.service';

// Step Components
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
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-create-cv',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DragDropModule,
        // Steps
        PersonalInfoStepComponent,
        SummaryStepComponent,
        ExperienceStepComponent,
        ProjectsStepComponent,
        SkillsStepComponent,
        EducationStepComponent,
        CustomSectionStepComponent,
        // Preview
        CvPreviewComponent,
        // Features
        ProfileSelectorComponent,
        AtsScoreComponent,
        JobMatcherComponent,
        InterviewQuestionsComponent,
        TranslateModule
    ],
    templateUrl: './cv-creation.component.html',
    styleUrls: ['./cv-creation.component.scss']
})
export class CvCreationComponent {
    steps = ['CV_CREATE.STEPS.PERSONAL', 'CV_CREATE.STEPS.SUMMARY_EXP', 'CV_CREATE.STEPS.EDU_SKILLS'];
    currentStep = signal(1);
    selectedTemplate = signal<string>('modern');

    private templateService = inject(TemplateService);
    private route = inject(ActivatedRoute);
    private fileParser = inject(FileParserService);
    private wordExport = inject(WordExportService);
    private translate = inject(TranslateService);

    activeTemplate = signal(this.templateService.getTemplates()[0]);
    showPreviewModal = signal(false);
    isMobilePreviewOpen = signal(false);
    darkMode = signal(false);

    // Templates data
    templatesData = this.templateService.getTemplates();
    isDownloading = signal(false);

    // Chat State
    showSideChat = signal(false);
    isChatThinking = false;
    chatMessages = signal<{ role: 'user' | 'assistant', content: string, actions?: any }[]>([]);
    currentChatInput = '';

    // Templates data
    templates = [
        { id: 'modern' as const, name: 'Modern', color: '#4f46e5' },
        { id: 'minimal' as const, name: 'Minimal', color: '#10b981' },
        { id: 'executive' as const, name: 'Executive', color: '#8b5cf6' }
    ];

    private isBrowser: boolean;

    constructor(
        private openRouterService: OpenRouterAiService,
        private cvState: CvStateService,
        @Inject(PLATFORM_ID) platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(platformId);

        if (this.isBrowser) {
            // Handle Template from query param
            this.route.queryParams.subscribe(params => {
                if (params['template']) {
                    this.selectedTemplate.set(params['template']);
                }
            });

            // Set initial chat message after translate service is ready
            setTimeout(() => {
                this.chatMessages.set([
                    { role: 'assistant', content: this.translate.instant('CV_CREATE.CHAT.WELCOME') }
                ]);
            }, 0);
        }
    }


    isReorderModalOpen = signal(false);

    toggleReorderModal() {
        this.isReorderModalOpen.update(v => !v);
    }

    importFromMaster() {
        this.cvState.importFromMaster();
    }

    drop(event: CdkDragDrop<string[]>) {
        const currentResume = this.cvState.resume();
        const newOrder = [...currentResume.sectionOrder];
        moveItemInArray(newOrder, event.previousIndex, event.currentIndex);

        this.cvState.setResume({
            ...currentResume,
            sectionOrder: newOrder
        });
    }

    getFriendlyName(sectionId: string): string {
        const key = `CV_TEMPLATES.LABELS.${sectionId.toUpperCase()}`;
        const translated = this.translate.instant(key);
        // Fallback to manual mapping if key not found or if translation returns the key itself
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

    // Import/Export Logic
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
                this.showSideChat.set(true);
                // Trigger AI response
                this.sendMessage();
            } catch (error) {
                console.error('Import failed', error);
                alert(this.translate.instant('CV_CREATE.COMMON.IMPORT_FAILED'));
            }
            input.value = ''; // Reset
        }
    }

    exportToWord() {
        this.wordExport.generateResume(this.cvState.resume());
    }

    // Side Chat Logic
    toggleSideChat() {
        this.showSideChat.update(v => !v);
    }

    toggleMobilePreview() {
        this.isMobilePreviewOpen.update(v => !v);
    }

    sendMessage() {
        if (!this.currentChatInput.trim() || this.isChatThinking) return;

        const userMsg = this.currentChatInput;
        this.chatMessages.update(msgs => [...msgs, { role: 'user', content: userMsg }]);

        this.currentChatInput = '';
        this.isChatThinking = true;

        // Get current resume state from service
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
                    this.chatMessages.update(msgs => [...msgs, { role: 'assistant', content: `⚠️ ${msg} ` }]);
                }
            });
    }

    stepClasses(index: number): string {
        if (this.currentStep() === index + 1) {
            return 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 ring-4 ring-indigo-50';
        } else if (this.currentStep() > index + 1) {
            return 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md';
        } else {
            return 'bg-white text-slate-400 border-2 border-slate-200';
        }
    }

    // Navigation
    nextStep() {
        if (this.currentStep() < 3) {
            this.currentStep.update(step => step + 1);
        }
    }

    previousStep() {
        if (this.currentStep() > 1) {
            this.currentStep.update(step => step - 1);
        }
    }

    // PDF Download
    async downloadPDF() {
        if (!this.isBrowser) return;

        this.isDownloading.set(true);

        try {
            // We look for 'app-cv-preview' or a specific ID
            const previewElement = document.querySelector('app-cv-preview') as HTMLElement;
            if (!previewElement) throw new Error('Preview element not found');

            // Clone and clean
            const pdfContainer = previewElement.cloneNode(true) as HTMLElement;
            pdfContainer.classList.add('pdf-export');
            // Additional cleanup styles...
            pdfContainer.style.width = '210mm';
            pdfContainer.style.minHeight = '297mm'; // A4
            pdfContainer.style.padding = '0';
            pdfContainer.style.margin = '0';

            const tempWrapper = document.createElement('div');
            tempWrapper.style.position = 'fixed';
            tempWrapper.style.left = '-9999px';
            tempWrapper.style.top = '0';
            tempWrapper.appendChild(pdfContainer);
            document.body.appendChild(tempWrapper);

            // Wait for image loading
            const images = Array.from(pdfContainer.querySelectorAll('img'));
            await Promise.all(images.map(img => {
                if (img.complete) return Promise.resolve();
                return new Promise(resolve => {
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            }));

            const canvas = await html2canvas(pdfContainer, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);

            // --- CLICKABLE LINKS LOGIC ---
            const scale = imgWidth / pdfContainer.offsetWidth;

            const links = pdfContainer.querySelectorAll('a');
            links.forEach((link: HTMLAnchorElement) => {
                const rect = link.getBoundingClientRect();
                const parentRect = pdfContainer.getBoundingClientRect();

                const x = (rect.left - parentRect.left) * scale;
                const y = (rect.top - parentRect.top) * scale;
                const w = rect.width * scale;
                const h = rect.height * scale;

                let linkPage = 1;
                let linkY = y;

                while (linkY > pageHeight) {
                    linkY -= pageHeight;
                    linkPage++;
                }

                if (linkPage === 1) {
                    pdf.link(x, linkY, w, h, { url: link.href });
                }
            });
            // -----------------------------

            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                position -= pageHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            const fileName = `${this.cvState.resume().personalInfo.fullName.replace(/\s+/g, '_') || 'resume'}.pdf`;
            pdf.save(fileName);

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
            this.currentStep.set(1);
        }
    }

    private applyAiAction(response: any) {
        if (!response.path || !response.value) return;

        console.log('Applying AI Action:', response);

        try {
            // Deep clone current state
            const currentResume = JSON.parse(JSON.stringify(this.cvState.resume()));

            // Parse path: 'experience[0].description' -> ['experience', '0', 'description']
            const pathParts = response.path.replace(/\]/g, '').split(/[\.\[]/);

            let current = currentResume;
            for (let i = 0; i < pathParts.length - 1; i++) {
                const part = pathParts[i];
                if (current[part] === undefined) {
                    console.warn(`Path segment '${part}' not found in resume state.`);
                    return;
                }
                current = current[part];
            }

            const lastPart = pathParts[pathParts.length - 1];
            current[lastPart] = response.value;

            // Update the state
            this.cvState.setResume(currentResume);
        } catch (e) {
            console.error('Failed to apply AI action:', e);
        }
    }
}
