import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportBlock } from './support-block';

describe('SupportBlock', () => {
  let component: SupportBlock;
  let fixture: ComponentFixture<SupportBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportBlock],
    }).compileComponents();

    fixture = TestBed.createComponent(SupportBlock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
