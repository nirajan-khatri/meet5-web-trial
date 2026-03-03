import { User } from './user.model';

export interface Activity {
  id: string;
  title: string;
  location: string;
  /** Geographic coordinates for map display. */
  lat?: number;
  lng?: number;
  date: Date;
  maxParticipants: number;
  joinedCount: number;
  category: string;
  visibility: string;
  genderRestriction: string;
  participants: User[];
}
