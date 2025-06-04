import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ClientLayoutComponent } from './layouts/client/client-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard/dashboard-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/client',
    pathMatch: 'full',
  },
  {
    path: 'client',
    component: ClientLayoutComponent,
    loadChildren: () =>
      import('./modules/client/client.routes').then(
        (m) => m.ClientRoutes
      ),
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    loadChildren: () =>
      import('./modules/dashboard/dashboard.routes').then(
        (m) => m.DashboardRoutes
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./modules/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
