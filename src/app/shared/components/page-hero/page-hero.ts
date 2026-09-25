import { Component, Input as NgInput } from '@angular/core';

@Component({
  selector: 'app-page-hero',
  imports: [],
  templateUrl: './page-hero.html',
  styleUrl: './page-hero.css'
})
export class PageHero {
  @NgInput() breadcrumb?: string;
  @NgInput() title!: string;
  @NgInput() description?: string;
  @NgInput() primaryActionLabel?: string;
  @NgInput() secondaryActionLabel?: string;
}
