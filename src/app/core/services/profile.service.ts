import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/pagination.model';
import { UserProfile, UpdateProfileRequest, ChangePasswordRequest } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/profile';

  getProfile() {
    return this.http.get<ApiResponse<UserProfile>>(this.baseUrl);
  }

  updateProfile(data: UpdateProfileRequest) {
    return this.http.put<ApiResponse<UserProfile>>(this.baseUrl, data);
  }

  changePassword(data: any) {
    return this.http.put<any>(`${this.baseUrl}/password`, data);
  }
}

