import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactsRow } from './facts-row';

describe('FactsRow', () => {
  let component: FactsRow;
  let fixture: ComponentFixture<FactsRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactsRow],
    }).compileComponents();

    fixture = TestBed.createComponent(FactsRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
