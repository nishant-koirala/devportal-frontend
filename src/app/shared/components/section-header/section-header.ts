import { Component, Input as NgInput } from '@angular/core';
import { Button } from '../button/button';

@Component({
  selector: 'app-section-header',
  imports: [Button],
  templateUrl: './section-header.html',
  styleUrl: './section-header.css'
})
export class SectionHeader {
  @NgInput() title!: string;
  @NgInput() description?: string;
  @NgInput() actionLabel?: string;
}
