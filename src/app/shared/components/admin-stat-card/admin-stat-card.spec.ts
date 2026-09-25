import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatCard } from './admin-stat-card';

describe('AdminStatCard', () => {
  let component: AdminStatCard;
  let fixture: ComponentFixture<AdminStatCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminStatCard],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminStatCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
