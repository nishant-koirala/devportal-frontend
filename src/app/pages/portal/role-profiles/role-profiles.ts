import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface RoleProfile {
  id: string;
  name: string;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;
  isBuiltIn?: boolean;
}

@Component({
  selector: 'app-role-profiles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-profiles.html',
  styleUrl: './role-profiles.css'
})
export class RoleProfiles implements OnInit {
  
  roles: RoleProfile[] = [
    { id: '1', name: 'Super Admin', createdDate: '4 Sep 2026', createdBy: 'System', modifiedDate: '—', modifiedBy: '—', isBuiltIn: true },
    { id: '2', name: 'Developer', createdDate: '4 Sep 2026', createdBy: 'System', modifiedDate: '—', modifiedBy: '—', isBuiltIn: true },
    { id: '3', name: 'CMS Admin', createdDate: '4 Sep 2026', createdBy: 'Sujata Maharjan', modifiedDate: '20 Sep 2026', modifiedBy: 'Sujata Maharjan', isBuiltIn: false },
    { id: '4', name: 'Approver', createdDate: '4 Sep 2026', createdBy: 'Sujata Maharjan', modifiedDate: '—', modifiedBy: '—', isBuiltIn: false },
    { id: '5', name: 'Editor', createdDate: '4 Sep 2026', createdBy: 'Sujata Maharjan', modifiedDate: '—', modifiedBy: '—', isBuiltIn: false }
  ];

  activeDropdownId: string | null = null;
  
  // Delete modal state
  isDeleteModalOpen = false;
  roleToDelete: RoleProfile | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Data is static for now to match Figma
  }

  toggleDropdown(id: string, event: Event) {
    event.stopPropagation();
    this.activeDropdownId = this.activeDropdownId === id ? null : id;
  }

  openDeleteModal(role: RoleProfile, event: Event) {
    event.stopPropagation();
    this.roleToDelete = role;
    this.isDeleteModalOpen = true;
    this.activeDropdownId = null;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.roleToDelete = null;
  }

  confirmDelete() {
    if (this.roleToDelete) {
      // Filter out the deleted role for demo purposes
      this.roles = this.roles.filter(r => r.id !== this.roleToDelete!.id);
    }
    this.closeDeleteModal();
  }

  editRole(id: string, event: Event) {
    event.stopPropagation();
    this.router.navigate(['/portal/role-profiles/edit', id]);
  }

  viewRole(id: string, event: Event) {
    event.stopPropagation();
    this.router.navigate(['/portal/role-profiles/view', id]);
  }

  createRole() {
    this.router.navigate(['/portal/role-profiles/new']);
  }

  @HostListener('document:click')
  closeDropdown() {
    this.activeDropdownId = null;
  }
}
