import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkCard } from './bookmark-card';

describe('BookmarkCard', () => {
  let component: BookmarkCard;
  let fixture: ComponentFixture<BookmarkCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkCard],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
