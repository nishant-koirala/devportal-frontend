import { Component } from '@angular/core';
import { IntegrationSteps } from '../../../shared/components/integration-steps/integration-steps';
import { SectionHeader } from '../../../shared/components/section-header/section-header';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { SupportBlock } from '../../../shared/components/support-block/support-block';
import { SupportCard } from '../../../shared/components/support-card/support-card';

@Component({
  selector: 'app-getting-started',
  imports: [IntegrationSteps, SectionHeader, ProductCard, SupportBlock, SupportCard],
  templateUrl: './getting-started.html',
  styleUrl: './getting-started.css'
})
export class GettingStarted {}
