import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface InternalDeveloper {
  id: string;
  name: string;
  email: string;
  company: string;
  products: string;
  invitedBy: string;
  invitedAt: string;
  status: string;
}

@Component({
  selector: 'app-internal-developers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './internal-developers.html',
  styleUrl: './internal-developers.css'
})
export class InternalDevelopers implements OnInit {
  
  developers: InternalDeveloper[] = [
    { id: '1', name: 'Rojina Shakya', email: 'rojina.shakya@fonepay.com', company: 'Fonepay', products: 'Autopay, Checkout, Fonepay QR', invitedBy: 'Sujata Maharjan', invitedAt: '5 days ago', status: 'Active' },
    { id: '2', name: 'Kiran Adhikari', email: 'kiran.adhikari@fonepay.com', company: 'Fonepay', products: 'Autopay', invitedBy: 'Sujata Maharjan', invitedAt: '2 days ago', status: 'Unverified' },
    { id: '3', name: 'Bibek Thapa', email: 'bibek.thapa@paylinkpartner.com', company: 'PayLink Partner', products: 'Checkout, Fonepay QR', invitedBy: 'Bibek Rana', invitedAt: '2 months ago', status: 'Active' },
    { id: '4', name: 'Anisha Rai', email: 'anisha.rai@fonepay.com', company: 'Fonepay', products: '—', invitedBy: 'Sujata Maharjan', invitedAt: '6 months ago', status: 'Deactivated' }
  ];

  searchTerm = '';
  selectedStatus = 'All statuses';

  isInviteModalOpen = false;
  newInviteEmail = '';

  activeMenuId: string | null = null;

  ngOnInit() {
    // Data is static for now to match Figma
  }

  get filteredDevelopers() {
    return this.developers.filter(d => {
      const matchesSearch = d.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                            d.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.selectedStatus === 'All statuses' || d.status === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }

  openInviteModal() {
    this.isInviteModalOpen = true;
    this.newInviteEmail = '';
  }

  closeInviteModal() {
    this.isInviteModalOpen = false;
  }

  sendInvitation() {
    if (this.newInviteEmail) {
      this.developers.unshift({
        id: Date.now().toString(),
        name: 'Pending invite',
        email: this.newInviteEmail,
        company: '—',
        products: '—',
        invitedBy: 'Sujata Maharjan',
        invitedAt: 'Just now',
        status: 'Unverified'
      });
      this.closeInviteModal();
    }
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
}
