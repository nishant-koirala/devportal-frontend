import { Component } from '@angular/core';
import { PageHero } from '../../../shared/components/page-hero/page-hero';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { SectionHeader } from '../../../shared/components/section-header/section-header';

@Component({
  selector: 'app-products',
  imports: [PageHero, ProductCard, SectionHeader],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {}
