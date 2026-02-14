import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule, RouterLink, TranslateModule],
    templateUrl: './hero.component.html'
})
export class HeroComponent {
    @Input() userAvatars: string[] = [];
    authService = inject(AuthService);
    langService = inject(LanguageService);
}
