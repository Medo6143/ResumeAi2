import { Component, signal, ViewChild, ElementRef, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CvStateService, Profile } from '../../services/cv-state.service';

@Component({
    selector: 'app-profile-selector',
    standalone: true,
    imports: [CommonModule, FormsModule, TranslateModule],
    template: `
    <div class="relative group" (click)="$event.stopPropagation()">
        <!-- Trigger Button -->
        <button 
            (click)="toggleDropdown()"
            class="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/50 hover:bg-white/80 dark:bg-slate-800/50 dark:hover:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 transition-all shadow-sm hover:shadow-md backdrop-blur-sm group-hover:border-indigo-300 dark:group-hover:border-indigo-700">
            
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-inner">
                {{ getInitials(currentProfileName()) }}
            </div>

            <div class="flex flex-col items-start mr-1">
                <span class="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                    {{ 'CV_CREATE.PROFILES.LABEL' | translate }}
                </span>
                <span class="text-sm font-bold text-slate-800 dark:text-slate-200 max-w-[100px] truncate leading-tight">
                    {{ currentProfileName() }}
                </span>
            </div>

            <svg class="w-4 h-4 text-slate-400 transition-transform duration-300"
                [class.rotate-180]="isOpen()">
                <path fill="currentColor" d="M7 10l5 5 5-5z" />
            </svg>
        </button>

        <!-- Dropdown Menu -->
        <div *ngIf="isOpen()"
            class="absolute top-full right-0 mt-2 w-72 max-w-[90vw] bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 animate-fade-in-down origin-top-right">
            
            <!-- Header -->
            <div class="p-3 border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
                <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {{ 'CV_CREATE.PROFILES.TITLE' | translate }}
                </span>
                <button (click)="createNew()"
                    class="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-lg font-bold hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    {{ 'CV_CREATE.PROFILES.NEW' | translate }}
                </button>
            </div>

            <!-- Profile List -->
            <div class="max-h-64 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                <div *ngFor="let profile of profiles()"
                    class="group/item flex items-center gap-3 p-2 rounded-xl transition-all cursor-pointer relative overflow-hidden"
                    [class.bg-indigo-50]="isActive(profile.id)"
                    [class.dark:bg-indigo-900/20]="isActive(profile.id)"
                    [class.hover:bg-slate-50]="!isActive(profile.id)"
                    [class.dark:hover:bg-slate-700/50]="!isActive(profile.id)"
                    (click)="switchProfile(profile.id)">
                    
                    <!-- Active Indicator -->
                    <div *ngIf="isActive(profile.id)" 
                        class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full">
                    </div>

                    <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-bold text-sm shadow-sm border border-indigo-200/50 dark:border-indigo-700/30">
                        {{ getInitials(profile.name) }}
                    </div>

                    <div class="flex-1 min-w-0" *ngIf="editingId() !== profile.id; else editMode">
                        <h4 class="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                            {{ profile.name }}
                        </h4>
                        <p class="text-[10px] text-slate-500 truncate">
                            {{ 'CV_CREATE.PROFILES.EDITED' | translate }} {{ profile.updatedAt | date: 'MMM d, h:mm a' }}
                        </p>
                    </div>

                    <!-- Edit Mode Template -->
                    <ng-template #editMode>
                        <input #nameInput
                            type="text"
                            [ngModel]="editingName()"
                            (ngModelChange)="editingName.set($event)"
                            (click)="$event.stopPropagation()"
                            (keyup.enter)="saveRename(profile.id)"
                            (keydown.escape)="cancelRename()"
                            class="flex-1 min-w-0 bg-white dark:bg-slate-900 border border-indigo-300 dark:border-indigo-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            autoFocus>
                    </ng-template>

                    <!-- Actions -->
                    <div class="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity" *ngIf="editingId() !== profile.id">
                        <button (click)="startRename(profile, $event)"
                            class="p-1.5 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                            [title]="'CV_CREATE.PROFILES.RENAME' | translate">
                            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                        <button (click)="duplicate(profile.id, $event)"
                            class="p-1.5 text-slate-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                            [title]="'CV_CREATE.PROFILES.DUPLICATE' | translate">
                            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                            </svg>
                        </button>
                        <button (click)="deleteProfile(profile.id, $event)"
                            [disabled]="profiles().length <= 1"
                            class="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            [title]="'CV_CREATE.PROFILES.DELETE' | translate">
                            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    styles: [`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #475569; }
        
        .animate-fade-in-down {
            animation: fadeInDown 0.2s ease-out forwards;
        }
        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-10px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
    `]
})
export class ProfileSelectorComponent {
    private cvState = inject(CvStateService);
    private translate = inject(TranslateService);

    isOpen = signal(false);
    editingId = signal<string | null>(null);
    editingName = signal('');

    // Expose signals from service
    profiles = this.cvState.profiles;
    activeProfileId = this.cvState.activeProfileId;

    currentProfileName = computed(() => {
        const activeId = this.activeProfileId();
        const profile = this.profiles().find(p => p.id === activeId);
        return profile?.name || 'My Resume';
    });

    toggleDropdown() {
        this.isOpen.update(v => !v);
        if (!this.isOpen()) {
            this.cancelRename();
        }
    }

    isActive(id: string) {
        return this.activeProfileId() === id;
    }

    getInitials(name: string): string {
        return name
            .split(' ')
            .filter(n => n.length > 0)
            .map(n => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
    }

    switchProfile(id: string) {
        if (this.editingId()) return;
        this.cvState.switchProfile(id);
        this.isOpen.set(false);
    }

    createNew() {
        const name = `Resume ${this.profiles().length + 1}`;
        this.cvState.createProfile(name);
        this.isOpen.set(false);
    }

    duplicate(id: string, event: Event) {
        event.stopPropagation();
        this.cvState.duplicateProfile(id);
    }

    deleteProfile(id: string, event: Event) {
        event.stopPropagation();
        const msg = this.translate.instant('CV_CREATE.PROFILES.DELETE_CONFIRM');
        if (confirm(msg)) {
            this.cvState.deleteProfile(id);
        }
    }

    startRename(profile: Profile, event: Event) {
        event.stopPropagation();
        this.editingId.set(profile.id);
        this.editingName.set(profile.name);
    }

    saveRename(id: string) {
        if (this.editingName().trim()) {
            this.cvState.renameProfile(id, this.editingName().trim());
        }
        this.editingId.set(null);
    }

    cancelRename() {
        this.editingId.set(null);
    }
}
