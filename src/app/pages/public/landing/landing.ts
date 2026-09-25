import { Component } from '@angular/core';
import { PageHero } from '../../../shared/components/page-hero/page-hero';
import { SectionHeader } from '../../../shared/components/section-header/section-header';
import { ProductTile } from '../../../shared/components/product-tile/product-tile';
import { SupportBlock } from '../../../shared/components/support-block/support-block';
import { SupportCard } from '../../../shared/components/support-card/support-card';
import { IntegrationSteps } from '../../../shared/components/integration-steps/integration-steps';

@Component({
  selector: 'app-landing',
  imports: [PageHero, SectionHeader, ProductTile, SupportBlock, SupportCard, IntegrationSteps],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {}
