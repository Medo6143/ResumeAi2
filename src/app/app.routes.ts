import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { CvCreationComponent } from './pages/cv-creation/cv-creation.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent) },
    { path: 'register', loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent) },
    { path: 'ats-analysis', loadComponent: () => import('./pages/ats-analysis/ats-analysis.component').then(m => m.AtsAnalysisComponent), canActivate: [authGuard] },
    { path: 'templates', loadComponent: () => import('./pages/templates/templates.component').then(m => m.TemplatesComponent), canActivate: [authGuard] },
    { path: 'create', loadComponent: () => import('./pages/cv-creation/cv-creation.component').then(m => m.CvCreationComponent), canActivate: [authGuard] },
    { path: 'profile', loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent), canActivate: [authGuard] },
    { path: 'mock-interview', loadComponent: () => import('./pages/mock-interview/mock-interview.component').then(m => m.MockInterviewComponent), canActivate: [authGuard] },
    { path: 'mock-interview/voice', loadComponent: () => import('./pages/mock-interview/components/voice-interview.component').then(m => m.VoiceInterviewComponent), canActivate: [authGuard] },
    { path: '404', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) },
    { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
