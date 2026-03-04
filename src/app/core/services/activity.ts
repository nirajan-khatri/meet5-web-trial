import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap, map, shareReplay } from 'rxjs';
import { Activity } from '@core';

interface ActivityJson extends Omit<Activity, 'date'> {
  date: string;
}

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private readonly http = inject(HttpClient);
  private readonly _activities = signal<Activity[]>([]);

  readonly activities = this._activities.asReadonly();

  private readonly activities$ = this.http.get<ActivityJson[]>('/data/activities.json').pipe(
    map((data) =>
      data.map((item) => ({
        ...item,
        date: new Date(item.date),
      })),
    ),
    tap((activities) => this._activities.set(activities)),
    shareReplay(1),
  );

  loadActivities(): Observable<Activity[]> {
    return this.activities$;
  }

  activityById(id: string) {
    return computed(() => this._activities().find((a) => a.id === id));
  }
}
