import { Component, signal, inject, effect } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('resume-ai');
  private router = inject(Router);
  hideLayout = signal(false);

  constructor() {
    this.updateLayoutVisibility(this.router.url);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateLayoutVisibility(event instanceof NavigationEnd ? (event as NavigationEnd).urlAfterRedirects : this.router.url);
    });
  }

  private updateLayoutVisibility(url: string) {
    this.hideLayout.set(url.includes('/login') || url.includes('/register'));
  }
}
