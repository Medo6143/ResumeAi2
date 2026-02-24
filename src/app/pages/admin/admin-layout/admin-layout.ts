import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { UserDataService } from '../../../core/services/user-data.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout implements OnInit {
  private authService = inject(AuthService);
  private auth = inject(Auth);
  private userDataService = inject(UserDataService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  sidebarOpen = signal(false);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      onAuthStateChanged(this.auth, (user) => {
        if (!user) {
          this.router.navigate(['/login']);
        } else {
          this.userDataService.getMasterProfileOnce(user.uid).then(profile => {
            if (!profile || profile.role !== 'admin') {
              this.router.navigate(['/profile']);
            }
          }).catch(() => {
            this.router.navigate(['/profile']);
          });
        }
      });

      // Close sidebar on route change
      this.router.events.subscribe(() => {
        this.sidebarOpen.set(false);
      });
    }
  }

  toggleSidebar() {
    this.sidebarOpen.update(v => !v);
  }

  closeSidebar() {
    this.sidebarOpen.set(false);
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
