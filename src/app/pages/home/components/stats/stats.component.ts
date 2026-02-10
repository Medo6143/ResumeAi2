import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-stats',
    standalone: true,
    imports: [CommonModule],
    template: `
    <section class="relative py-24 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/30 to-transparent dark:via-indigo-900/10"></div>
        
        <div class="relative max-w-6xl mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-black text-slate-900 dark:text-white mb-4">
                    Trusted by <span class="text-indigo-600 dark:text-indigo-400">Thousands</span> Worldwide
                </h2>
                <p class="text-xl text-slate-600 dark:text-slate-300">Real results from real professionals</p>
            </div>

            <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div *ngFor="let stat of stats; trackBy: trackByIndex" 
                     class="group text-center p-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl border-2 border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl hover:scale-105 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-500 cursor-pointer">
                    <div class="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 mb-3 group-hover:scale-110 transition-transform">
                        {{ stat.value }}
                    </div>
                    <div class="text-lg font-bold text-slate-900 dark:text-white mb-2">{{ stat.label }}</div>
                    <div class="text-sm text-slate-500 dark:text-slate-400">{{ stat.description }}</div>
                    <div class="mt-4 h-1.5 w-16 mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full group-hover:w-20 transition-all duration-500"></div>
                </div>
            </div>
        </div>
    </section>
  `
})
export class StatsComponent {
    @Input() stats: any[] = [];

    trackByIndex(index: number): number {
        return index;
    }
}
