import { Injectable, inject, signal } from '@angular/core';
import { OpenRouterAiService } from '../../../core/services/openrouter-ai.service';
import { TranslateService } from '@ngx-translate/core';

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

@Injectable({
    providedIn: 'root'
})
export class VoiceInterviewService {
    private aiService = inject(OpenRouterAiService);
    private translate = inject(TranslateService);

    // State Signals
    interviewLanguage = signal<'en-US' | 'ar-SA'>('en-US');
    isListening = signal<boolean>(false);
    isSpeaking = signal<boolean>(false);
    isThinking = signal<boolean>(false);
    messages = signal<ChatMessage[]>([]);
    transcript = signal<string>('');
    error = signal<string | null>(null);
    analysisResult = signal<string | null>(null);
    difficulty = signal<'junior' | 'mid' | 'senior'>('mid');
    private audioContextPrimed = false;

    // Private state for STT accumulation
    private finalizedTranscript = '';

    // Web Speech API Objects
    private recognition: any;
    private synthesis = window.speechSynthesis;
    private silenceTimer: any;
    private fallbackAudio: HTMLAudioElement | null = null;

    constructor() {
        this.initSpeechRecognition();
    }

    private initSpeechRecognition() {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            this.error.set(this.translate.instant('INTERVIEW.ERROR.SPEECH_NOT_SUPPORTED'));
            return;
        }

        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;

        this.recognition.onstart = () => {
            this.isListening.set(true);
            this.error.set(null);
        };

        this.recognition.onresult = (event: any) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }

            // Fix Duplication: We keep a private string of ONLY final completed lines.
            // On each result, we show finalized lines + the current pending interim line.
            if (finalTranscript) {
                this.finalizedTranscript = (this.finalizedTranscript + ' ' + finalTranscript).trim();
            }

            const currentLiveText = (this.finalizedTranscript + ' ' + interimTranscript).trim();
            this.transcript.set(currentLiveText);

            // Auto-stop logic: if user stops speaking for 3 seconds, auto-submit
            clearTimeout(this.silenceTimer);
            this.silenceTimer = setTimeout(() => {
                if (this.isListening() && this.transcript().trim()) {
                    this.stopListeningAndSubmit();
                }
            }, 3000); // 3 seconds of silence
        };

        this.recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            this.isListening.set(false);
            if (event.error !== 'no-speech') {
                this.error.set('Mic Error: ' + event.error);
            }
        };

        this.recognition.onend = () => {
            this.isListening.set(false);
        };
    }

    startSession(jobTitle: string = 'Software Engineer', context: string = '', lang: 'en-US' | 'ar-SA' = 'en-US', type: 'direct' | 'flowing' = 'direct', difficulty: 'junior' | 'mid' | 'senior' = 'mid') {
        this.interviewLanguage.set(lang);
        this.difficulty.set(difficulty);
        this.analysisResult.set(null);

        let instructions = `You are Mimo HR, a professional HR and Technical Recruiter conducting a mock interview for the role of ${jobTitle} at a ${difficulty} level.
Context about the user: ${context}.
Instructions:
- Keep your answers VERY short and conversational (1-3 sentences max).
- Your tone should be professional yet encouraging.
- For a ${difficulty} level, adjust your questioning depth accordingly.`;

        if (type === 'direct') {
            instructions += `\n- Ask specifically targeted technical or resume-based questions one by one.
- Focus on testing the candidate's core competencies for a ${difficulty} role.
- Be direct and objective. Evaluate their answer briefly in your head before asking the next question.`;
        } else {
            instructions += `\n- Conduct a natural, flowing HR conversation.
- Deep-dive into the candidate's experiences, cultural fit, and behavioral traits.
- Use follow-up questions like "Can you tell me more about that?" or "How did you handle that specific conflict?".
- Focus on the candidate's soft skills and suitability for a ${difficulty} position.`;
        }

        instructions += `\n- Ask one question at a time. Wait for the user to answer before asking the next.
- Start the conversation by welcoming the candidate and asking them to introduce themselves.`;

        if (lang === 'ar-SA') {
            instructions += '\n- CRITICAL: Conduct the entire interview exclusively in Arabic (العربية). Ask questions, give feedback, and respond to the candidate ONLY in Arabic.';
        }

        this.messages.set([
            {
                role: 'system',
                content: instructions
            }
        ]);

        this.finalizedTranscript = '';
        this.transcript.set('');
        this.triggerAiTurn(); // AI speaks first
    }

    toggleMicrophone() {
        this.primeAudioContext();
        if (this.isListening()) {
            this.stopListeningAndSubmit();
        } else {
            this.startListening();
        }
    }

    private startListening() {
        if (this.error() && this.error()?.includes('not supported')) return;

        this.primeAudioContext();

        // Stop any AI speech if user interrupts
        if (this.isSpeaking()) {
            this.stopAudioPlayback();
            this.isSpeaking.set(false);
        }

        this.recognition.lang = this.interviewLanguage();
        this.finalizedTranscript = '';
        this.transcript.set('');
        try {
            // Check if already running to avoid InvalidStateError
            if (this.isListening()) {
                console.warn('Recognition already running, skipping start().');
                return;
            }
            this.recognition.start();
        } catch (e) {
            console.warn('Recognition might already be running', e);
        }
    }

    private primeAudioContext() {
        if (this.audioContextPrimed) return;

        // Browsers require a user gesture to play audio later.
        // We create a silent sound to "unlock" the context.
        const silentAudio = new Audio();
        silentAudio.src = 'data:audio/wav;base64,UklGRigAAABXQVZRTm90ZSBhIGZha2Ugd2F2ZSBmaWxlIHdpdGggbm8gZGF0YQ==';
        silentAudio.play().then(() => {
            this.audioContextPrimed = true;
            console.log('[Audio] Context primed for playback.');
        }).catch(() => { });
    }

    private stopListeningAndSubmit() {
        clearTimeout(this.silenceTimer);
        this.recognition.stop();
        this.isListening.set(false);

        const userText = this.transcript().trim();
        if (userText) {
            this.messages.update(m => [...m, { role: 'user', content: userText }]);
            this.transcript.set('');
            this.triggerAiTurn();
        }
    }

    private triggerAiTurn() {
        this.isThinking.set(true);

        // System prompt is always at index 0
        const systemPrompt = this.messages()[0]?.content || '';
        const history = this.messages()
            .slice(1) // Skip system prompt for the chat format
            .map(m => `${m.role.toUpperCase()}: ${m.content}`)
            .join('\n\n');

        const fullPrompt = `${systemPrompt}\n\nCONVERSATION HISTORY:\n${history}\n\nASSISTANT:`;

        this.aiService.sendPrompt(fullPrompt).subscribe({
            next: (response: any) => {
                this.isThinking.set(false);
                let aiText = "I'm sorry, I encountered an error.";

                if (response?.choices?.[0]?.message?.content) {
                    aiText = response.choices[0].message.content.trim();
                }

                this.messages.update(m => [...m, { role: 'assistant', content: aiText }]);
                this.speak(aiText);
            },
            error: (err: any) => {
                this.isThinking.set(false);
                this.error.set('Failed to connect to AI server.');
                console.error(err);
            }
        });
    }

    private speak(text: string) {
        if (!this.synthesis) return;

        this.isSpeaking.set(true);

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = this.interviewLanguage();

        const voices = this.synthesis.getVoices();
        let preferredVoice;

        if (this.interviewLanguage() === 'ar-SA') {
            // Aggressive fallback for Arabic. 
            // Broaden search to include anything with 'ar' or 'arab'
            const arabicVoices = voices.filter(v =>
                v.lang.toLowerCase().includes('ar') ||
                v.name.toLowerCase().includes('arab')
            );

            preferredVoice =
                arabicVoices.find(v => v.name.includes('Google') || v.name.includes('Microsoft') || v.name.includes('Tariq') || v.name.includes('Maged') || v.name.includes('Zeina')) ||
                arabicVoices[0]; // If we find ANY arabic voice, use it.

            // Critical OS Fallback: Linux and older machines often lack native Arabic voices
            if (!preferredVoice) {
                console.warn('[TTS] No native Arabic voice found. Falling back to External TTS Engine.');
                this.playExternalTTS(text, 'ar');
                return;
            }
        } else {
            preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Samantha'))) ||
                voices.find(v => v.lang.startsWith('en'));
        }

        if (preferredVoice) {
            utterance.voice = preferredVoice;
            console.log(`[TTS] Selected Voice: ${preferredVoice.name} (${preferredVoice.lang})`);
        } else {
            // The browser usually dynamically fulfills the request from OS/Web based on utterance.lang
            console.log(`[TTS] No local exact voice match for ${this.interviewLanguage()}. Letting browser synthesize default.`);
        }

        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        utterance.onend = () => {
            this.isSpeaking.set(false);
            // Auto-start listening again after AI finishes
            this.startListening();
        };

        utterance.onerror = (e) => {
            console.error('Speech synthesis error', e);
            this.isSpeaking.set(false);
        };

        this.synthesis.speak(utterance);
    }

    stopSession() {
        this.recognition?.stop();
        this.stopAudioPlayback();
        clearTimeout(this.silenceTimer);
        this.isListening.set(false);
        this.isSpeaking.set(false);
        this.isThinking.set(false);
    }

    generateFinalAnalysis() {
        if (this.messages().length < 2) return; // Nothing to analyze

        this.isThinking.set(true);
        this.stopSession(); // Ensure mic is off

        const history = this.messages()
            .filter(m => m.role !== 'system')
            .map(m => `${m.role.toUpperCase()}: ${m.content}`)
            .join('\n\n');

        const langName = this.interviewLanguage() === 'ar-SA' ? 'Arabic' : 'English';

        const analysisPrompt = `You are Mimo HR, an expert coach and recruiter. You just finished an interview with a candidate for a role.
        Here is the FULL transcript of the session:
        
        ${history}
        
        Generate a detailed performance report in ${langName}.
        The report MUST be structured as follows:
        1. **Overall Impression & Score**: A brief summary and a score out of 10.
        2. **Key Strengths**: 2-3 specific things they did exceptionally well.
        3. **Specific Areas for Improvement**: Identify technical or behavioral gaps.
        4. **Actionable Advice**: EXACTLY what they should study or practice next to improve.
        5. **Final Verdict**: (Hire / No Hire / Needs Work)
        
        Format beautifully with Markdown. Use professional yet constructive language.`;

        this.aiService.sendPrompt(analysisPrompt).subscribe({
            next: (response: any) => {
                this.isThinking.set(false);
                if (response?.choices?.[0]?.message?.content) {
                    this.analysisResult.set(response.choices[0].message.content.trim());
                } else {
                    this.error.set('AI failed to generate analysis.');
                }
            },
            error: (err) => {
                this.isThinking.set(false);
                this.error.set('Failed to connect to AI for analysis.');
                console.error(err);
            }
        });
    }

    private stopAudioPlayback() {
        if (this.fallbackAudio) {
            this.fallbackAudio.pause();
            this.fallbackAudio.currentTime = 0;
            this.fallbackAudio = null;
        }
        this.synthesis?.cancel();
    }

    // --- External TTS Fallback (Google Translate TTS Unofficial Endpoint) ---
    private playExternalTTS(text: string, lang: string) {
        // Google TTS usually limits to ~200 characters per request.
        // We chunk by words to stay under the limit safely.
        const maxLength = 200;
        const chunks: string[] = [];
        let currentChunk = '';
        const words = text.split(' ');

        for (const word of words) {
            if ((currentChunk + ' ' + word).length <= maxLength) {
                currentChunk += (currentChunk ? ' ' : '') + word;
            } else {
                if (currentChunk) chunks.push(currentChunk);
                currentChunk = word;
            }
        }
        if (currentChunk) chunks.push(currentChunk);

        this.playAudioChunks(chunks, lang, 0);
    }

    private playAudioChunks(chunks: string[], lang: string, index: number) {
        if (index >= chunks.length || !this.isSpeaking()) {
            this.isSpeaking.set(false);
            this.startListening();
            return;
        }

        const encodedText = encodeURIComponent(chunks[index]);
        // Updated reliable endpoint (client=gtx) on translate.googleapis.com
        // Sometimes using a specific TLD can help bypass regional throttling
        const url = `https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=${lang}&q=${encodedText}`;

        this.fallbackAudio = new Audio(url);

        this.fallbackAudio.onended = () => {
            this.playAudioChunks(chunks, lang, index + 1);
        };

        this.fallbackAudio.onerror = (e) => {
            console.error('External TTS Audio failed', e);
            // Still try proceeding to the next chunk
            this.playAudioChunks(chunks, lang, index + 1);
        };

        this.fallbackAudio.play().catch(e => {
            console.error('External TTS Audio Play failed. Browser might block autoplay without interaction.', e);
            this.isSpeaking.set(false);
            this.startListening();
        });
    }
}
