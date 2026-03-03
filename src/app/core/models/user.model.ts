export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface UserProfile extends User {
  age: number;
  bio?: string;
  location: string;
  relationshipStatus?: string;
  isCreator?: boolean;
  isVerified?: boolean;
  isOnline?: boolean;
  interests: string[];
  photos: string[];
}
