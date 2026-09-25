import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterRow } from './parameter-row';

describe('ParameterRow', () => {
  let component: ParameterRow;
  let fixture: ComponentFixture<ParameterRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParameterRow],
    }).compileComponents();

    fixture = TestBed.createComponent(ParameterRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
