import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ClientsComponent } from './components/clients/clients.component';
import { Routes } from '@angular/router';
import { ProjectsComponent } from './components/projects/projects.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: RegisterComponent,
  },

  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'clients',
        component: ClientsComponent,
      },
      {
        path: 'projects',
        component: ProjectsComponent,
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
