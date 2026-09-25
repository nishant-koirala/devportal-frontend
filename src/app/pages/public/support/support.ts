import { Component } from '@angular/core';
import { PageHero } from '../../../shared/components/page-hero/page-hero';
import { SectionHeader } from '../../../shared/components/section-header/section-header';

@Component({
  selector: 'app-support',
  imports: [PageHero, SectionHeader],
  templateUrl: './support.html',
  styleUrl: './support.css'
})
export class Support {}
