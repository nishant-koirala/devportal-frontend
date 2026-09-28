import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AuditLogEntry {
  actor: string;
  action: string;
  resource: string;
  date: string;
  details: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  status: number;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/portal/audit-logs`;

  getAuditLogs(page: number = 0, size: number = 10, search?: string, actor?: string, action?: string): Observable<ApiResponse<PageResponse<AuditLogEntry>>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    // Backend AuditLogSearchCriteriaDto fields: page, size, sortBy, sortDirection, adminId, targetId, targetType, action, search, startDate, endDate
    if (search) params = params.set('search', search);
    if (action && action !== 'All actions') params = params.set('action', action);

    return this.http.get<ApiResponse<PageResponse<AuditLogEntry>>>(this.apiUrl, { params });
  }

  exportAuditLogs(search?: string, actor?: string, action?: string): void {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (actor && actor !== 'All actors') params = params.set('actor', actor);
    if (action && action !== 'All actions') params = params.set('action', action);

    // Call the export endpoint and trigger download
    this.http.get(`${this.apiUrl}/export`, { params, responseType: 'blob' }).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'audit_logs_export.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
