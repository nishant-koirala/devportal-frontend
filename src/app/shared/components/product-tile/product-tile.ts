import { Component, Input as NgInput } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-tile',
  imports: [CommonModule],
  templateUrl: './product-tile.html',
  styleUrl: './product-tile.css'
})
export class ProductTile {
  @NgInput() title!: string;
  @NgInput() description!: string;
  @NgInput() linkText: string = 'Documentation';
  @NgInput() linkUrl: string = '#';
}
