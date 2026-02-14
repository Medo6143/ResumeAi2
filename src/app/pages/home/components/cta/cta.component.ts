import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-cta',
    standalone: true,
    imports: [CommonModule, RouterLink, TranslateModule],
    templateUrl: './cta.component.html'
})
export class CtaComponent {
    authService = inject(AuthService);
}
