import { Routes } from '@angular/router';
import { TestmonialsComponent } from './testmonials.component';
import { TestmonialFormComponent } from './testmonial-form.component';

export const TestmonialsRoutes: Routes = [
  {
    path: '',
    component: TestmonialsComponent,
  },
  {
    path: 'create',
    component: TestmonialFormComponent,
  },
  {
    path: 'edit/:id',
    component: TestmonialFormComponent,
  }
];
