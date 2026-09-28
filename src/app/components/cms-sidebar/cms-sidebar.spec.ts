import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsSidebar } from './cms-sidebar';

describe('CmsSidebar', () => {
  let component: CmsSidebar;
  let fixture: ComponentFixture<CmsSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsSidebar],
    }).compileComponents();

    fixture = TestBed.createComponent(CmsSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
