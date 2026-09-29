import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

interface PermissionItem {
  id: string;
  label: string;
  description: string;
  checked: boolean;
}

interface PermissionGroup {
  name: string;
  items: PermissionItem[];
}

@Component({
  selector: 'app-role-profile-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './role-profile-editor.html',
  styleUrl: './role-profile-editor.css'
})
export class RoleProfileEditor implements OnInit {
  isEditMode = false;
  isViewMode = false;
  profileName = 'CMS Admin';
  profileDescription = 'Full control over content, assets, internal users and the audit log.';

  permissionGroups: PermissionGroup[] = [
    {
      name: 'Content',
      items: [
        { id: 'content.edit', label: 'content.edit', description: 'Create and edit drafts, submit for review, restore revisions', checked: true },
        { id: 'content.publish', label: 'content.publish', description: 'Approve or reject review requests, unpublish and republish', checked: true },
        { id: 'content.structure', label: 'content.structure', description: 'Create, reorder, move, publish and delete products, sections and pages', checked: true },
        { id: 'asset.manage', label: 'asset.manage', description: 'Create, edit and delete assets and their access methods', checked: true }
      ]
    },
    {
      name: 'Access and developers',
      items: [
        { id: 'access-request.decide', label: 'access-request.decide', description: 'Grant or decline access requests', checked: true },
        { id: 'developer.view', label: 'developer.view', description: 'Developer list, detail and activity, CSV export, resend verification', checked: true },
        { id: 'developer.status', label: 'developer.status', description: 'Activate and deactivate developers', checked: true },
        { id: 'announcement.send', label: 'announcement.send', description: 'Compose and send announcements, see delivery status', checked: true }
      ]
    },
    {
      name: 'System',
      items: [
        { id: 'user.manage', label: 'user.manage', description: 'Create, edit and deactivate internal users, assign a role profile, reset 2FA', checked: true },
        { id: 'role-profile.manage', label: 'role-profile.manage', description: 'Create, edit and delete role profiles. Held only by the Super Admin profile in Phase 1', checked: false },
        { id: 'audit.read', label: 'audit.read', description: 'Read and search the audit log', checked: true },
        { id: 'audit.export', label: 'audit.export', description: 'Export the audit log', checked: true },
        { id: 'config.manage', label: 'config.manage', description: 'View and change the configuration values Section 8 marks editable, and reset them to their defaults', checked: false }
      ]
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const path = this.route.snapshot.url.map(segment => segment.path).join('/');
    
    if (path.includes('view')) {
      this.isViewMode = true;
      this.isEditMode = false;
      this.profileName = 'Super Admin';
      this.profileDescription = 'Full control over the system.';
    } else if (id) {
      this.isEditMode = true;
      this.isViewMode = false;
    } else {
      this.isEditMode = false;
      this.isViewMode = false;
      this.profileName = '';
      this.profileDescription = '';
      this.permissionGroups.forEach(g => g.items.forEach(i => i.checked = false));
    }
  }

  save() {
    // normally save logic here
    this.router.navigate(['/portal/role-profiles']);
  }
}
