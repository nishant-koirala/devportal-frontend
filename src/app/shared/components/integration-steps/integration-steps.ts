import { Component, Input as NgInput } from '@angular/core';
import { SectionHeader } from '../section-header/section-header';
import { StepCard } from '../step-card/step-card';
import { AccountCtaBanner } from '../account-cta-banner/account-cta-banner';

@Component({
  selector: 'app-integration-steps',
  imports: [SectionHeader, StepCard, AccountCtaBanner],
  templateUrl: './integration-steps.html',
  styleUrl: './integration-steps.css'
})
export class IntegrationSteps {
  @NgInput() sectionTitle: string = 'Integrate in three steps';
  @NgInput() steps = [
    { step: 1, title: 'Register', description: 'Create a free developer account with your email. No documents, no approval queue.' },
    { step: 2, title: 'Add Products', description: 'Browse available products and add them to your account to get sandbox credentials.' },
    { step: 3, title: 'Go Live', description: 'When you\'re ready, submit your integration for review and go live with real transactions.' }
  ];
}
