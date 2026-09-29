import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export interface Developer {
  id: string;
  name: string;
  email: string;
  company: string;
  products: string;
  registered: string;
  status: 'Active' | 'Unverified' | 'Deactivated';
}

@Component({
  selector: 'app-developers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './developers.html',
  styleUrl: './developers.css'
})
export class Developers implements OnInit {
  
  developers: Developer[] = [
    { id: '1', name: 'Priya Shrestha', email: 'priya.shrestha@merchantco.com', company: 'Merchant Co', products: 'Autopay, Checkout', registered: '22 June 2026', status: 'Active' },
    { id: '2', name: 'Bibek Rana', email: 'bibek@paylink.com.np', company: 'PayLink Pvt Ltd', products: 'Fonepay QR', registered: '15 August 2026', status: 'Active' },
    { id: '3', name: 'Sujata Maharjan', email: 'sujata@digitalpay.com', company: 'DigitalPay Nepal', products: '—', registered: '20 September 2026', status: 'Unverified' },
    { id: '4', name: 'Rajesh KC', email: 'rajesh.kc@shopnow.com.np', company: 'ShopNow', products: 'Autopay', registered: '5 January 2026', status: 'Deactivated' },
    { id: '5', name: 'Anisha Rai', email: 'anisha@quickcart.com', company: 'QuickCart', products: 'Checkout, Fonepay QR', registered: '10 March 2026', status: 'Active' }
  ];

  searchTerm = '';
  selectedStatus = 'All statuses';
  selectedProduct = 'All products';
  
  activeMenuId: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  get hasDevelopers() {
    return this.developers.length > 0;
  }

  get filteredDevelopers() {
    return this.developers.filter(d => {
      const matchesSearch = d.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                            d.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            d.company.toLowerCase().includes(this.searchTerm.toLowerCase());
                            
      const matchesStatus = this.selectedStatus === 'All statuses' || d.status === this.selectedStatus;
      const matchesProduct = this.selectedProduct === 'All products' || d.products.includes(this.selectedProduct);
      
      return matchesSearch && matchesStatus && matchesProduct;
    });
  }

  goToDeveloper(id: string) {
    this.router.navigate(['/portal/developers', id]);
  }

  goToInternalDevelopers() {
    this.router.navigate(['/portal/internal-developers']);
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
