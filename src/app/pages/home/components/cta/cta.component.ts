import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
    selector: 'app-cta',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './cta.component.html'
})
export class CtaComponent {
    authService = inject(AuthService);
}
