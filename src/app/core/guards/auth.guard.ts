import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, CanActivateFn } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

export const authGuard: CanActivateFn = (route, state) => {
    const auth = inject(Auth);
    const router = inject(Router);
    const platformId = inject(PLATFORM_ID);

    if (!isPlatformBrowser(platformId)) {
        return true; // Bypass check on SSR to prevent premature login redirects
    }

    return new Promise<boolean>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            // Unsubscribe immediately after getting the initial state
            unsubscribe();

            if (u) {
                resolve(true);
            } else {
                router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                resolve(false);
            }
        });
    });
};
