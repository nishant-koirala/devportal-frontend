import { Component, Input as NgInput } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-status-block',
  imports: [CommonModule],
  templateUrl: './auth-status-block.html',
  styleUrl: './auth-status-block.css'
})
export class AuthStatusBlock {
  @NgInput() state: 'Pending' | 'Success' | 'Expired' = 'Pending';

  config = {
    Pending: {
      icon: '⏳',
      title: 'Verification Pending',
      description: 'We have sent a verification email to your address. Please click the link to continue.',
      badgeClass: 'pending',
    },
    Success: {
      icon: '✅',
      title: 'Verification Successful',
      description: 'Your account has been verified. You can now access all developer features.',
      badgeClass: 'success',
    },
    Expired: {
      icon: '⛔',
      title: 'Link Expired',
      description: 'Your verification link has expired. Please request a new one.',
      badgeClass: 'expired',
    }
  };

  get current() {
    return this.config[this.state];
  }
}
