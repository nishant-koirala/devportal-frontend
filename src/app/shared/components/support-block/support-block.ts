import { Component, Input as NgInput } from '@angular/core';

@Component({
  selector: 'app-support-block',
  imports: [],
  templateUrl: './support-block.html',
  styleUrl: './support-block.css'
})
export class SupportBlock {
  @NgInput() title: string = 'Need help?';
}
