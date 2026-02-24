import { Injectable, inject } from '@angular/core';
import { Firestore, collectionGroup, getDocs, collection } from '@angular/fire/firestore';
import { map, Observable, combineLatest, of, from, catchError, switchMap } from 'rxjs';
import { UserProfile } from '../../pages/profile/models/user-profile.model';

export interface DashboardStats {
  totalUsers: number;
  totalCVs: number;
  dau: number; // Daily Active Users
  mau: number; // Monthly Active Users
}

export interface TemplateUsage {
  templateId: string;
  uses: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private firestore = inject(Firestore);

  /**
   * Calculates user aggregate statistics by pulling profiles.
   * Note: Given current implementation, this fetches all master profiles to calculate DAU/MAU
   * based on `lastUpdated` property.
   */
  getDashboardStats(): Observable<DashboardStats> {
    const profilesQuery = collectionGroup(this.firestore, 'profile');

    return from(getDocs(profilesQuery)).pipe(
      switchMap(snapshot => {
        const profiles = snapshot.docs.map(doc => doc.data() as UserProfile);
        const userIds = snapshot.docs.map(doc => doc.ref.parent.parent?.id).filter(id => !!id) as string[];
        const now = Date.now();
        const oneDayInMs = 24 * 60 * 60 * 1000;
        const thirtyDaysInMs = 30 * oneDayInMs;

        let dau = 0;
        let mau = 0;

        profiles.forEach(p => {
          const diff = now - (p.lastUpdated || 0);
          if (diff <= oneDayInMs) dau++;
          if (diff <= thirtyDaysInMs) mau++;
        });

        // Count total CVs across all users
        if (userIds.length === 0) {
          return of({ totalUsers: profiles.length, totalCVs: 0, dau, mau });
        }

        const resumePromises = userIds.map(uid =>
          getDocs(collection(this.firestore, `users/${uid}/resumes`))
        );

        return from(Promise.all(resumePromises)).pipe(
          map(resumeSnapshots => {
            let totalCVs = 0;
            resumeSnapshots.forEach(s => totalCVs += s.size);
            return { totalUsers: profiles.length, totalCVs, dau, mau };
          })
        );
      }),
      catchError(err => {
        console.error('[AnalyticsService] Error fetching dashboard stats:', err);
        return of({ totalUsers: 0, totalCVs: 0, dau: 0, mau: 0 });
      })
    );
  }

  /**
   * Calculates which templates are the most popular by pulling all user resumes.
   * Note: Uses `collectionGroup` on 'resumes' to aggregate global stats.
   */
  getMostUsedTemplates(): Observable<TemplateUsage[]> {
    const ALL_TEMPLATES = [
      'ats-1', 'ats-2', 'ats-3', 'ats-4', 'ats-5',
      'executive', 'minimal', 'modern',
      'photo-1', 'photo-10', 'photo-2', 'photo-3', 'photo-4', 'photo-5', 'photo-6', 'photo-7', 'photo-8', 'photo-9',
      'pro-1', 'pro-10', 'pro-11', 'pro-12', 'pro-13', 'pro-14', 'pro-15', 'pro-16', 'pro-17', 'pro-2', 'pro-3', 'pro-4', 'pro-5', 'pro-6', 'pro-7', 'pro-8', 'pro-9'
    ];

    // We cannot use collectionGroup('resumes') unless Firestore Rules explicitly allow it.
    // Instead, we first get all users from 'profile/master' collectionGroup 
    // (which we know is now allowed), then fetch their resumes explicitly.
    const profilesQuery = collectionGroup(this.firestore, 'profile');

    return from(getDocs(profilesQuery)).pipe(
      switchMap(profileSnapshot => {
        const userIds = profileSnapshot.docs.map(doc => doc.ref.parent.parent?.id).filter(id => !!id) as string[];

        if (userIds.length === 0) {
          return of([]);
        }

        // Fetch all resumes for all discovered users in parallel
        const resumePromises = userIds.map(uid =>
          getDocs(collection(this.firestore, `users/${uid}/resumes`))
        );

        return from(Promise.all(resumePromises)).pipe(
          map(resumeSnapshots => {
            // Pre-populate ALL templates so it's never completely empty and shows full ranking
            const templateCounts: Record<string, number> = {};
            ALL_TEMPLATES.forEach(t => templateCounts[t] = 0);

            resumeSnapshots.forEach(snapshot => {
              snapshot.docs.forEach(doc => {
                const r = doc.data() as any;
                const tempId = r.templateId || r.design?.template || 'unknown';
                templateCounts[tempId] = (templateCounts[tempId] || 0) + 1;
              });
            });

            return Object.entries(templateCounts)
              .map(([templateId, uses]) => ({ templateId, uses }))
              .sort((a, b) => b.uses - a.uses); // Remove slice to show all templates as requested
          })
        );
      }),
      catchError(err => {
        console.error('[AnalyticsService] Error fetching most used templates:', err);
        return of(ALL_TEMPLATES.map(t => ({ templateId: t, uses: 0 })));
      })
    );
  }

  /**
   * Generates simulated trend data for the chart UI since we aren't using a dedicated time-series
   * logging database like Google Analytics or Cloud Functions currently.
   */
  getUsageTrends(): Observable<{ date: string, uses: number }[]> {
    const profilesQuery = collectionGroup(this.firestore, 'profile');

    return from(getDocs(profilesQuery)).pipe(
      map(snapshot => {
        const profiles = snapshot.docs.map(doc => doc.data() as UserProfile);

        // Generate last 7 days keys
        const now = new Date();
        const trends: Record<string, number> = {};
        const dateLabels: string[] = [];

        for (let i = 6; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(d.getDate() - i);
          const dateStr = d.toLocaleDateString('en-US', { weekday: 'short' }); // e.g. 'Mon', 'Tue'
          trends[dateStr] = 0;
          dateLabels.push(dateStr);
        }

        // Calculate active users based on lastUpdated property
        const sevenDaysAgo = now.getTime() - (7 * 24 * 60 * 60 * 1000);

        profiles.forEach(p => {
          if (p.lastUpdated && p.lastUpdated >= sevenDaysAgo) {
            const d = new Date(p.lastUpdated);
            const dateStr = d.toLocaleDateString('en-US', { weekday: 'short' });
            if (trends[dateStr] !== undefined) {
              trends[dateStr]++;
            }
          }
        });

        return dateLabels.map(date => ({ date, uses: trends[date] }));
      }),
      catchError(err => {
        console.error('[AnalyticsService] Error fetching trends:', err);
        return of([]);
      })
    );
  }
}
