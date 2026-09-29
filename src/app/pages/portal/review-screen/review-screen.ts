import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-review-screen',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './review-screen.html',
  styleUrl: './review-screen.css'
})
export class ReviewScreen implements OnInit {
  
  reviewId: string | null = null;
  isRejectModalOpen = false;
  rejectComment = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.reviewId = params.get('id');
    });
  }

  openRejectModal() {
    this.isRejectModalOpen = true;
    this.rejectComment = '';
  }

  closeRejectModal() {
    this.isRejectModalOpen = false;
  }

  confirmReject() {
    if (this.rejectComment) {
      this.closeRejectModal();
      this.router.navigate(['/portal/reviews']);
    }
  }

  approve() {
    this.router.navigate(['/portal/reviews']);
  }
}
