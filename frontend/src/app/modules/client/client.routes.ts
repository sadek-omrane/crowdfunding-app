import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectComponent } from './projects/project.component';
import { PageContentComponent } from './page-content/page-content.component';


export const ClientRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'projects',
    component: ProjectsComponent,
  },
  {
    path: 'projects/:id',
    component: ProjectComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'page-content',
    component: PageContentComponent
  }
];
