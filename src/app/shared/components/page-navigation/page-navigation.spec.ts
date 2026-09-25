import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNavigation } from './page-navigation';

describe('PageNavigation', () => {
  let component: PageNavigation;
  let fixture: ComponentFixture<PageNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNavigation],
    }).compileComponents();

    fixture = TestBed.createComponent(PageNavigation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
