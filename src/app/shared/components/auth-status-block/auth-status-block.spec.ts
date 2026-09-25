import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthStatusBlock } from './auth-status-block';

describe('AuthStatusBlock', () => {
  let component: AuthStatusBlock;
  let fixture: ComponentFixture<AuthStatusBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthStatusBlock],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthStatusBlock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
