import { Component, Input as NgInput } from '@angular/core';

@Component({
  selector: 'app-bookmark-card',
  imports: [],
  templateUrl: './bookmark-card.html',
  styleUrl: './bookmark-card.css'
})
export class BookmarkCard {
  @NgInput() title!: string;
  @NgInput() description!: string;
  @NgInput() state: 'Default' | 'Removed' = 'Default';
}
