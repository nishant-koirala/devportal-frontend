import { Component, Input as NgInput } from '@angular/core';

@Component({
  selector: 'app-support-card',
  imports: [],
  templateUrl: './support-card.html',
  styleUrl: './support-card.css'
})
export class SupportCard {
  @NgInput() title!: string;
  @NgInput() description!: string;
  @NgInput() linkText!: string;
  @NgInput() linkUrl: string = '#';
}
