import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedPageCard } from './related-page-card';

describe('RelatedPageCard', () => {
  let component: RelatedPageCard;
  let fixture: ComponentFixture<RelatedPageCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatedPageCard],
    }).compileComponents();

    fixture = TestBed.createComponent(RelatedPageCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
