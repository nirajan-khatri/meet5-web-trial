import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, map, tap, shareReplay } from 'rxjs';
import { UserProfile } from '@core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly _profiles = signal<UserProfile[]>([]);

  readonly profiles = this._profiles.asReadonly();

  private readonly profiles$ = this.http.get<UserProfile[]>('/data/users.json').pipe(
    tap((data) => this._profiles.set(data)),
    shareReplay(1),
  );

  loadProfiles(): Observable<UserProfile[]> {
    return this.profiles$;
  }

  getProfileById(id: string): UserProfile | undefined {
    return this._profiles().find((p) => p.id === id);
  }

  getProfileById$(id: string): Observable<UserProfile | undefined> {
    return this.profiles$.pipe(map((profiles) => profiles.find((p) => p.id === id)));
  }
}
