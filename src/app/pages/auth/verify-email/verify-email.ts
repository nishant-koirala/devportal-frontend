import { Component } from '@angular/core';
import { AuthCardComponent } from '../../../shared/components/auth-card/auth-card';

@Component({
  selector: 'app-verify-email',
  imports: [AuthCardComponent],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css'
})
export class VerifyEmailPage {}
