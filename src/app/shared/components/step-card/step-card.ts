import { Component, Input as NgInput } from '@angular/core';

@Component({
  selector: 'app-step-card',
  imports: [],
  templateUrl: './step-card.html',
  styleUrl: './step-card.css'
})
export class StepCard {
  @NgInput() stepNumber!: string | number;
  @NgInput() title!: string;
  @NgInput() description!: string;
}
