import { Routes } from '@angular/router';

export const ACTIVITIES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/activities-page/activities-page').then((m) => m.ActivitiesPage),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/activity-detail/activity-detail').then((m) => m.ActivityDetail),
  },
];
