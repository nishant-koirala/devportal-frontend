import { Component, Input as NgInput } from '@angular/core';

@Component({
  selector: 'app-account-cta-banner',
  imports: [],
  templateUrl: './account-cta-banner.html',
  styleUrl: './account-cta-banner.css'
})
export class AccountCtaBanner {
  @NgInput() title: string = 'Create a free developer account';
  @NgInput() description: string = 'Access sandbox credentials, full API docs, and start integrating today.';
  @NgInput() actionLabel: string = 'Create account';
  @NgInput() perks: string[] = [
    'Full sandbox access',
    'No approval required',
    'Live API reference',
    'Test credentials included'
  ];
}
