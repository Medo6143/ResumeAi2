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

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private auth = inject(Auth);

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
            (response) => {
                return updateProfile(response.user, { displayName });
            }
        );
        return from(promise);
    }

    signIn(email: string, password: string) {
        const promise = signInWithEmailAndPassword(this.auth, email, password);
        return from(promise);
    }

    signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const promise = signInWithPopup(this.auth, provider);
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
