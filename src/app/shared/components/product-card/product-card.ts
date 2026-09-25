import { Component, Input as NgInput } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../button/button';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, Button],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  @NgInput() badgeText?: string;
  @NgInput() title!: string;
  @NgInput() description!: string;
  @NgInput() buttonText: string = 'Learn more';
}
