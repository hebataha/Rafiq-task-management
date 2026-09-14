import { Routes } from '@angular/router';
import { AuthHeader } from './shared/auth-header/auth-header';
import { Login } from './features/auth/pages/login/login';
import { SignUp } from './features/auth/pages/sign-up/sign-up';
import { LoggedInHeader } from './shared/logged-in-header/logged-in-header';
import { Projects } from './features/projects/projects';

export const routes: Routes = [
    {
        path: '',
        component: AuthHeader,
        children: [
            { path: 'login', component: Login },
            { path: 'sign-up', component: SignUp }
        ]
    },
    {
        path: '',
        component: LoggedInHeader,
        children: [
            { path: 'projects', component: Projects }
        ]
    },
    {path:"**",  redirectTo: 'login'}

];
