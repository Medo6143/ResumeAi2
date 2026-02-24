import { Injectable, inject } from '@angular/core';
import { Firestore, collectionGroup, collection, query, where, doc, updateDoc, getDocs } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserProfile } from '../../pages/profile/models/user-profile.model';
import { ActivityLogService } from './activity-log.service';

export interface AdminUserDisplay {
  id: string; // the actual uid
  fullName: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'blocked';
  lastUpdated: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  private firestore = inject(Firestore);
  private activityLog = inject(ActivityLogService);

  /**
   * Retrieves all user profiles by querying the 'profile' collectionGroup.
   * Note: This requires a Firestore composite index on the 'profile' collection group if combined with other queries.
   */
  getAllUsers(): Observable<AdminUserDisplay[]> {
    // Query all documents in any collection named 'profile'
    // Assuming the document ID is 'master' and the parent is 'users/{userId}'
    const profilesQuery = query(collectionGroup(this.firestore, 'profile'));

    return from(getDocs(profilesQuery)).pipe(
      map(snapshot => {
        return snapshot.docs.map(docSnap => {
          const data = docSnap.data() as UserProfile;
          const userId = docSnap.ref.parent.parent?.id || 'unknown'; // Extract the actual parent user ID

          return {
            id: userId,
            fullName: data.personalInfo?.fullName || 'Anonymous User',
            email: data.personalInfo?.email || 'N/A',
            role: data.role || 'user',
            status: data.status || 'active',
            lastUpdated: data.lastUpdated || Date.now()
          } as AdminUserDisplay;
        });
      }),
      catchError(err => {
        console.error('[AdminUserService] Error fetching users from collectionGroup:', err);
        return of([]);
      })
    );
  }

  /**
   * Updates a user's role (admin/user)
   */
  async updateUserRole(userId: string, targetRole: 'user' | 'admin'): Promise<void> {
    const userProfileRef = doc(this.firestore, `users/${userId}/profile/master`);
    await updateDoc(userProfileRef, { role: targetRole });
    this.activityLog.logEvent({
      type: 'role_change',
      userId,
      description: `User ${userId} role changed to ${targetRole}`
    });
  }

  /**
   * Updates a user's status (block/unblock)
   * Note: Implementing true blocking requires Firebase Auth Custom Claims or Security Rules checking this field.
   */
  async updateUserStatus(userId: string, targetStatus: 'active' | 'blocked'): Promise<void> {
    const userProfileRef = doc(this.firestore, `users/${userId}/profile/master`);
    await updateDoc(userProfileRef, { status: targetStatus });
    this.activityLog.logEvent({
      type: 'user_blocked',
      userId,
      description: `User ${userId} status changed to ${targetStatus}`
    });
  }
}
