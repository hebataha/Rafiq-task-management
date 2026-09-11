import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: "login",
        loadComponent: ()=>import('./features/auth/pages/login/login').then(m=>m.Login)
    },
        {
        path: "sign-up",
        loadComponent: ()=>import('./features/auth/pages/sign-up/sign-up').then(m=>m.SignUp)
    },
];
