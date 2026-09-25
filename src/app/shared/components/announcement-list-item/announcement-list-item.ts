import { Component, Input as NgInput } from '@angular/core';

@Component({
  selector: 'app-announcement-list-item',
  imports: [],
  templateUrl: './announcement-list-item.html',
  styleUrl: './announcement-list-item.css'
})
export class AnnouncementListItem {
  @NgInput() title!: string;
}
