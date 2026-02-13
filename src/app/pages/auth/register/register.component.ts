import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    isLoading = signal(false);
    errorMessage = signal<string | null>(null);

    registerForm = this.fb.group({
        displayName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    onSubmit() {
        if (this.registerForm.valid) {
            this.isLoading.set(true);
            this.errorMessage.set(null);

            const { email, password, displayName } = this.registerForm.value;

            this.authService.signUp(email!, password!, displayName!).subscribe({
                next: () => {
                    this.router.navigate(['/create']);
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
                this.router.navigate(['/create']);
            },
            error: (err: any) => {
                this.isLoading.set(false);
                this.errorMessage.set(this.getErrorMessage(err.code));
            }
        });
    }

    private getErrorMessage(code: string): string {
        switch (code) {
            case 'auth/email-already-in-use':
                return 'This email is already in use.';
            case 'auth/invalid-email':
                return 'Invalid email address.';
            case 'auth/weak-password':
                return 'The password is too weak.';
            case 'auth/popup-closed-by-user':
                return 'Sign-in popup was closed before completion.';
            default:
                return 'An error occurred during registration.';
        }
    }
}
