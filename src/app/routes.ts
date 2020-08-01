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
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'clients',
        component: ClientsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
