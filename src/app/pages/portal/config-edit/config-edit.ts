import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-config-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './config-edit.html',
  styleUrl: './config-edit.css'
})
export class ConfigEdit implements OnInit {
  
  configId: string | null = null;

  // Mock data for this example
  configName = 'Developer session idle timeout';
  configDescription = 'How long a developer\'s session stays valid with no activity before they are signed out.';
  configValue = '7 days';
  
  originalValue = '7 days';

  isConfirmSaveModalOpen = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.configId = params.get('id');
    });
  }

  goBack() {
    this.router.navigate(['/portal/config', this.configId]);
  }

  openConfirmSaveModal() {
    this.isConfirmSaveModalOpen = true;
  }

  closeConfirmSaveModal() {
    this.isConfirmSaveModalOpen = false;
  }

  confirmSave() {
    this.closeConfirmSaveModal();
    this.router.navigate(['/portal/config', this.configId]);
  }
}
