import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivityService } from '@core/services/activity';
import { ActivityCard } from '../../components/activity-card/activity-card';

@Component({
  selector: 'app-activities-page',
  imports: [ActivityCard],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './activities-page.html',
  styleUrl: './activities-page.scss',
})
export class ActivitiesPage {
  private readonly activityService = inject(ActivityService);

  readonly activities = this.activityService.activities;

  private readonly initData = this.activityService.loadActivities().subscribe();
}
