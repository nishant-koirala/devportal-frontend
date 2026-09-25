import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/profile';

  getProfile() {
    return this.http.get<any>(this.baseUrl);
  }

  updateProfile(data: any) {
    return this.http.put<any>(this.baseUrl, data);
  }

  changePassword(data: any) {
    return this.http.put<any>(`${this.baseUrl}/password`, data);
  }
}
