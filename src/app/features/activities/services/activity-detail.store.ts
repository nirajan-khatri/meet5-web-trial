import { Injectable, signal } from '@angular/core';

export type DetailTab = 'invited' | 'visitors' | 'favorited';

@Injectable()
export class ActivityDetailStore {
  readonly hasJoined = signal(false);
  readonly hasSaved = signal(false);
  readonly activeTab = signal<DetailTab>('invited');

  toggleJoin(): void {
    this.hasJoined.update((v) => !v);
  }

  toggleSave(): void {
    this.hasSaved.update((v) => !v);
  }

  setTab(tab: DetailTab): void {
    this.activeTab.set(tab);
  }
}
