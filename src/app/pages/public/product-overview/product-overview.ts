import { Component } from '@angular/core';
import { PageHero } from '../../../shared/components/page-hero/page-hero';
import { SectionHeader } from '../../../shared/components/section-header/section-header';
import { AccountCtaBanner } from '../../../shared/components/account-cta-banner/account-cta-banner';

@Component({
  selector: 'app-product-overview',
  imports: [PageHero, SectionHeader, AccountCtaBanner],
  templateUrl: './product-overview.html',
  styleUrl: './product-overview.css'
})
export class ProductOverview {}
