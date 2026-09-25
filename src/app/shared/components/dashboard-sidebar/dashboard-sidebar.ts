import { Component, Input as NgInput } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [CommonModule],
  templateUrl: './dashboard-sidebar.html',
  styleUrl: './dashboard-sidebar.css'
})
export class DashboardSidebar {
  @NgInput() activeItem: string = 'Dashboard';
  
  items = [
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Browse products', url: '/products' },
    { label: 'Bookmarks', url: '/bookmarks' },
    { label: 'Profile', url: '/profile' }
  ];
}
