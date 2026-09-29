import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export interface InternalUser {
  id: string;
  name: string;
  email: string;
  roleProfile: string;
  status: 'Active' | 'Invited' | 'Deactivated';
}

@Component({
  selector: 'app-internal-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './internal-users.html',
  styleUrl: './internal-users.css'
})
export class InternalUsers implements OnInit {
  
  users: InternalUser[] = [
    { id: '1', name: 'Sujata Maharjan', email: 'sujata@fonepay.com', roleProfile: 'Super Admin', status: 'Active' },
    { id: '2', name: 'Bibek Rana', email: 'bibek@fonepay.com', roleProfile: 'CMS Admin', status: 'Active' },
    { id: '3', name: 'Priya Shrestha', email: 'priya@fonepay.com', roleProfile: 'Approver', status: 'Active' },
    { id: '4', name: 'Rajesh KC', email: 'rajesh@fonepay.com', roleProfile: 'Editor', status: 'Active' },
    { id: '5', name: 'Anjali Gurung', email: 'anjali@fonepay.com', roleProfile: 'Editor', status: 'Invited' },
    { id: '6', name: 'Suman Thapa', email: 'suman@fonepay.com', roleProfile: 'Approver', status: 'Deactivated' }
  ];

  searchTerm = '';
  selectedProfile = 'All profiles';
  activeMenuId: string | null = null;
  
  isInviteModalOpen = false;
  newInviteEmail = '';
  newInviteRole = 'Editor';

  isRevokeModalOpen = false;
  userToRevoke: InternalUser | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  get filteredUsers() {
    return this.users.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                            u.email.toLowerCase().includes(this.searchTerm.toLowerCase());
                            
      const matchesProfile = this.selectedProfile === 'All profiles' || u.roleProfile === this.selectedProfile;
      
      return matchesSearch && matchesProfile;
    });
  }

  toggleMenu(id: string, event: Event) {
    event.stopPropagation();
    if (this.activeMenuId === id) {
      this.activeMenuId = null;
    } else {
      this.activeMenuId = id;
    }
  }

  closeMenu() {
    this.activeMenuId = null;
  }

  openInviteModal() {
    this.isInviteModalOpen = true;
    this.newInviteEmail = '';
    this.newInviteRole = 'Editor';
  }

  closeInviteModal() {
    this.isInviteModalOpen = false;
  }

  sendInvitation() {
    if (this.newInviteEmail) {
      this.users.push({
        id: Math.random().toString(),
        name: 'New User',
        email: this.newInviteEmail,
        roleProfile: this.newInviteRole,
        status: 'Invited'
      });
      this.closeInviteModal();
    }
  }

  openRevokeModal(user: InternalUser) {
    this.userToRevoke = user;
    this.isRevokeModalOpen = true;
    this.activeMenuId = null;
  }

  closeRevokeModal() {
    this.isRevokeModalOpen = false;
    this.userToRevoke = null;
  }

  confirmRevoke() {
    if (this.userToRevoke) {
      this.users = this.users.filter(u => u.id !== this.userToRevoke!.id);
      this.closeRevokeModal();
    }
  }
}
