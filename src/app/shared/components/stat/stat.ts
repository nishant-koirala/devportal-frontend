import { Component, Input as NgInput } from '@angular/core';

@Component({
  selector: 'app-stat',
  imports: [],
  templateUrl: './stat.html',
  styleUrl: './stat.css'
})
export class Stat {
  @NgInput() value!: string;
  @NgInput() label!: string;
}
