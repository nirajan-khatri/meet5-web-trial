import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivityService } from '@core/services/activity';
import { Avatar } from '@shared/ui/avatar/avatar';
import { ActivityDetailStore } from '@features/activities/services/activity-detail.store';

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
  private readonly sanitizer = inject(DomSanitizer);
  private readonly activityService = inject(ActivityService);

  readonly store = inject(ActivityDetailStore);

  private readonly activityId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id'))),
  );

  readonly activity = computed(() => {
    const id = this.activityId();
    if (!id) return undefined;
    return this.activityService.activityById(id)();
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
    if (!act) return [];

    const others = this.activityService.activities().filter((a) => a.id !== act.id);
    const sameCategory = others.filter((a) => a.category === act.category);

    if (sameCategory.length >= 3) return sameCategory.slice(0, 3);

    const remaining = others.filter((a) => a.category !== act.category);
    return [...sameCategory, ...remaining].slice(0, 3);
  });
}
