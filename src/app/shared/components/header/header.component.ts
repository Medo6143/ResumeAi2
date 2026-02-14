import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { AuthService } from '../../../core/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    isMenuOpen = false;
    langService = inject(LanguageService);

    constructor(
        public themeService: ThemeService,
        public authService: AuthService,
        @Inject(Router) private router: Router
    ) { }

    logout() {
        this.authService.logout().subscribe(() => {
            this.router.navigate(['/']);
            this.closeMenu();
        });
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu() {
        this.isMenuOpen = false;
    }

    isActiveRoute(route: string): boolean {
        return this.router.url === route;
    }
}
