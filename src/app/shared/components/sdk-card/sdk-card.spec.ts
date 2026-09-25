import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdkCard } from './sdk-card';

describe('SdkCard', () => {
  let component: SdkCard;
  let fixture: ComponentFixture<SdkCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SdkCard],
    }).compileComponents();

    fixture = TestBed.createComponent(SdkCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
