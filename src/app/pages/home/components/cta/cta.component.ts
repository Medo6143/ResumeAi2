import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-cta',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <section class="relative max-w-6xl mx-auto px-4 py-32">
        <div class="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 rounded-[3rem] p-16 text-center overflow-hidden shadow-2xl">
            <!-- Animated background effects -->
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent animate-pulse-slow"></div>
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent animate-pulse-slower"></div>
            
            <!-- Grid overlay -->
            <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
            
            <div class="relative z-10">
                <div class="inline-block mb-6">
                    <div class="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-400/30 text-emerald-300 font-bold text-sm backdrop-blur-sm">
                        LIMITED TIME OFFER
                    </div>
                </div>

                <h2 class="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                    Ready to 10x Your
                    <span class="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-cyan-300 to-blue-300">
                        Interview Success Rate?
                    </span>
                </h2>
                
                <p class="text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                    Join <span class="font-black text-white text-3xl">25,000+</span> professionals who transformed their careers with AI
                </p>
                
                <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
                    <a routerLink="/analyze" 
                       class="group relative px-14 py-6 rounded-full bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 bg-size-200 animate-gradient-x text-white font-black text-xl hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500 hover:scale-110 active:scale-95 overflow-hidden w-full sm:w-auto justify-center">
                        <div class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                        <span class="relative flex items-center gap-3">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
                            </svg>
                            Start Free Analysis Now
                        </span>
                    </a>
                    
                    <a routerLink="/create"
                       class="px-14 py-6 rounded-full bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white font-bold text-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center">
                        Build Your Resume
                    </a>
                </div>
                
                <div class="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
                    <div class="flex items-center gap-2">
                        <svg class="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        <span class="font-semibold text-white">100% Free Forever</span>
                    </div>
                    <span class="text-slate-500">•</span>
                    <div class="flex items-center gap-2">
                        <svg class="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        <span class="font-semibold text-white">No Credit Card Required</span>
                    </div>
                    <span class="text-slate-500">•</span>
                    <div class="flex items-center gap-2">
                        <svg class="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                        <span class="font-semibold text-white">Instant Results</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `
})
export class CtaComponent { }
