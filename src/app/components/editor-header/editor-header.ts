import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../core/services/../models/product.model';

@Component({
  selector: 'app-editor-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './editor-header.html',
  styleUrls: ['./editor-header.css']
})
export class EditorHeader {
  @Input() product: Product | null = null;
  productMenuOpen: boolean = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.productMenuOpen = false;
  }

  toggleProductMenu(event: Event) {
    event.stopPropagation();
    this.productMenuOpen = !this.productMenuOpen;
  }
}

