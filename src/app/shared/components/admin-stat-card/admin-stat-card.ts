import { Component, Input as NgInput } from '@angular/core';

@Component({
  selector: 'app-admin-stat-card',
  imports: [],
  templateUrl: './admin-stat-card.html',
  styleUrl: './admin-stat-card.css'
})
export class AdminStatCard {
  @NgInput() value!: string | number;
  @NgInput() label!: string;
}
