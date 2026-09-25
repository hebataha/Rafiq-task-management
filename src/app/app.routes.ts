import { Routes } from '@angular/router';

import { AuthLayout } from './shared/layouts/auth-layout/auth-layout';
import { AppLayout } from './shared/layouts/app-layout/app-layout';

import { Login } from './features/auth/pages/login/login';
import { SignUp } from './features/auth/pages/sign-up/sign-up';
import { Projects } from './features/projects/projects';
import { authGuard } from './core/guards/auth-guard';
import { AddProjects } from './features/projects/add-projects/add-projects';
import { guestGuard } from './core/guards/guest-guard';
import { ProjectDetails } from './features/projects/project-details/project-details';
import { ProjectEdit } from './features/projects/project-edit/project-edit';
import { ForgotPassword } from './features/auth/pages/forgot-password/forgot-password';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login', component: Login, canActivate: [guestGuard]
      },
      { path: 'sign-up', component: SignUp, canActivate: [guestGuard] },
      { path: 'forget-password', component: ForgotPassword, canActivate: [guestGuard] }

    ]
  },

  {
    path: '',
    component: AppLayout,
    children: [
      {
        path: 'projects', component: Projects, canActivate: [authGuard]
      },

      { path: 'projects/add-project', component: AddProjects, canActivate: [authGuard] },
      { path: 'project/:id/epics', component: ProjectDetails, canActivate: [authGuard] },
      { path: 'project/:id/tasks', component: ProjectDetails, canActivate: [authGuard] },
      { path: 'project/:id/members', component: ProjectDetails, canActivate: [authGuard] },
      { path: 'project/:id/details', component: ProjectDetails, canActivate: [authGuard] },
      { path: 'project/:id/edit', component: ProjectEdit, canActivate: [authGuard] },


    ]
  },



];