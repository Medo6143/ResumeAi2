import { Component, inject, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoiceInterviewService } from '../services/voice-interview.service';
import { CvStateService } from '../../cv-creation/services/cv-state.service';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-voice-interview',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  template: `
    <div class="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-4 sm:p-6 flex flex-col items-center relative overflow-hidden">
      <!-- Background Ambient Glow -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none transition-all duration-1000"
           [class.bg-emerald-500/20]="voiceService.isListening()"
           [class.bg-purple-500/20]="voiceService.isThinking()"
           [class.bg-blue-500/20]="voiceService.isSpeaking()">
      </div>

      <!-- Header -->
      <div class="w-full max-w-3xl flex justify-between items-center mb-6 relative z-10">
        <button [routerLink]="['/mock-interview']" (click)="voiceService.stopSession()" class="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Exit
        </button>
        <div class="flex flex-col items-center">
            <h1 class="text-xl sm:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center gap-2">
                Mimo HR
                <span class="relative flex h-3 w-3" *ngIf="voiceService.isListening() || voiceService.isThinking() || voiceService.isSpeaking()">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        [class.bg-emerald-400]="voiceService.isListening()"
                        [class.bg-purple-400]="voiceService.isThinking()"
                        [class.bg-blue-400]="voiceService.isSpeaking()"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3"
                        [class.bg-emerald-500]="voiceService.isListening()"
                        [class.bg-purple-500]="voiceService.isThinking()"
                        [class.bg-blue-500]="voiceService.isSpeaking()"></span>
                </span>
            </h1>
        </div>
        <div class="w-20"></div> <!-- Spacer for balance with Exit button -->
      </div>

      <!-- Error Banner -->
      <div *ngIf="voiceService.error()" class="w-full max-w-3xl mb-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-900/50 flex items-center gap-3">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
        {{ voiceService.error() }}
      </div>

      <!-- Chat Container -->
      <div class="w-full max-w-3xl flex-1 bg-white/70 dark:bg-slate-800/50 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 dark:border-white/5 flex flex-col overflow-hidden relative z-10">
        
        <!-- Messages Area -->
        <div #scrollContainer class="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar scroll-smooth">
          
          <ng-container *ngFor="let msg of voiceService.messages(); let last = last">
            <!-- Skip System Prompt -->
            <div *ngIf="msg.role !== 'system'" class="flex flex-col" [class.items-end]="msg.role === 'user'" [class.items-start]="msg.role === 'assistant'">
              
              <span class="text-[10px] uppercase font-bold text-slate-400 mb-1 px-2">
                {{ msg.role === 'user' ? 'You' : 'Mimo HR' }}
              </span>
              
              <div class="max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl"
                   dir="auto"
                   [class.bg-indigo-600]="msg.role === 'user'"
                   [class.text-white]="msg.role === 'user'"
                   [class.rounded-tr-sm]="msg.role === 'user'"
                   [class.bg-slate-100]="msg.role === 'assistant'"
                   [class.dark:bg-slate-700]="msg.role === 'assistant'"
                   [class.text-slate-800]="msg.role === 'assistant'"
                   [class.dark:text-slate-200]="msg.role === 'assistant'"
                   [class.rounded-tl-sm]="msg.role === 'assistant'"
                   [class.shadow-md]="true">
                {{ msg.content }}
              </div>
              
              <!-- AI Speaking Waveform (Only on the last AI message if speaking) -->
              <div *ngIf="msg.role === 'assistant' && last && voiceService.isSpeaking()" class="mt-2 ml-2 flex gap-1 h-3 items-center">
                  <div class="w-1 bg-blue-500 rounded-full animate-[wave_1s_ease-in-out_infinite]"></div>
                  <div class="w-1 bg-blue-500 rounded-full animate-[wave_1s_ease-in-out_infinite_0.2s]"></div>
                  <div class="w-1 bg-blue-500 rounded-full animate-[wave_1s_ease-in-out_infinite_0.4s]"></div>
                  <div class="w-1 bg-blue-500 rounded-full animate-[wave_1s_ease-in-out_infinite_0.6s]"></div>
              </div>

            </div>
          </ng-container>

          <!-- Live Transcript (User speaking right now) -->
          <div *ngIf="voiceService.isListening() && voiceService.transcript()" class="flex flex-col items-end opacity-70">
              <span class="text-[10px] uppercase font-bold text-emerald-500 mb-1 px-2">Listening...</span>
              <div class="max-w-[85%] p-4 rounded-2xl bg-indigo-600/50 text-white rounded-tr-sm border border-indigo-400 border-dashed"
                   dir="auto">
                {{ voiceService.transcript() }}
              </div>
          </div>

          <!-- AI Thinking Spinner -->
          <div *ngIf="voiceService.isThinking()" class="flex flex-col items-start animate-fade-in">
              <span class="text-[10px] uppercase font-bold text-purple-500 mb-1 px-2">AI is thinking</span>
              <div class="p-4 rounded-2xl bg-slate-100 dark:bg-slate-700 rounded-tl-sm flex items-center gap-2">
                 <svg class="animate-spin h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span class="text-sm text-slate-500 dark:text-slate-400 font-medium">Processing...</span>
              </div>
          </div>


        </div>

        <!-- Controls Area -->
        <div class="p-6 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md flex flex-col items-center justify-center relative">
            
            <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 h-4">
              <span *ngIf="voiceService.isListening()" class="text-emerald-500 animate-pulse">Go ahead, I'm listening...</span>
              <span *ngIf="voiceService.isThinking()" class="text-purple-500">Wait, AI is thinking...</span>
              <span *ngIf="voiceService.isSpeaking()" class="text-blue-500">AI is speaking...🎙️</span>
              <span *ngIf="!voiceService.isListening() && !voiceService.isThinking() && !voiceService.isSpeaking()">Tap mic to speak or interrupt</span>
            </p>

            <div class="flex items-center gap-10">
                <!-- Big Mic Button -->
                <div class="relative group">
                    <div class="absolute -inset-4 rounded-full blur-xl opacity-0 transition-opacity duration-500"
                         [class.opacity-100]="voiceService.isListening()"
                         [class.bg-emerald-500]="voiceService.isListening()"></div>
                    
                    <div class="absolute inset-0 border-2 border-emerald-500 rounded-full scale-150 opacity-0 transition-all duration-1000 origin-center"
                         [class.animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]]="voiceService.isListening()"></div>

                    <button (click)="voiceService.toggleMicrophone()" 
                            [disabled]="voiceService.isThinking() || voiceService.analysisResult()"
                            class="relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group-active:scale-95"
                            [ngClass]="{
                              'bg-emerald-500 text-white hover:bg-emerald-600': voiceService.isListening(),
                              'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-50 border border-slate-200 dark:border-slate-700': !voiceService.isListening()
                            }">
                        <svg *ngIf="!voiceService.isListening()" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
                        <svg *ngIf="voiceService.isListening()" class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clip-rule="evenodd"/></svg>
                    </button>
                    <span class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase text-slate-400">Microphone</span>
                </div>

                <!-- Finish Button -->
                <button (click)="voiceService.generateFinalAnalysis()" 
                        *ngIf="voiceService.messages().length > 1"
                        [disabled]="voiceService.isThinking() || voiceService.analysisResult()"
                        class="group flex flex-col items-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50">
                    <div class="w-16 h-16 rounded-3xl bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-100 dark:border-rose-900/50 flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-lg group-hover:bg-rose-600 group-hover:text-white transition-all">
                        <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <span class="text-[10px] font-black uppercase text-rose-500">Finish Session</span>
                </button>
            </div>

        </div>
      </div>

      <!-- Analysis Result Overlay -->
      <div *ngIf="voiceService.analysisResult()" class="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fade-in">
        <div class="w-full max-w-4xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-white/10">
          <!-- Header -->
          <div class="p-6 border-b border-slate-100 dark:border-white/5 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
            <h2 class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center gap-2">
               Interview Analysis
               <span class="text-sm font-medium text-slate-400">by Mimo HR</span>
            </h2>
            <button (click)="voiceService.analysisResult.set(null)" class="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          
          <!-- Content -->
          <div class="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div class="text-slate-800 dark:text-slate-200 leading-relaxed" [innerHTML]="formatAnalysis(voiceService.analysisResult()!)"></div>
          </div>
          
          <!-- Footer -->
          <div class="p-6 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-4">
            <button (click)="voiceService.analysisResult.set(null)" [routerLink]="['/mock-interview']" class="px-6 py-2 rounded-xl font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 transition-colors">
               Back to Setup
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes wave {
      0%, 100% { height: 12px; }
      50% { height: 24px; }
    }
  `]
})
export class VoiceInterviewComponent implements OnInit, OnDestroy, AfterViewChecked {
  public voiceService = inject(VoiceInterviewService);
  private cvState = inject(CvStateService);
  private route = inject(ActivatedRoute);

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  ngOnInit() {
    // Make sure synthesis voices are loaded initially
    window.speechSynthesis.getVoices();

    const lang = (this.route.snapshot.queryParamMap.get('lang') as 'en-US' | 'ar-SA') || 'en-US';
    const type = (this.route.snapshot.queryParamMap.get('type') as 'direct' | 'flowing') || 'direct';
    const difficulty = (this.route.snapshot.queryParamMap.get('difficulty') as 'junior' | 'mid' | 'senior') || 'mid';
    const qJobTitle = this.route.snapshot.queryParamMap.get('jobTitle');

    // Slight delay to let UI render before starting
    setTimeout(() => {
      const jobTitle = qJobTitle || this.cvState.resume().personalInfo?.jobTitle || 'Role';
      const summary = this.cvState.resume().summary || '';
      const expCount = this.cvState.resume().experience?.length || 0;

      const context = `Candidate applied for ${jobTitle} at ${difficulty} level. They have a summary: "${summary}". They have ${expCount} work experiences.`;

      this.voiceService.startSession(jobTitle, context, lang, type, difficulty);
    }, 500);
  }

  formatAnalysis(text: string): string {
    if (!text) return '';

    // Basic markdown-to-html conversion for a nicer display
    return text
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-black mb-6 text-indigo-600 mt-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4 text-purple-600 pb-2 border-b border-slate-100 dark:border-white/5">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-6 mb-3 text-slate-800 dark:text-white">$1</h3>')
      .replace(/^\- (.*$)/gim, '<div class="flex items-start gap-2 mb-2"><span class="text-indigo-500 mt-1">•</span><span class="opacity-90">$1</span></div>')
      .replace(/^\d\. (.*$)/gim, '<div class="flex items-start gap-2 mb-2 font-medium"><span class="text-indigo-500 mt-0.5">$0</span><span>$1</span></div>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>')
      .replace(/\n/g, '<br>');
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  ngOnDestroy() {
    this.voiceService.stopSession();
  }
}
