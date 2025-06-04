import { Routes } from '@angular/router';
import { PageContentsComponent } from './page-contents.component';
import { PageContentFormComponent } from './page-content-form.component';

export const PageContentsRoutes: Routes = [
  {
    path: '',
    component: PageContentsComponent,
  },
  {
    path: 'create',
    component: PageContentFormComponent,
  },
  {
    path: 'edit/:id',
    component: PageContentFormComponent,
  }
];
