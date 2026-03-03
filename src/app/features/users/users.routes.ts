import { Routes } from '@angular/router';

export const USERS_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () => import('./pages/user-detail/user-detail').then((m) => m.UserDetail),
  },
];
