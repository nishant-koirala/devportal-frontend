import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-access-request-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './access-request-detail.html',
  styleUrl: './access-request-detail.css'
})
export class AccessRequestDetail implements OnInit {
  
  requestId: string | null = null;
  isGrantModalOpen = false;
  isDeclineModalOpen = false;
  
  declineReason = '';
  grantInstructions = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.requestId = params.get('id');
    });
  }

  openGrantModal() {
    this.isGrantModalOpen = true;
    this.grantInstructions = '';
  }

  closeGrantModal() {
    this.isGrantModalOpen = false;
  }

  confirmGrant() {
    this.closeGrantModal();
    this.router.navigate(['/portal/access']);
  }

  openDeclineModal() {
    this.isDeclineModalOpen = true;
    this.declineReason = '';
  }

  closeDeclineModal() {
    this.isDeclineModalOpen = false;
  }

  confirmDecline() {
    if (this.declineReason) {
      this.closeDeclineModal();
      this.router.navigate(['/portal/access']);
    }
  }
}
