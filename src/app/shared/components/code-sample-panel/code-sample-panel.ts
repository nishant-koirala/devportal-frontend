import { Component, Input as NgInput } from '@angular/core';

@Component({
  selector: 'app-code-sample-panel',
  imports: [],
  templateUrl: './code-sample-panel.html',
  styleUrl: './code-sample-panel.css'
})
export class CodeSamplePanel {
  @NgInput() tabs: string[] = ['cURL'];
  @NgInput() activeTab: string = 'cURL';
  @NgInput() code!: string;

  setTab(tab: string) {
    this.activeTab = tab;
  }
  
  copyCode() {
    navigator.clipboard.writeText(this.code);
  }
}
