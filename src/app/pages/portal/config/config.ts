import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export interface ConfigItem {
  id: string;
  name: string;
  value: string;
  description: string;
}

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './config.html',
  styleUrl: './config.css'
})
export class Config implements OnInit {
  
  configs: ConfigItem[] = [
    { id: '1', name: 'Email verification link lifetime', value: '24 hours', description: 'How long an emailed verification link stays valid before a developer must request a new one.' },
    { id: '2', name: 'Password reset link lifetime', value: '1 hour', description: 'How long a password reset link stays valid before it expires.' },
    { id: '3', name: 'Developer session idle timeout', value: '7 days', description: 'How long a developer\'s session stays valid with no activity before they are signed out.' },
    { id: '4', name: 'Developer session maximum lifetime', value: '30 days', description: 'The longest a developer session can last, active or not, before requiring login again.' },
    { id: '5', name: 'Login attempts before lockout', value: '10 attempts', description: 'How many failed login attempts are allowed before the account is temporarily locked.' },
    { id: '6', name: 'Login lockout window', value: '15 minutes', description: 'How long the login lockout lasts once the attempt limit is reached.' },
    { id: '7', name: 'Resend cooldown, verification emails', value: '120 seconds', description: 'The minimum wait between requests to resend a verification email.' },
    { id: '8', name: 'Unverified account retention', value: '30 days', description: 'How long an unverified account is kept before it is purged.' },
    { id: '9', name: 'Internal session idle timeout', value: '8 hours', description: 'How long a staff session stays valid with no activity before sign-out.' },
    { id: '10', name: 'Internal session maximum lifetime', value: '24 hours', description: 'The longest a staff session can last before requiring login again.' }
  ];

  searchTerm = '';
  activeMenuId: string | null = null;
  
  isNewConfigModalOpen = false;
  isConfirmCreateModalOpen = false;
  
  newConfigName = '';
  newConfigValue = '';
  newConfigDescription = '';

  constructor(private router: Router) {}

  ngOnInit() {
  }

  get filteredConfigs() {
    return this.configs.filter(c => {
      return c.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
             c.value.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
             c.description.toLowerCase().includes(this.searchTerm.toLowerCase());
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

  goToConfig(id: string) {
    this.router.navigate(['/portal/config', id]);
  }

  goToEdit(id: string) {
    this.router.navigate(['/portal/config/edit', id]);
  }

  openNewConfigModal() {
    this.isNewConfigModalOpen = true;
    this.newConfigName = '';
    this.newConfigValue = '';
    this.newConfigDescription = '';
  }

  closeNewConfigModal() {
    this.isNewConfigModalOpen = false;
  }

  openConfirmCreateModal() {
    this.isNewConfigModalOpen = false;
    this.isConfirmCreateModalOpen = true;
  }

  closeConfirmCreateModal() {
    this.isConfirmCreateModalOpen = false;
  }

  confirmCreateConfig() {
    if (this.newConfigName && this.newConfigValue) {
      this.configs.unshift({
        id: Math.random().toString(),
        name: this.newConfigName,
        value: this.newConfigValue,
        description: this.newConfigDescription
      });
    }
    this.closeConfirmCreateModal();
  }
}
