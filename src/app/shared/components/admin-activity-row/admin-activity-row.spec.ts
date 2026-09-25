import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminActivityRow } from './admin-activity-row';

describe('AdminActivityRow', () => {
  let component: AdminActivityRow;
  let fixture: ComponentFixture<AdminActivityRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminActivityRow],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminActivityRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
