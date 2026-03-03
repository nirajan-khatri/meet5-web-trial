import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantGrid } from './participant-grid';

describe('ParticipantGrid', () => {
  let component: ParticipantGrid;
  let fixture: ComponentFixture<ParticipantGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(ParticipantGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
