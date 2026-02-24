import { Injectable, inject, signal } from '@angular/core';
import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    user,
    User,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDataService } from './user-data.service';
import { INITIAL_USER_PROFILE } from '../../pages/profile/models/user-profile.model';
import { ActivityLogService } from './activity-log.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private auth = inject(Auth);
    private userDataService = inject(UserDataService);
    private activityLog = inject(ActivityLogService);

    // Observable of the current user
    user$ = user(this.auth);

    // Signal for synchronous access to user state (optional but handy)
    currentUser = signal<User | null | undefined>(undefined);

    constructor() {
        this.user$.subscribe(user => {
            this.currentUser.set(user);
        });
    }

    signUp(email: string, password: string, displayName: string) {
        const promise = createUserWithEmailAndPassword(this.auth, email, password).then(
            async (response) => {
                await updateProfile(response.user, { displayName });

                // Synchronize Auth data to Firestore Master Profile
                console.log('[AuthService] New user signed up. Syncing Auth data to Master Profile...', response.user.uid);
                const profile = { ...INITIAL_USER_PROFILE, personalInfo: { ...INITIAL_USER_PROFILE.personalInfo, email: response.user.email || email, fullName: displayName } };
                await this.userDataService.saveMasterProfile(response.user.uid, profile);
                console.log('[AuthService] Master Profile synchronized successfully.');

                // Log signup event
                this.activityLog.logEvent({
                    type: 'signup',
                    userId: response.user.uid,
                    userName: displayName,
                    description: `New user registered: ${displayName} (${email})`
                });

                return response;
            }
        );
        return from(promise);
    }

    signIn(email: string, password: string) {
        const promise = signInWithEmailAndPassword(this.auth, email, password).then(response => {
            // Log login event
            this.activityLog.logEvent({
                type: 'login',
                userId: response.user.uid,
                userName: response.user.displayName || email,
                description: `User logged in: ${response.user.displayName || email}`
            });
            return response;
        });
        return from(promise);
    }

    signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const promise = signInWithPopup(this.auth, provider).then(async (response) => {
            // Check if profile exists; if not or if we just want to ensure Auth data is synced
            console.log('[AuthService] Google Sign-In successful. Syncing Auth data to Master Profile...', response.user.uid);
            const existingProfile = await this.userDataService.getMasterProfileOnce(response.user.uid);
            const baseProfile = existingProfile || INITIAL_USER_PROFILE;

            const profile = {
                ...baseProfile,
                personalInfo: {
                    ...baseProfile.personalInfo,
                    email: response.user.email || '',
                    fullName: response.user.displayName || ''
                }
            };
            await this.userDataService.saveMasterProfile(response.user.uid, profile);
            console.log('[AuthService] Master Profile synchronized successfully.');

            // Log Google sign-in event
            this.activityLog.logEvent({
                type: 'login',
                userId: response.user.uid,
                userName: response.user.displayName || '',
                description: `Google sign-in: ${response.user.displayName || response.user.email}`
            });

            return response;
        });
        return from(promise);
    }

    logout() {
        const promise = signOut(this.auth);
        return from(promise);
    }

    get isLoggedIn(): boolean {
        return !!this.auth.currentUser;
    }
}
