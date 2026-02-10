import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-features',
    standalone: true,
    imports: [CommonModule],
    template: `
    <section class="relative max-w-7xl mx-auto px-4 py-24 z-10">
        <!-- Section Header -->
        <div class="text-center mb-20 animate-fade-slide-up">
            <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900/40 dark:via-purple-900/40 dark:to-pink-900/40 border border-indigo-200/50 dark:border-indigo-700/50 mb-6">
                <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
                <span class="text-sm font-bold text-indigo-700 dark:text-indigo-300">POWERFUL AI FEATURES</span>
            </div>
            <h2 class="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
                Everything You Need to
                <span class="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                    Stand Out & Get Hired
                </span>
            </h2>
            <p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Cutting-edge AI tools designed to optimize every aspect of your job search journey
            </p>
        </div>

        <!-- Premium Bento Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
            
            <!-- Card 1: Analyzer (Spotlight) -->
            <div class="lg:col-span-2 lg:row-span-2 group relative bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-10 overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-500 shadow-2xl hover:shadow-indigo-500/50">
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
                
                <div class="relative z-10 h-full flex flex-col justify-between text-white">
                    <div>
                        <div class="inline-flex items-center gap-3 mb-6">
                            <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                </svg>
                            </div>
                            <span class="px-4 py-1.5 rounded-full bg-emerald-500/90 text-white text-xs font-black shadow-lg">
                                MOST POPULAR
                            </span>
                        </div>
                        
                        <h3 class="text-3xl font-black mb-4">AI Resume Analyzer</h3>
                        <p class="text-indigo-100 text-lg mb-8 leading-relaxed">
                            Deep scan of 50+ ATS parameters with instant keyword optimization, formatting checks, and skill gap analysis
                        </p>
                    </div>

                    <!-- Live Demo Preview -->
                    <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-sm font-bold">Your ATS Score</span>
                            <span class="px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 text-white text-sm font-black shadow-lg">
                                96%
                            </span>
                        </div>
                        <div class="space-y-3">
                            <div class="flex justify-between text-sm">
                                <span class="text-indigo-200">Keyword Match</span>
                                <span class="font-bold">98%</span>
                            </div>
                            <div class="h-2 bg-white/20 rounded-full overflow-hidden">
                                <div class="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-progress" style="width: 98%"></div>
                            </div>
                            
                            <div class="flex justify-between text-sm">
                                <span class="text-indigo-200">Format Score</span>
                                <span class="font-bold">95%</span>
                            </div>
                            <div class="h-2 bg-white/20 rounded-full overflow-hidden">
                                <div class="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-progress" style="width: 95%; animation-delay: 0.2s;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Card 2: CV Builder -->
            <div class="lg:col-span-1 lg:row-span-1 group relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 border-2 border-slate-200 dark:border-slate-700 overflow-hidden cursor-pointer hover:scale-[1.02] hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-500 shadow-xl hover:shadow-2xl">
                <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-200/20 to-amber-200/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div class="relative z-10">
                    <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform shadow-lg">
                        <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2.5 2.5 0 113.536 3.536L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-3">Resume Builder</h3>
                    <p class="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        Professional templates with live preview and AI-powered content generation
                    </p>
                    <div class="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 font-bold group-hover:gap-3 transition-all">
                        <span>Create Now</span>
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Card 3: AI Chat -->
            <div class="lg:col-span-1 lg:row-span-1 group relative bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-500 shadow-xl hover:shadow-purple-500/50 text-white">
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
                
                <div class="relative z-10">
                    <div class="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                        <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-black mb-3">AI Chat Assistant</h3>
                    <p class="text-purple-100 leading-relaxed mb-4">
                        Build your resume by chatting naturally with our AI
                    </p>
                    <div class="inline-flex items-center gap-2 text-white/90 font-bold">
                        <span>Try Chat</span>
                        <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Card 4: File Upload -->
            <div class="lg:col-span-1 lg:row-span-1 group relative bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl p-8 overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-500 shadow-xl hover:shadow-blue-500/50 text-white">
                <div class="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-20 -translate-x-20 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div class="relative z-10">
                    <div class="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mb-4 shadow-lg">
                        <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                        </svg>
                    </div>
                    <h3 class="text-2xl font-black mb-3">Smart Parser</h3>
                    <p class="text-cyan-100 leading-relaxed">
                        Upload PDF, DOC, or DOCX - instant text extraction
                    </p>
                </div>
            </div>

            <!-- Card 5: Templates -->
            <div class="lg:col-span-1 lg:row-span-1 group relative bg-white dark:bg-slate-800 rounded-3xl p-8 border-2 border-slate-200 dark:border-slate-700 overflow-hidden cursor-pointer hover:scale-[1.02] hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-500 shadow-xl">
                <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform shadow-lg">
                    <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"/>
                    </svg>
                </div>
                <h3 class="text-xl font-black text-slate-900 dark:text-white mb-2">3 Pro Templates</h3>
                <p class="text-slate-600 dark:text-slate-300 text-sm">Modern, Minimal & Executive designs</p>
            </div>

            <!-- Card 6: PDF Export -->
            <div class="lg:col-span-2 lg:row-span-1 group relative bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 overflow-hidden cursor-pointer hover:scale-[1.01] transition-all duration-500 shadow-xl hover:shadow-emerald-500/50 text-white">
                <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-50"></div>
                
                <div class="relative z-10 flex items-center justify-between">
                    <div class="max-w-md">
                        <h3 class="text-3xl font-black mb-3">One-Click PDF Export</h3>
                        <p class="text-emerald-100 text-lg">
                            Download perfectly formatted, ATS-optimized PDFs instantly
                        </p>
                    </div>
                    <div class="hidden md:block">
                        <div class="w-24 h-32 bg-white/20 backdrop-blur-sm rounded-xl border-2 border-white/30 shadow-2xl rotate-6 group-hover:rotate-12 transition-transform"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `
})
export class FeaturesComponent { }
