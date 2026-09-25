import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCardComponent } from '../../../shared/components/auth-card/auth-card';
import { Input } from '../../../shared/components/input/input';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [AuthCardComponent, Input],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginPage {
  email = '';
  password = '';
  error = '';
  isLoading = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  login() {
    if (!this.email || !this.password) return;
    
    this.isLoading = true;
    this.error = '';
    
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/onboarding']);
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.message || 'Invalid credentials';
      }
    });
  }
}
