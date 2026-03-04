import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-placeholder-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './placeholder-page.html',
  styleUrl: './placeholder-page.scss',
})
export class PlaceholderPage {
  private readonly route = inject(ActivatedRoute);

  readonly pageName = toSignal(
    this.route.data.pipe(map((d) => (d['pageName'] as string) ?? 'Coming Soon')),
    { initialValue: 'Coming Soon' },
  );
}
