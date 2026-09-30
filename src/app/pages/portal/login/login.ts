import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

type AuthStep = 'LOGIN' | '2FA_CODE' | 'ENROLL_APP' | 'BACKUP_CODES';

@Component({
  selector: 'app-portal-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  step: AuthStep = 'LOGIN';
  
  // Login form state
  email = '';
  password = '';
  loginError = false;

  // 2FA code state
  otp1 = ''; otp2 = ''; otp3 = '';
  otp4 = ''; otp5 = ''; otp6 = '';
  codeError = false;

  // Loading states
  isLoggingIn = false;
  isVerifying = false;

  // Real login integration
  onSubmitLogin() {
    if (this.isLoggingIn) return;
    this.isLoggingIn = true;
    this.loginError = false;
    this.cdr.detectChanges(); // force loading state to show

    this.authService.portalLogin({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.isLoggingIn = false;
        // Check if 2FA is required or not based on backend response
        if (res.data?.authStatus === 'OTP_REQUIRED') {
          this.step = '2FA_CODE';
        } else {
          // Logged in directly (if 2FA is disabled)
          this.router.navigate(['/portal/dashboard']);
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoggingIn = false;
        this.loginError = true;
        this.cdr.detectChanges();
      }
    });
  }

  // Real 2FA submit
  onSubmitCode() {
    if (this.isVerifying) return;
    this.isVerifying = true;
    this.codeError = false;
    this.cdr.detectChanges(); // force loading state to show

    const fullCode = `${this.otp1}${this.otp2}${this.otp3}${this.otp4}${this.otp5}${this.otp6}`;
    this.authService.portalVerifyOtp({ email: this.email, otp: fullCode }).subscribe({
      next: (res) => {
        this.isVerifying = false;
        this.router.navigate(['/portal/dashboard']);
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isVerifying = false;
        this.codeError = true;
        this.cdr.detectChanges();
      }
    });
  }

  // OTP Auto-focus logic
  onOtpInput(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;
    const isBackspace = event.key === 'Backspace';

    if (input.value && !isBackspace) {
      // Focus next input
      if (index < 6) {
        const nextInput = document.querySelector(`input[name=otp${index + 1}]`) as HTMLInputElement;
        if (nextInput) nextInput.focus();
      }
    } else if (isBackspace) {
      // Focus previous input
      if (index > 1) {
        const prevInput = document.querySelector(`input[name=otp${index - 1}]`) as HTMLInputElement;
        if (prevInput) prevInput.focus();
      }
    }
  }

  // Enrollment actions
  continueToBackupCodes() {
    this.step = 'BACKUP_CODES';
  }

  finishEnrollment() {
    // Navigate to dashboard after showing backup codes
    this.router.navigate(['/portal/dashboard']);
  }
}

