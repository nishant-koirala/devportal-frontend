import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface DashboardResponse {
  totalProducts: number;
  pendingReviews: number;
  pendingAccessRequests: number;
  totalDevelopers: number;
  reviewQueue: Array<{
    id: string;
    title: string;
    meta: string;
  }>;
  accessRequests: Array<{
    id: string;
    title: string;
    meta: string;
  }>;
  recentActivity: Array<{
    id: string;
    description: string;
    time: string;
  }>;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getDashboardMetrics(): Observable<ApiResponse<DashboardResponse>> {
    return this.http.get<ApiResponse<DashboardResponse>>(`${this.baseUrl}/admin/dashboard`);
  }
}
