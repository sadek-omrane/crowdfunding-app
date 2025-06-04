import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./projects/projects.routes').then(
        (m) => m.ProjectsRoutes
      ),
  },
  {
    path: 'page-contents',
    loadChildren: () =>
      import('./page-contents/page-contents.routes').then(
        (m) => m.PageContentsRoutes
      ),
  },
  {
    path: 'partners',
    loadChildren: () =>
      import('./partners/partners.routes').then(
        (m) => m.PartnersRoutes
      ),
  },
  {
    path: 'testmonials',
    loadChildren: () =>
      import('./testmonials/testmonials.routes').then(
        (m) => m.TestmonialsRoutes
      ),
  },
  {
    path: 'ui-components',
    loadChildren: () =>
      import('./ui-components/ui-components.routes').then(
        (m) => m.UiComponentsRoutes
      ),
  },
  {
    path: 'extra',
    loadChildren: () =>
      import('./extra/extra.routes').then((m) => m.ExtraRoutes),
  },
];




