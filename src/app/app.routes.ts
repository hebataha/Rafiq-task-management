import { Routes } from '@angular/router';

import { AuthLayout } from './shared/layouts/auth-layout/auth-layout';
import { AppLayout } from './shared/layouts/app-layout/app-layout';

import { Login } from './features/auth/pages/login/login';
import { SignUp } from './features/auth/pages/sign-up/sign-up';
import { Projects } from './features/projects/projects';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login },
      { path: 'sign-up', component: SignUp }
    ]
  },

  {
    path: '',
    component: AppLayout,
    children: [
      { path: 'projects', component: Projects }
    ]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'login'
  }
];