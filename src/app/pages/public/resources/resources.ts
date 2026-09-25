import { Component } from '@angular/core';
import { PageHero } from '../../../shared/components/page-hero/page-hero';
import { SectionHeader } from '../../../shared/components/section-header/section-header';

@Component({
  selector: 'app-resources',
  imports: [PageHero, SectionHeader],
  templateUrl: './resources.html',
  styleUrl: './resources.css'
})
export class Resources {}
