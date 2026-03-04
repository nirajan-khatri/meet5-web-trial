import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal, rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Activity } from '@core';
import { Avatar } from '@shared/ui/avatar/avatar';
import { ActivityDetailStore } from '@features/activities';

interface ActivityJson extends Omit<Activity, 'date'> {
  date: string;
}

@Component({
  selector: 'app-activity-detail',
  imports: [RouterLink, DatePipe, Avatar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './activity-detail.html',
  styleUrl: './activity-detail.scss',
  providers: [ActivityDetailStore],
})
export class ActivityDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);
  private readonly sanitizer = inject(DomSanitizer);

  readonly store = inject(ActivityDetailStore);

  private readonly activityId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id'))),
  );

  private readonly activitiesResource = rxResource({
    stream: () =>
      this.http
        .get<ActivityJson[]>('/data/activities.json')
        .pipe(
          map((data) => data.map((item): Activity => ({ ...item, date: new Date(item.date) }))),
        ),
  });

  readonly activity = computed(() => {
    const id = this.activityId();
    const all = this.activitiesResource.value();
    if (!id || !all) return undefined;
    return all.find((a) => a.id === id);
  });

  readonly mapExpanded = signal(false);

  toggleMap(): void {
    this.mapExpanded.update((v) => !v);
  }

  readonly mapUrl = computed(() => {
    const act = this.activity();
    if (!act) return null;
    const query = act.lat && act.lng ? `${act.lat},${act.lng}` : encodeURIComponent(act.location);
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://maps.google.com/maps?q=${query}&z=15&output=embed`,
    );
  });

  readonly similarActivities = computed(() => {
    const act = this.activity();
    const all = this.activitiesResource.value();
    if (!act || !all) return [];

    const others = all.filter((a) => a.id !== act.id);
    const sameCategory = others.filter((a) => a.category === act.category);

    if (sameCategory.length >= 3) return sameCategory.slice(0, 3);

    const remaining = others.filter((a) => a.category !== act.category);
    return [...sameCategory, ...remaining].slice(0, 3);
  });
}
