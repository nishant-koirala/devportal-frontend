import { Component, Input as NgInput } from '@angular/core';

@Component({
  selector: 'app-facts-row',
  imports: [],
  templateUrl: './facts-row.html',
  styleUrl: './facts-row.css'
})
export class FactsRow {
  @NgInput() key!: string;
  @NgInput() value!: string;
}
