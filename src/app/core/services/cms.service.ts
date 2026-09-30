import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/pagination.model';
import { BlockDto, CreatePageRequest, PageMetaResponse, PageRevision, PageTreeNodeResponse, SavePageRequest } from '../models/cms.model';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/cms';

  getPageTree(productId: string): Observable<ApiResponse<PageTreeNodeResponse[]>> {
    return this.http.get<ApiResponse<PageTreeNodeResponse[]>>(`${this.baseUrl}/products/${productId}/pages/tree`);
  }

  createPage(productId: string, data: CreatePageRequest): Observable<ApiResponse<PageMetaResponse>> {
    return this.http.post<ApiResponse<PageMetaResponse>>(`${this.baseUrl}/products/${productId}/pages`, data);
  }

  getPage(pageId: string): Observable<ApiResponse<PageMetaResponse>> {
    return this.http.get<ApiResponse<PageMetaResponse>>(`${this.baseUrl}/pages/${pageId}`);
  }

  savePage(pageId: string, data: SavePageRequest): Observable<ApiResponse<PageMetaResponse>> {
    return this.http.put<ApiResponse<PageMetaResponse>>(`${this.baseUrl}/pages/${pageId}`, data);
  }

  getPageRevisions(pageId: string): Observable<ApiResponse<PageRevision[]>> {
    return this.http.get<ApiResponse<PageRevision[]>>(`${this.baseUrl}/pages/${pageId}/revisions`);
  }

  restoreRevision(pageId: string, versionNumber: number): Observable<ApiResponse<PageMetaResponse>> {
    return this.http.post<ApiResponse<PageMetaResponse>>(`${this.baseUrl}/pages/${pageId}/revisions/${versionNumber}/restore`, {});
  }

  submitForReview(pageId: string): Observable<ApiResponse<PageMetaResponse>> {
    return this.http.post<ApiResponse<PageMetaResponse>>(`${this.baseUrl}/pages/${pageId}/submit-review`, {});
  }

  withdrawReview(pageId: string): Observable<ApiResponse<PageMetaResponse>> {
    return this.http.post<ApiResponse<PageMetaResponse>>(`${this.baseUrl}/pages/${pageId}/withdraw-review`, {});
  }

  publishPage(pageId: string): Observable<ApiResponse<PageMetaResponse>> {
    return this.http.post<ApiResponse<PageMetaResponse>>(`${this.baseUrl}/pages/${pageId}/publish`, {});
  }

  unpublishPage(pageId: string): Observable<ApiResponse<PageMetaResponse>> {
    return this.http.post<ApiResponse<PageMetaResponse>>(`${this.baseUrl}/pages/${pageId}/unpublish`, {});
  }

  deletePage(pageId: string): Observable<ApiResponse<unknown>> {
    return this.http.delete<ApiResponse<unknown>>(`${this.baseUrl}/pages/${pageId}`);
  }
}
