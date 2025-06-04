import { Routes } from '@angular/router';
import { PartnersComponent } from './partners.component';
import { PartnerFormComponent } from './partner-form.component';

export const PartnersRoutes: Routes = [
  {
    path: '',
    component: PartnersComponent
  },
  {
    path: 'create',
    component: PartnerFormComponent,
  },
  {
    path: 'edit/:id',
    component: PartnerFormComponent,
  }
];
