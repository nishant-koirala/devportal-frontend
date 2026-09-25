import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteBar } from './route-bar';

describe('RouteBar', () => {
  let component: RouteBar;
  let fixture: ComponentFixture<RouteBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteBar],
    }).compileComponents();

    fixture = TestBed.createComponent(RouteBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
