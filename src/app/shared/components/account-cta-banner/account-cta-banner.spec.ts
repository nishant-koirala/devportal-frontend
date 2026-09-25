import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCtaBanner } from './account-cta-banner';

describe('AccountCtaBanner', () => {
  let component: AccountCtaBanner;
  let fixture: ComponentFixture<AccountCtaBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountCtaBanner],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountCtaBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
