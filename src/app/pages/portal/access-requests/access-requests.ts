import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export interface AccessRequest {
  id: string;
  developerName: string;
  developerEmail: string;
  company: string;
  asset: string;
  requestedAt: string;
  status: 'Pending' | 'Granted' | 'Declined';
}

@Component({
  selector: 'app-access-requests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './access-requests.html',
  styleUrl: './access-requests.css'
})
export class AccessRequests implements OnInit {
  
  requests: AccessRequest[] = [
    { id: '1', developerName: 'Priya Shrestha', developerEmail: 'priya.shrestha@merchantco.com', company: 'Merchant Co', asset: 'Fonepay App (iOS)', requestedAt: '10 minutes ago', status: 'Pending' },
    { id: '2', developerName: 'Bibek Rana', developerEmail: 'bibek@paylink.com.np', company: 'PayLink Pvt Ltd', asset: 'Fonebiz by Fonepay (Android)', requestedAt: '1 hour ago', status: 'Granted' },
    { id: '3', developerName: 'Sujata Maharjan', developerEmail: 'sujata@digitalpay.com', company: 'DigitalPay Nepal', asset: 'Fonebiz', requestedAt: '3 hours ago', status: 'Declined' },
    { id: '4', developerName: 'Rajesh KC', developerEmail: 'rajesh.kc@shopnow.com.np', company: 'ShopNow', asset: 'Fonepay App (Android)', requestedAt: 'Yesterday', status: 'Granted' }
  ];

  searchTerm = '';
  selectedStatus = 'All statuses';
  selectedAsset = 'All assets';
  
  activeMenuId: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  get hasRequests() {
    return this.requests.length > 0;
  }

  get filteredRequests() {
    return this.requests.filter(r => {
      const matchesSearch = r.developerName.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                            r.developerEmail.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            r.company.toLowerCase().includes(this.searchTerm.toLowerCase());
                            
      const matchesStatus = this.selectedStatus === 'All statuses' || r.status === this.selectedStatus;
      const matchesAsset = this.selectedAsset === 'All assets' || r.asset === this.selectedAsset;
      
      return matchesSearch && matchesStatus && matchesAsset;
    });
  }

  goToRequest(id: string) {
    this.router.navigate(['/portal/access', id]);
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
