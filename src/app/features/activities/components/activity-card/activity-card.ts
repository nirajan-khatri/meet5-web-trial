import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Activity } from '@core';

@Component({
  selector: 'app-activity-card',
  imports: [DatePipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './activity-card.html',
  styleUrl: './activity-card.scss',
})
export class ActivityCard {
  activity = input.required<Activity>();

  readonly maxAvatars = 5;

  readonly visibleParticipants = computed(() =>
    this.activity().participants.slice(0, this.maxAvatars),
  );

  readonly remainingSpots = computed(() => {
    const act = this.activity();
    return act.maxParticipants - act.joinedCount;
  });

  readonly fillPercent = computed(() => {
    const act = this.activity();
    return (act.joinedCount / act.maxParticipants) * 100;
  });
}
