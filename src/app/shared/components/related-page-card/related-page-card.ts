import { Component, Input as NgInput } from '@angular/core';

@Component({
  selector: 'app-related-page-card',
  imports: [],
  templateUrl: './related-page-card.html',
  styleUrl: './related-page-card.css'
})
export class RelatedPageCard {
  @NgInput() title!: string;
  @NgInput() path!: string;
  @NgInput() url: string = '#';
}
