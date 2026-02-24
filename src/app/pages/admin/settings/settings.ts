import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { ActivityLogService } from '../../../core/services/activity-log.service';

export interface AppSettings {
    registrationEnabled: boolean;
    maintenanceMode: boolean;
    defaultLanguage: 'en' | 'ar';
    maxCVsPerUser: number;
    siteName: string;
}

const DEFAULT_SETTINGS: AppSettings = {
    registrationEnabled: true,
    maintenanceMode: false,
    defaultLanguage: 'en',
    maxCVsPerUser: 10,
    siteName: 'ResumeAI'
};

@Component({
    selector: 'app-settings',
    imports: [CommonModule, FormsModule],
    templateUrl: './settings.html',
    styleUrl: './settings.css'
})
export class Settings implements OnInit {
    private firestore = inject(Firestore);
    private activityLog = inject(ActivityLogService);

    settings = signal<AppSettings>(DEFAULT_SETTINGS);
    isLoading = signal(true);
    isSaving = signal(false);
    saveMessage = signal<string | null>(null);

    async ngOnInit() {
        try {
            const docRef = doc(this.firestore, 'admin/config');
            const snap = await getDoc(docRef);
            if (snap.exists()) {
                this.settings.set({ ...DEFAULT_SETTINGS, ...snap.data() as Partial<AppSettings> });
            }
        } catch (err) {
            console.error('[Settings] Error loading settings:', err);
        } finally {
            this.isLoading.set(false);
        }
    }

    async saveSettings() {
        this.isSaving.set(true);
        this.saveMessage.set(null);
        try {
            const docRef = doc(this.firestore, 'admin/config');
            await setDoc(docRef, this.settings(), { merge: true });
            this.saveMessage.set('Settings saved successfully!');
            this.activityLog.logEvent({
                type: 'settings_change',
                description: `Admin settings updated`
            });
            setTimeout(() => this.saveMessage.set(null), 3000);
        } catch (err) {
            console.error('[Settings] Error saving settings:', err);
            this.saveMessage.set('Failed to save settings.');
        } finally {
            this.isSaving.set(false);
        }
    }

    updateSetting(key: keyof AppSettings, value: any) {
        this.settings.update(s => ({ ...s, [key]: value }));
    }
}
