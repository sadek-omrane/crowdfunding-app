import { Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjectFormComponent } from './project-form.component';

export const ProjectsRoutes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
  },
  {
    path: 'create',
    component: ProjectFormComponent,
  },
  {
    path: 'edit/:id',
    component: ProjectFormComponent,
  }
];
