import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <section class="relative pt-32 pb-20 lg:pt-40 lg:pb-32 text-center z-10">
        <div class="max-w-6xl mx-auto px-6">
            <!-- Professional Badge -->
            <div class="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-medium mb-8">
                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span class="text-sm">AI-Powered Resume Analysis</span>
                <span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">Live</span>
            </div>

            <!-- Clean Headline -->
            <div class="mb-12">
                <h1 class="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                    Land Your
                    <span class="block text-blue-600 dark:text-blue-400">Dream Job</span>
                </h1>
                <p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                    Transform your resume into an ATS-optimized document that gets you noticed by top employers.
                    <span class="font-black text-slate-900 dark:text-white relative">ATS Magnet
                        <span class="absolute bottom-0 left-0 w-full h-3 bg-yellow-300/40 dark:bg-yellow-500/20 -z-10 animate-highlight"></span>
                    </span>
                    in seconds
                </p>
                
                <p class="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed mt-4">
                    Join <span class="font-bold text-indigo-600 dark:text-indigo-400 text-xl">25,000+</span> professionals who landed interviews at 
                    <span class="font-semibold">Google, Meta, Amazon & more</span>
                </p>
            </div>

            <!-- Premium CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-5 justify-center items-center mb-12 animate-fade-slide-up" style="animation-delay: 0.3s;">
                <a routerLink="/analyze" 
                   class="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-size-200 animate-gradient-x text-white font-bold text-lg flex items-center gap-3 hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden w-full sm:w-auto justify-center">
                    <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    <svg class="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    <span class="relative z-10">Start Free Analysis</span>
                    <div class="relative z-10 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                        </svg>
                    </div>
                </a>
                
                <a routerLink="/create"
                   class="group px-10 py-5 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white font-bold text-lg hover:bg-white dark:hover:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-300/50 dark:hover:shadow-indigo-900/20 flex items-center gap-3 hover:scale-105 w-full sm:w-auto justify-center">
                    <svg class="w-6 h-6 text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2.5 2.5 0 113.536 3.536L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    Build Resume Now
                </a>
                
                <a routerLink="/chat"
                   class="group px-10 py-5 rounded-2xl bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-white font-bold text-lg hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300 hover:shadow-xl flex items-center gap-3 hover:scale-105 w-full sm:w-auto justify-center">
                    <svg class="w-6 h-6 text-purple-500 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                    </svg>
                    AI Chat Bot
                </a>
            </div>

            <!-- Premium Trust Badges -->
            <div class="mt-12 flex flex-col items-center gap-8 animate-fade-slide-up" style="animation-delay: 0.5s;">
                <div class="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                    <div class="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700 shadow-lg">
                        <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        <span class="font-semibold">No Credit Card</span>
                    </div>
                    <div class="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700 shadow-lg">
                        <svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                        <span class="font-semibold">Free Forever</span>
                    </div>
                    <div class="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700 shadow-lg">
                        <svg class="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
                        </svg>
                        <span class="font-semibold">Instant Results</span>
                    </div>
                </div>

                <!-- User Testimonials Preview -->
                <div class="flex items-center gap-4">
                    <div class="flex -space-x-4">
                        <div *ngFor="let avatar of userAvatars" 
                             class="w-12 h-12 rounded-full border-3 border-white dark:border-slate-900 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden shadow-lg hover:scale-110 hover:z-10 transition-transform cursor-pointer">
                            <img [src]="avatar" [alt]="'User ' + avatar" class="w-full h-full object-cover" loading="lazy">
                        </div>
                    </div>
                    <div class="text-left">
                        <div class="flex items-center gap-1 mb-1">
                            <span *ngFor="let star of [1,2,3,4,5]" class="text-yellow-400 text-lg">★</span>
                        </div>
                        <div class="font-bold text-slate-800 dark:text-white">4.9/5 from 3,200+ reviews</div>
                        <div class="text-xs text-slate-500 dark:text-slate-400">Trusted worldwide</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `
})
export class HeroComponent {
    @Input() userAvatars: string[] = [];
}
