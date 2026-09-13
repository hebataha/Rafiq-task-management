import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: "login",
        loadComponent: () => import('./features/auth/pages/login/login').then(m => m.Login)
    },
    {
        path: "sign-up",
        loadComponent: () => import('./features/auth/pages/sign-up/sign-up').then(m => m.SignUp)
    },
    
    {
        path: "projects",
        loadComponent: () => import('./features/projects/projects').then(m => m.Projects)
    },
];
