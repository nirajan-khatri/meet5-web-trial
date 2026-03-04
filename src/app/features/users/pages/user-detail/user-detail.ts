import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { toSignal, rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from '@core';

@Component({
  selector: 'app-user-detail',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);
  private readonly location = inject(Location);

  private readonly userId = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))));

  private readonly profilesResource = rxResource({
    stream: () => this.http.get<UserProfile[]>('/data/users.json'),
  });

  readonly profile = computed(() => {
    const id = this.userId();
    const profiles = this.profilesResource.value();
    if (!id || !profiles) return undefined;
    return profiles.find((p) => p.id === id);
  });

  readonly activePhoto = signal(0);

  readonly isFavorited = signal(false);

  selectPhoto(index: number): void {
    this.activePhoto.set(index);
  }

  prevPhoto(): void {
    const photos = this.profile()?.photos ?? [];
    if (photos.length <= 1) return;
    this.activePhoto.update((i) => (i - 1 + photos.length) % photos.length);
  }

  nextPhoto(): void {
    const photos = this.profile()?.photos ?? [];
    if (photos.length <= 1) return;
    this.activePhoto.update((i) => (i + 1) % photos.length);
  }

  goBack(): void {
    this.location.back();
  }

  toggleFavorite(): void {
    this.isFavorited.update((v) => !v);
  }
}
