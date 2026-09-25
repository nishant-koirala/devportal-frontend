import { Component, Input as NgInput } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sdk-card',
  imports: [CommonModule],
  templateUrl: './sdk-card.html',
  styleUrl: './sdk-card.css'
})
export class SdkCard {
  @NgInput() badgeText!: string;
  @NgInput() title!: string;
  @NgInput() description!: string;
  @NgInput() statusText?: string;
}
