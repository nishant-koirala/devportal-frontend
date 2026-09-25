import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationSteps } from './integration-steps';

describe('IntegrationSteps', () => {
  let component: IntegrationSteps;
  let fixture: ComponentFixture<IntegrationSteps>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntegrationSteps],
    }).compileComponents();

    fixture = TestBed.createComponent(IntegrationSteps);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
