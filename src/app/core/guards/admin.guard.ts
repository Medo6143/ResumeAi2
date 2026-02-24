import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, CanActivateFn } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { UserDataService } from '../services/user-data.service';

export const adminGuard: CanActivateFn = (route, state) => {
    const auth = inject(Auth);
    const userDataService = inject(UserDataService);
    const router = inject(Router);
    const platformId = inject(PLATFORM_ID);

    if (!isPlatformBrowser(platformId)) {
        return true; // Bypass check on SSR to prevent premature login redirects
    }

    return new Promise<boolean>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            unsubscribe();

            console.log('[AdminGuard] onAuthStateChanged fired. User:', u?.uid);

            if (!u) {
                console.warn('[AdminGuard] No user found. Redirecting to /login');
                router.navigate(['/login']);
                resolve(false);
                return;
            }

            // Check user's role in their profile
            userDataService.getMasterProfileOnce(u.uid).then(profile => {
                console.log('[AdminGuard] Profile Fetched:', profile);
                if (profile && profile.role === 'admin') {
                    console.log('[AdminGuard] Access GRANTED.');
                    resolve(true);
                } else {
                    console.warn(`[AdminGuard] Access DENIED. Profile Role is: ${profile?.role}. Redirecting to /profile`);
                    router.navigate(['/profile']);
                    resolve(false);
                }
            }).catch((err) => {
                console.error('[AdminGuard] Failed to fetch master profile:', err);
                router.navigate(['/profile']);
                resolve(false);
            });
        });
    });
};
