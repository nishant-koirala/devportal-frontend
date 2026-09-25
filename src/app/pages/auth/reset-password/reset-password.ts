import { Component } from '@angular/core';
import { AuthCardComponent } from '../../../shared/components/auth-card/auth-card';
import { Input } from '../../../shared/components/input/input';
import { PasswordRules } from '../../../shared/components/password-rules/password-rules';

@Component({
  selector: 'app-reset-password',
  imports: [AuthCardComponent, Input, PasswordRules],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPasswordPage {}
