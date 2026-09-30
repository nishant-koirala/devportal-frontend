import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-block-renderer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block-renderer.html'
})
export class BlockRenderer {
  @Input() block: any;
}
