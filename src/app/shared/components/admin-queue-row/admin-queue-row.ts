import { Component, Input as NgInput } from '@angular/core';

@Component({
  selector: 'app-admin-queue-row',
  imports: [],
  templateUrl: './admin-queue-row.html',
  styleUrl: './admin-queue-row.css'
})
export class AdminQueueRow {
  @NgInput() title!: string;
  @NgInput() meta!: string;
  @NgInput() actionLabel: string = 'Review';
}
