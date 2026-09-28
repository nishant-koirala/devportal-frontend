import { Component, OnInit, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface PageItem {
  id: string;
  title: string;
  location: string;
  status: string;
  lastEdited: string;
}

@Component({
  selector: 'app-pages-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pages-list.html',
  styleUrl: './pages-list.css'
})
export class PagesList implements OnInit {
  router = inject(Router);
  
  pages: PageItem[] = [
    { id: '1', title: 'Overview page', location: 'Autopay by Fonepay · Overview page', status: 'Published', lastEdited: 'Bibek Rana, 3 days ago' },
    { id: '2', title: 'Third Party Login', location: 'Autopay by Fonepay · API reference', status: 'Published · Draft changes', lastEdited: 'Priya Shrestha, 2 hours ago' },
    { id: '3', title: 'How Autopay works', location: 'Autopay by Fonepay · Introduction', status: 'Published · Pending review', lastEdited: 'Priya Shrestha, 20 minutes ago' },
    { id: '4', title: 'Key concepts', location: 'Autopay by Fonepay · Introduction', status: 'Needs changes', lastEdited: 'Sujata Maharjan, 2 hours ago' },
    { id: '5', title: 'Go-live checklist', location: 'Autopay by Fonepay · Getting Started', status: 'Unpublished', lastEdited: 'Bibek Rana, yesterday' },
    { id: '6', title: 'Generate a checkout session', location: 'Checkout by Fonepay · API reference', status: 'In review', lastEdited: 'Bibek Rana, 1 week ago' },
    { id: '7', title: 'Test credentials', location: 'Checkout by Fonepay · Getting Started', status: 'Published · Pending review', lastEdited: 'Sujata Maharjan, 3 days ago' },
    { id: '8', title: 'Generate QR Code', location: 'Fonepay QR · API reference', status: 'Published · Pending review', lastEdited: 'Rajesh KC, 1 week ago' },
    { id: '9', title: 'Webhook notifications', location: 'Fonepay QR · API reference', status: 'Draft', lastEdited: 'Rajesh KC, 4 days ago' },
    { id: '10', title: 'Frequently asked questions', location: 'Global', status: 'Published', lastEdited: 'Bibek Rana, 2 weeks ago' }
  ];
  
  searchQuery = '';
  productFilter = 'All products';
  statusFilter = 'All statuses';
  activeDropdownId: string | null = null;
  isRevisionHistoryOpen = false;
  isPageSettingsOpen = false;
  isUnpublishModalOpen = false;
  pageToUnpublish: string | null = null;
  pageToEdit: string | null = null;

  get filteredPages() {
    return this.pages.filter(page => {
      const matchesSearch = page.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                            page.location.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus = this.statusFilter === 'All statuses' || page.status.includes(this.statusFilter);
      return matchesSearch && matchesStatus;
    });
  }

  toggleDropdown(id: string, event: Event) {
    event.stopPropagation();
    this.activeDropdownId = this.activeDropdownId === id ? null : id;
  }

  @HostListener('document:click')
  closeDropdown() {
    this.activeDropdownId = null;
  }

  openRevisionHistory(event?: Event) {
    if (event) event.stopPropagation();
    this.isRevisionHistoryOpen = true;
    this.activeDropdownId = null;
  }

  closeRevisionHistory() {
    this.isRevisionHistoryOpen = false;
  }

  openPageSettings(id: string) {
    this.pageToEdit = id;
    this.isPageSettingsOpen = true;
    this.activeDropdownId = null;
  }

  closePageSettings() {
    this.isPageSettingsOpen = false;
    this.pageToEdit = null;
  }

  openUnpublishModal(id: string) {
    this.pageToUnpublish = id;
    this.isUnpublishModalOpen = true;
    this.activeDropdownId = null;
  }

  closeUnpublishModal() {
    this.isUnpublishModalOpen = false;
    this.pageToUnpublish = null;
  }

  confirmUnpublish() {
    // Logic to unpublish
    if (this.pageToUnpublish) {
       const page = this.pages.find(p => p.id === this.pageToUnpublish);
       if (page) {
         page.status = 'Unpublished';
       }
    }
    this.closeUnpublishModal();
  }

  clearSearch() {
    this.searchQuery = '';
    this.productFilter = 'All products';
    this.statusFilter = 'All statuses';
  }

  ngOnInit() {
    // For now, static data. Later we can fetch from API.
  }
}
