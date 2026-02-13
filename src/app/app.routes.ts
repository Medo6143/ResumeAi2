import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AtsAnalysisComponent } from './pages/ats-analysis/ats-analysis.component';
import { CvCreationComponent } from './pages/cv-creation/cv-creation.component';
import { TemplatesComponent } from './pages/templates/templates.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'ats-analysis', component: AtsAnalysisComponent, canActivate: [authGuard] },
    { path: 'templates', component: TemplatesComponent, canActivate: [authGuard] },
    { path: 'create', component: CvCreationComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '' }
];
