import { Component, Input as NgInput } from '@angular/core';

@Component({
  selector: 'app-admin-activity-row',
  imports: [],
  templateUrl: './admin-activity-row.html',
  styleUrl: './admin-activity-row.css'
})
export class AdminActivityRow {
  @NgInput() text!: string;
  @NgInput() time!: string;
}
