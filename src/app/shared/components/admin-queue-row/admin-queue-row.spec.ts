import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQueueRow } from './admin-queue-row';

describe('AdminQueueRow', () => {
  let component: AdminQueueRow;
  let fixture: ComponentFixture<AdminQueueRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminQueueRow],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminQueueRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
