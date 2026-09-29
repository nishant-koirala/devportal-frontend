import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export interface ReviewItem {
  id: string;
  page: string;
  location: string;
  submittedBy: string;
  submittedAt: string;
  change: string;
}

@Component({
  selector: 'app-review-queue',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-queue.html',
  styleUrl: './review-queue.css'
})
export class ReviewQueue implements OnInit {
  
  reviews: ReviewItem[] = [
    { id: '1', page: 'How Autopay works', location: 'Autopay by Fonepay / Introduction', submittedBy: 'Priya Shrestha', submittedAt: '20 minutes ago', change: 'Edit' },
    { id: '2', page: 'Generate a checkout session', location: 'Checkout by Fonepay / API reference', submittedBy: 'Bibek Rana', submittedAt: '2 hours ago', change: 'New page' },
    { id: '3', page: 'Test credentials', location: 'Checkout by Fonepay / Getting Started', submittedBy: 'Sujata Maharjan', submittedAt: '3 hours ago', change: 'Restored' },
    { id: '4', page: 'Generate QR Code', location: 'Fonepay QR / API reference', submittedBy: 'Rajesh KC', submittedAt: 'Yesterday', change: 'Edit' }
  ];

  searchTerm = '';
  selectedProduct = 'All products';
  activeMenuId: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  get filteredReviews() {
    return this.reviews.filter(r => {
      const matchesSearch = r.page.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                            r.location.toLowerCase().includes(this.searchTerm.toLowerCase());
      // Just mock product filter
      const matchesProduct = this.selectedProduct === 'All products' || r.location.includes(this.selectedProduct);
      return matchesSearch && matchesProduct;
    });
  }

  goToReview(id: string) {
    this.router.navigate(['/portal/reviews', id]);
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
