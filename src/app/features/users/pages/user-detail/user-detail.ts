import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '@core/services/user';

@Component({
  selector: 'app-user-detail',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);

  private readonly userId = toSignal(this.route.paramMap.pipe(map((params) => params.get('id'))));

  readonly profile = computed(() => {
    const id = this.userId();
    if (!id) return undefined;
    return this.userService.getProfileById(id);
  });

  private readonly initData = this.userService.loadProfiles().subscribe();

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

  toggleFavorite(): void {
    this.isFavorited.update((v) => !v);
  }
}
