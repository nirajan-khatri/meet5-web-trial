import { Routes } from '@angular/router';
import { MainLayout } from '@shared/layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'activities', pathMatch: 'full' },
      {
        path: 'activities',
        loadChildren: () =>
          import('@features/activities/activities.routes').then((m) => m.ACTIVITIES_ROUTES),
      },
      {
        path: 'users',
        loadChildren: () => import('@features/users/users.routes').then((m) => m.USERS_ROUTES),
      },
      {
        path: 'for-me',
        loadComponent: () =>
          import('@shared/layout/placeholder-page/placeholder-page').then((m) => m.PlaceholderPage),
        data: { pageName: 'For me' },
      },
      {
        path: 'discover',
        loadComponent: () =>
          import('@shared/layout/placeholder-page/placeholder-page').then((m) => m.PlaceholderPage),
        data: { pageName: 'Discover' },
      },
      {
        path: 'chats',
        loadComponent: () =>
          import('@shared/layout/placeholder-page/placeholder-page').then((m) => m.PlaceholderPage),
        data: { pageName: 'Chats' },
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('@shared/layout/placeholder-page/placeholder-page').then((m) => m.PlaceholderPage),
        data: { pageName: 'Profile' },
      },
    ],
  },
  { path: '**', redirectTo: 'activities' },
];
