import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Announcement {
  id: string;
  title: string;
  channel: string;
  sentAt: string;
  recipients: string;
  delivery: string;
}

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './announcements.html',
  styleUrl: './announcements.css'
})
export class Announcements implements OnInit {
  
  announcements: Announcement[] = [
    { id: '1', title: 'Scheduled maintenance, 28 September', channel: 'Banner and email', sentAt: '2 hours ago', recipients: '1,102', delivery: '1,098 delivered · 4 failed' },
    { id: '2', title: 'New Fonebiz SDK now available', channel: 'Banner only', sentAt: '3 days ago', recipients: '1,076', delivery: '1,076 delivered · 0 failed' },
    { id: '3', title: 'Planned downgrade of the QA sandbox', channel: 'Email only', sentAt: '1 week ago', recipients: '1,050', delivery: '1,041 delivered · 9 failed' }
  ];

  searchTerm = '';
  selectedChannel = 'All channels';

  // Modal state
  isSendModalOpen = false;
  newAnnouncement = {
    title: '',
    message: '',
    channelBanner: true,
    channelEmail: false
  };

  ngOnInit() {
    // Data is static for now to match Figma
  }

  openSendModal() {
    this.isSendModalOpen = true;
    this.newAnnouncement = {
      title: '',
      message: '',
      channelBanner: true,
      channelEmail: false
    };
  }

  closeSendModal() {
    this.isSendModalOpen = false;
  }

  sendAnnouncement() {
    // Logic to send announcement
    let channel = 'Banner only';
    if (this.newAnnouncement.channelBanner && this.newAnnouncement.channelEmail) {
      channel = 'Banner and email';
    } else if (this.newAnnouncement.channelEmail) {
      channel = 'Email only';
    }
    
    this.announcements.unshift({
      id: Date.now().toString(),
      title: this.newAnnouncement.title || 'Untitled',
      channel: channel,
      sentAt: 'Just now',
      recipients: '1,102',
      delivery: 'Sending...'
    });
    this.closeSendModal();
  }

  get filteredAnnouncements() {
    return this.announcements.filter(a => {
      const matchesSearch = a.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesChannel = this.selectedChannel === 'All channels' || a.channel === this.selectedChannel;
      return matchesSearch && matchesChannel;
    });
  }

  clearAnnouncements() {
    // For demo purposes to see the empty state
    this.announcements = [];
  }
}
