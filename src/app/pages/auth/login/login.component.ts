import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, TranslateModule],
    templateUrl: './login.component.html'
})
export class LoginComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);

    isLoading = signal(false);
    errorMessage = signal<string | null>(null);

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    onSubmit() {
        if (this.loginForm.valid) {
            this.isLoading.set(true);
            this.errorMessage.set(null);

            const { email, password } = this.loginForm.value;

            this.authService.signIn(email!, password!).subscribe({
                next: () => {
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/create';
                    this.router.navigateByUrl(returnUrl);
                },
                error: (err) => {
                    this.isLoading.set(false);
                    this.errorMessage.set(this.getErrorMessage(err.code));
                }
            });
        }
    }

    onGoogleSignIn() {
        this.isLoading.set(true);
        this.errorMessage.set(null);

        this.authService.signInWithGoogle().subscribe({
            next: () => {
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/create';
                this.router.navigateByUrl(returnUrl);
            },
            error: (err: any) => {
                this.isLoading.set(false);
                this.errorMessage.set(this.getErrorMessage(err.code));
            }
        });
    }

    private getErrorMessage(code: string): string {
        switch (code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
                return 'Invalid email or password.';
            case 'auth/too-many-requests':
                return 'Too many attempts. Please try again later.';
            case 'auth/popup-closed-by-user':
                return 'Sign-in popup was closed before completion.';
            default:
                return 'An error occurred during sign in.';
        }
    }
}
