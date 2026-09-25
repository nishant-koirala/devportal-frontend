import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementListItem } from './announcement-list-item';

describe('AnnouncementListItem', () => {
  let component: AnnouncementListItem;
  let fixture: ComponentFixture<AnnouncementListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementListItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
