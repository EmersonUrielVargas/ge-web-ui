
import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';

export const userHomeRoutes: Routes = [
    {
        path: '',
        component: DashboardComponent,
    },
    {
        path: 'event-details',
        component: EventDetailsComponent
    }
];
