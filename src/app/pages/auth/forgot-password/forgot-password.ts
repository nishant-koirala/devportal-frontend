import { Component } from '@angular/core';
import { AuthCardComponent } from '../../../shared/components/auth-card/auth-card';
import { Input } from '../../../shared/components/input/input';

@Component({
  selector: 'app-forgot-password',
  imports: [AuthCardComponent, Input],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPasswordPage {}
