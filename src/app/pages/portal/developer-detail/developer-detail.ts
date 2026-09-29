import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-developer-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './developer-detail.html',
  styleUrl: './developer-detail.css'
})
export class DeveloperDetail implements OnInit {
  
  developerId: string | null = null;
  isDeactivateModalOpen = false;
  
  events = [
    { title: 'Logged in', time: 'Today, 09:14' },
    { title: 'Requested access to Fonebiz by Fonepay (Android)', time: '3 days ago' },
    { title: 'Viewed Generate a checkout session', time: '3 days ago' },
    { title: 'Added Checkout by Fonepay to account', time: '2 weeks ago' },
    { title: 'Access granted for Autopay by Fonepay (Android)', time: '1 month ago' },
    { title: 'Password reset', time: '2 months ago' },
    { title: '3 failed login attempts', time: '2 months ago' },
    { title: 'Email verified', time: '22 June 2026' },
    { title: 'Registered', time: '22 June 2026' }
  ];

  selectedEventType = 'All events';
  selectedTimeframe = 'Last 30 days';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.developerId = params.get('id');
    });
  }

  openDeactivateModal() {
    this.isDeactivateModalOpen = true;
  }

  closeDeactivateModal() {
    this.isDeactivateModalOpen = false;
  }

  confirmDeactivate() {
    this.closeDeactivateModal();
    this.router.navigate(['/portal/developers']);
  }
}
