import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { User } from '@core';
import { Avatar } from '../avatar/avatar';

@Component({
  selector: 'app-participant-grid',
  imports: [Avatar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--columns]': 'columns()',
  },
  templateUrl: './participant-grid.html',
  styleUrl: './participant-grid.scss',
})
export class ParticipantGrid {
  participants = input.required<User[]>();
  maxParticipants = input.required<number>();
  columns = input<number>(4);

  displayParticipants = computed(() => this.participants().slice(0, this.maxParticipants()));

  emptySlots = computed(() => {
    const filled = this.displayParticipants().length;
    const total = this.maxParticipants();
    return Array.from({ length: Math.max(0, total - filled) }, (_, i) => `empty-${i}`);
  });
}
