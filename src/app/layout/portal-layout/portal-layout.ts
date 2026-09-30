import { Component, OnInit, inject, DestroyRef, signal, computed } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  private destroyRef = inject(DestroyRef);

  userName = signal('');
  isSidebarCollapsed = signal(false);
  currentUrl = signal('');

  navSections = computed(() => {
    const url = this.currentUrl();
    const sections = [
      {
        title: 'Overview',
        items: [
          { label: 'Dashboard', route: '/portal/dashboard' }
        ]
      },
      {
        title: 'Content',
        items: [
          { label: 'Products', route: '/portal/products' },
          { label: 'Pages', route: '/portal/pages' },
          { label: 'Assets', route: '/portal/assets' },
          { label: 'Review queue', route: '/portal/reviews' }
        ]
      },
      {
        title: 'Access and developers',
        items: [
          { label: 'Access requests', route: '/portal/access' },
          { label: 'Developers', route: '/portal/developers' },
          { label: 'Announcements', route: '/portal/announcements' }
        ]
      },
      {
        title: 'System',
        items: [
          { label: 'Internal users', route: '/portal/internal-users' },
          { label: 'Role profiles', route: '/portal/role-profiles' },
          { label: 'Audit log', route: '/portal/audit-log' },
          { label: 'Config', route: '/portal/config' }
        ]
      }
    ];

    return sections.map(section => ({
      ...section,
      items: section.items.map(item => ({
        ...item,
        active: url.startsWith(item.route)
      }))
    }));
  });

  ngOnInit() {
    this.userName.set(this.authService.getUserName());
    this.currentUrl.set(this.router.url);
    
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.currentUrl.set(this.router.url);
    });
  }

  toggleSidebar() {
    this.isSidebarCollapsed.update(c => !c);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/portal/login']);
  }
}
