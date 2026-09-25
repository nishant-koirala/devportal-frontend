import { Component, Input as NgInput, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class Input {
  @NgInput() label: string = '';
  @NgInput() placeholder: string = '';
  @NgInput() type: string = 'text';
  @NgInput() disabled: boolean = false;
  @NgInput() hint: string = '';
  
  @NgInput() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(this.value);
  }
}
