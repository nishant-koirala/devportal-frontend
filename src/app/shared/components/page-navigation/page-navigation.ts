import { Component, Input as NgInput } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-navigation',
  imports: [CommonModule],
  templateUrl: './page-navigation.html',
  styleUrl: './page-navigation.css'
})
export class PageNavigation {
  @NgInput() prevTitle?: string;
  @NgInput() prevUrl?: string;
  @NgInput() nextTitle?: string;
  @NgInput() nextUrl?: string;
}
