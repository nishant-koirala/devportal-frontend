import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-portal-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './portal-layout.html',
  styleUrl: './portal-layout.css'
})
export class PortalLayoutComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  public userName = '';
  public isSidebarCollapsed = false;

  ngOnInit() {
    this.userName = this.authService.getUserName();
    
    // Simple way to handle active states dynamically
    this.router.events.subscribe(() => {
      this.updateActiveStates();
    });
    // Set initial
    this.updateActiveStates();
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  updateActiveStates() {
    const currentUrl = this.router.url;
    this.navSections.forEach(section => {
      section.items.forEach(item => {
        // Just checking if the URL starts with the item route for prefix matching
        item.active = currentUrl.startsWith(item.route);
      });
    });
  }

  navSections = [
    {
      title: 'Overview',
      items: [
        { label: 'Dashboard', route: '/portal/dashboard', active: true }
      ]
    },
    {
      title: 'Content',
      items: [
        { label: 'Products', route: '/portal/products', active: false },
        { label: 'Pages', route: '/portal/pages', active: false },
        { label: 'Assets', route: '/portal/assets', active: false },
        { label: 'Review queue', route: '/portal/reviews', active: false }
      ]
    },
    {
      title: 'Access and developers',
      items: [
        { label: 'Access requests', route: '/portal/access', active: false },
        { label: 'Developers', route: '/portal/developers', active: false },
        { label: 'Announcements', route: '/portal/announcements', active: false }
      ]
    },
    {
      title: 'System',
      items: [
        { label: 'Internal users', route: '/portal/internal-users', active: false },
        { label: 'Role profiles', route: '/portal/role-profiles', active: false },
        { label: 'Audit log', route: '/portal/audit-log', active: false },
        { label: 'Config', route: '/portal/config', active: false }
      ]
    }
  ];

  logout() {
    this.authService.logout();
    this.router.navigate(['/portal/login']);
  }
}
