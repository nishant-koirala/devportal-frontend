import { Component, Input as NgInput } from '@angular/core';

@Component({
  selector: 'app-bookmark-row',
  imports: [],
  templateUrl: './bookmark-row.html',
  styleUrl: './bookmark-row.css'
})
export class BookmarkRow {
  @NgInput() title!: string;
  @NgInput() typeText!: string;
  @NgInput() state: 'Default' | 'Removed' = 'Default';
}
