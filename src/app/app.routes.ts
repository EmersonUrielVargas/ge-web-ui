import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { UserHomeComponent } from './modules/userHome/userHome.component';
import { userHomeRoutes } from './modules/userHome/userHome.routes';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'userHome',
        canMatch: [ authGuard ],
        canActivate: [],
        component: UserHomeComponent,
        children: userHomeRoutes
    },
    {
        path: '*',
        redirectTo: 'login'
    }
];
