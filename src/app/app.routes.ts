import { Routes } from '@angular/router';

import { HomeComponent } from './routes/home/home.component';


export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./routes/home/home.component').then((m) => m.HomeComponent),
    title: 'LogExp - Home',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./routes/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    title: 'LogExp - Dashboard',
  },
  {
    path: 'entregas',
    loadComponent: () => import('./routes/deliveries/deliveries.component').then((m) => m.DeliveriesComponent),
    title: 'LogExp - Entregas',
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  }
];
