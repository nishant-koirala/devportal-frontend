import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private baseUrl = environment.apiUrl + '/auth';
  
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  public isLoggedIn$ = this.tokenSubject.asObservable();

  login(credentials: any) {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
      tap(res => this.handleAuthResponse(res))
    );
  }

  portalLogin(credentials: any) {
    return this.http.post<any>(`${this.baseUrl}/portal/login`, credentials).pipe(
      tap(res => this.handleAuthResponse(res))
    );
  }

  register(userData: any) {
    return this.http.post<any>(`${this.baseUrl}/register`, userData).pipe(
      tap(res => this.handleAuthResponse(res))
    );
  }

  forgotPassword(email: string) {
    return this.http.post<any>(`${this.baseUrl}/forgot-password`, { email });
  }

  resetPassword(data: any) {
    return this.http.post<any>(`${this.baseUrl}/reset-password`, data);
  }

  verifyOtp(data: any) {
    return this.http.post<any>(`${this.baseUrl}/otp-verify`, data);
  }

  portalVerifyOtp(data: any) {
    return this.http.post<any>(`${this.baseUrl}/portal/otp/verify`, data).pipe(
      tap(res => this.handleAuthResponse(res))
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private handleAuthResponse(response: any) {
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

