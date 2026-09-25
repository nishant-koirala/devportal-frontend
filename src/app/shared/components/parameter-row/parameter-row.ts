import { Component, Input as NgInput } from '@angular/core';

@Component({
  selector: 'app-parameter-row',
  imports: [],
  templateUrl: './parameter-row.html',
  styleUrl: './parameter-row.css'
})
export class ParameterRow {
  @NgInput() name!: string;
  @NgInput() type!: string;
  @NgInput() required: boolean = false;
  @NgInput() description!: string;
}
