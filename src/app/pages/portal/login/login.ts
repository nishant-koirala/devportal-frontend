import { Component, inject, signal } from '@angular/core';
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

  step = signal<AuthStep>('LOGIN');
  
  // Login form state
  email = signal('');
  password = signal('');
  loginError = signal(false);

  // 2FA code state
  otp1 = signal(''); otp2 = signal(''); otp3 = signal('');
  otp4 = signal(''); otp5 = signal(''); otp6 = signal('');
  codeError = signal(false);

  // Loading states
  isLoggingIn = signal(false);
  isVerifying = signal(false);

  // Real login integration
  onSubmitLogin() {
    if (this.isLoggingIn()) return;
    this.isLoggingIn.set(true);
    this.loginError.set(false);

    this.authService.portalLogin({ email: this.email(), password: this.password() }).subscribe({
      next: (res) => {
        this.isLoggingIn.set(false);
        // Check if 2FA is required or not based on backend response
        if (res.data?.authStatus === 'OTP_REQUIRED') {
          this.step.set('2FA_CODE');
        } else {
          // Logged in directly (if 2FA is disabled)
          this.router.navigate(['/portal/dashboard']);
        }
      },
      error: (err) => {
        this.isLoggingIn.set(false);
        this.loginError.set(true);
      }
    });
  }

  // Real 2FA submit
  onSubmitCode() {
    if (this.isVerifying()) return;
    this.isVerifying.set(true);
    this.codeError.set(false);

    const fullCode = `${this.otp1()}${this.otp2()}${this.otp3()}${this.otp4()}${this.otp5()}${this.otp6()}`;
    this.authService.portalVerifyOtp({ email: this.email(), otp: fullCode }).subscribe({
      next: (res) => {
        this.isVerifying.set(false);
        this.router.navigate(['/portal/dashboard']);
      },
      error: (err) => {
        this.isVerifying.set(false);
        this.codeError.set(true);
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
    this.step.set('BACKUP_CODES');
  }

  finishEnrollment() {
    // Navigate to dashboard after showing backup codes
    this.router.navigate(['/portal/dashboard']);
  }
}
