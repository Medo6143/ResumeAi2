import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    isMenuOpen = false;

    constructor(
        public themeService: ThemeService,
        @Inject(Router) private router: Router
    ) { }

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
