import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-avatar',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.badge]': 'showBadge()',
    '[style.width.px]': 'size()',
    '[style.height.px]': 'size()',
  },
  templateUrl: './avatar.html',
  styleUrl: './avatar.scss',
})
export class Avatar {
  url = input<string | undefined>();
  size = input<number>(56);
  showBadge = input<boolean>(false);
}
