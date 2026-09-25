import { Component, Input as NgInput } from '@angular/core';

@Component({
  selector: 'app-route-bar',
  imports: [],
  templateUrl: './route-bar.html',
  styleUrl: './route-bar.css'
})
export class RouteBar {
  @NgInput() method: string = 'GET';
  @NgInput() baseUrl: string = '{{baseurl}}';
  @NgInput() path!: string;
}
