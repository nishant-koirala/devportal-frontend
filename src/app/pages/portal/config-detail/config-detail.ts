import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-config-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './config-detail.html',
  styleUrl: './config-detail.css'
})
export class ConfigDetail implements OnInit {
  
  configId: string | null = null;

  // Mock data for this example
  configName = 'Developer session idle timeout';
  configDescription = 'How long a developer\'s session stays valid with no activity before they are signed out. Key: session.idle.ttl.';
  configValue = '7 days';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.configId = params.get('id');
    });
  }

  goToEdit() {
    this.router.navigate(['/portal/config/edit', this.configId]);
  }
}
