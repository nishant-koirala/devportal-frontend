import { Component, Input as NgInput } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PasswordRule {
  label: string;
  passed: boolean;
}

@Component({
  selector: 'app-password-rules',
  imports: [CommonModule],
  templateUrl: './password-rules.html',
  styleUrl: './password-rules.css'
})
export class PasswordRules {
  @NgInput() rules: PasswordRule[] = [
    { label: '8 characters or more', passed: false },
    { label: 'One uppercase letter', passed: false },
    { label: 'One number', passed: false },
    { label: 'One special character', passed: false },
  ];
}
