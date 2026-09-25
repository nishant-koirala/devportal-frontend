import { Component, Input as NgInput } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-auth-card',
  imports: [NgIf],
  templateUrl: './auth-card.html',
  styleUrl: './auth-card.css'
})
export class AuthCardComponent {
  @NgInput() title: string = '';
  @NgInput() subtitle: string = '';
}
