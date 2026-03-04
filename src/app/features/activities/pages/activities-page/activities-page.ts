import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Activity } from '@core';
import { ActivityCard } from '@features/activities/components/activity-card/activity-card';

interface ActivityJson extends Omit<Activity, 'date'> {
  date: string;
}

@Component({
  selector: 'app-activities-page',
  imports: [ActivityCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './activities-page.html',
  styleUrl: './activities-page.scss',
})
export class ActivitiesPage {
  private readonly http = inject(HttpClient);

  readonly activitiesResource = rxResource({
    stream: () =>
      this.http
        .get<ActivityJson[]>('/data/activities.json')
        .pipe(
          map((data) => data.map((item): Activity => ({ ...item, date: new Date(item.date) }))),
        ),
  });
}
