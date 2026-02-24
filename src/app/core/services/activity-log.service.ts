import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, getDocs } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface ActivityEvent {
    id?: string;
    type: 'signup' | 'login' | 'cv_created' | 'role_change' | 'user_blocked' | 'settings_change';
    userId?: string;
    userName?: string;
    description: string;
    timestamp: number;
    metadata?: Record<string, any>;
}

@Injectable({
    providedIn: 'root'
})
export class ActivityLogService {
    private firestore = inject(Firestore);

    /**
     * Log a new activity event to Firestore
     */
    async logEvent(event: Omit<ActivityEvent, 'id' | 'timestamp'>): Promise<void> {
        try {
            const colRef = collection(this.firestore, 'admin_logs');
            await addDoc(colRef, {
                ...event,
                timestamp: Date.now()
            });
            console.log('[ActivityLog] Event logged:', event.type, event.description);
        } catch (err) {
            console.error('[ActivityLogService] Failed to log event:', err);
        }
    }

    /**
     * Get recent activity logs - fetches all and sorts client-side to avoid index requirement
     */
    getRecentLogs(count: number = 50): Observable<ActivityEvent[]> {
        // Simple getDocs without orderBy to avoid needing a Firestore index
        const colRef = collection(this.firestore, 'admin_logs');

        return from(getDocs(colRef)).pipe(
            map(snapshot => {
                const logs = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as ActivityEvent[];

                // Sort client-side (newest first) and limit
                return logs
                    .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
                    .slice(0, count);
            }),
            catchError(err => {
                console.error('[ActivityLogService] Error fetching logs:', err);
                return of([]);
            })
        );
    }

    /**
     * Get icon and color class for event type
     */
    static getEventMeta(type: string): { icon: string; color: string; label: string } {
        const meta: Record<string, { icon: string; color: string; label: string }> = {
            'signup': { icon: '👤', color: 'text-emerald-400 bg-emerald-500/10', label: 'New Signup' },
            'login': { icon: '🔑', color: 'text-blue-400 bg-blue-500/10', label: 'Login' },
            'cv_created': { icon: '📄', color: 'text-indigo-400 bg-indigo-500/10', label: 'CV Created' },
            'role_change': { icon: '🛡️', color: 'text-purple-400 bg-purple-500/10', label: 'Role Change' },
            'user_blocked': { icon: '🚫', color: 'text-red-400 bg-red-500/10', label: 'User Blocked' },
            'settings_change': { icon: '⚙️', color: 'text-amber-400 bg-amber-500/10', label: 'Settings Changed' }
        };
        return meta[type] || { icon: '📌', color: 'text-slate-400 bg-slate-500/10', label: 'Event' };
    }
}
