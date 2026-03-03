import { Routes } from '@angular/router';

export const ACTIVITIES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/activities-page/activities-page').then((m) => m.ActivitiesPageComponent),
  },
];
