import { Injectable, inject } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { Observable, of } from 'rxjs';
import { Resume } from '../../pages/cv-creation/models/resume.model';
import { UserProfile } from '../../pages/profile/models/user-profile.model';

@Injectable({
    providedIn: 'root'
})
export class UserDataService {
    private firestoreService = inject(FirestoreService);

    // --- Master Profile ---

    getMasterProfile(userId: string): Observable<UserProfile | undefined> {
        return this.firestoreService.doc$<UserProfile>(`users/${userId}/profile/master`);
    }

    getMasterProfileOnce(userId: string): Promise<UserProfile | undefined> {
        return this.firestoreService.get<UserProfile>(`users/${userId}/profile/master`);
    }

    // --- Resumes ---

    async getResumesOnce(userId: string): Promise<any[]> {
        return this.firestoreService.getCollection(`users/${userId}/resumes`);
    }

    saveMasterProfile(userId: string, profile: UserProfile): Promise<void> {
        return this.firestoreService.set(`users/${userId}/profile/master`, profile);
    }

    saveResume(userId: string, resumeId: string, resume: any): Promise<void> {
        return this.firestoreService.set(`users/${userId}/resumes/${resumeId}`, resume);
    }

    deleteResume(userId: string, resumeId: string): Promise<void> {
        return this.firestoreService.delete(`users/${userId}/resumes/${resumeId}`);
    }
}
