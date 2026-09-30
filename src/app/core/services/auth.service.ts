import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/pagination.model';
import { LoginCredentials, RegisterDto, ResetPasswordRequest, OtpRequest, AuthResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private baseUrl = environment.apiUrl + '/auth';
  
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  public isLoggedIn$ = this.tokenSubject.asObservable();

  login(credentials: LoginCredentials) {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.baseUrl}/login`, credentials).pipe(
      tap(res => this.handleAuthResponse(res))
    );
  }

  portalLogin(credentials: LoginCredentials) {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.baseUrl}/portal/login`, credentials).pipe(
      tap(res => this.handleAuthResponse(res))
    );
  }

  register(userData: RegisterDto) {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.baseUrl}/register`, userData).pipe(
      tap(res => this.handleAuthResponse(res))
    );
  }

  forgotPassword(email: string) {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.baseUrl}/forgot-password`, { email });
  }

  resetPassword(data: ResetPasswordRequest) {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.baseUrl}/reset-password`, data);
  }

  verifyOtp(data: OtpRequest) {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.baseUrl}/otp-verify`, data);
  }

  portalVerifyOtp(data: OtpRequest) {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.baseUrl}/portal/otp/verify`, data).pipe(
      tap(res => this.handleAuthResponse(res))
    );
  }

    isTokenExpired(token: string): boolean {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return true;
      const payload = JSON.parse(atob(parts[1]));
      if (!payload.exp) return false;
      return (Math.floor(Date.now() / 1000)) >= payload.exp;
    } catch {
      return true;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    if (this.isTokenExpired(token)) {
      this.logout();
      return false;
    }
    return true;
  }

  hasRole(role: string): boolean {
    if (!this.isAuthenticated()) return false;
    const token = this.getToken();
    try {
      const parts = token!.split('.');
      const payload = JSON.parse(atob(parts[1]));
      const roles = payload.roles || [];
      return roles.includes(role);
    } catch {
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private handleAuthResponse(response: ApiResponse<AuthResponse>) {
    if (response?.data?.token) {
      localStorage.setItem('token', response.data.token);
      this.tokenSubject.next(response.data.token);
    }
  }

  getUserName(): string {
    const token = this.getToken();
    if (!token) return 'Admin';
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return 'Admin';
      const payload = JSON.parse(atob(parts[1]));
      return payload.fullName || payload.email || 'Admin';
    } catch (e) {
      return 'Admin';
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.router.navigate(['/portal/login']);
  }
}



