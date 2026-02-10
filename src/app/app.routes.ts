import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AtsAnalysisComponent } from './pages/ats-analysis/ats-analysis.component';
import { CvCreationComponent } from './pages/cv-creation/cv-creation.component';
import { TemplatesComponent } from './pages/templates/templates.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'ats-analysis', component: AtsAnalysisComponent },
    { path: 'templates', component: TemplatesComponent },
    { path: 'create', component: CvCreationComponent },
    { path: '**', redirectTo: '' }
];
