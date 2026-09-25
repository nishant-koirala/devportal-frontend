import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterHeader } from './parameter-header';

describe('ParameterHeader', () => {
  let component: ParameterHeader;
  let fixture: ComponentFixture<ParameterHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParameterHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(ParameterHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
