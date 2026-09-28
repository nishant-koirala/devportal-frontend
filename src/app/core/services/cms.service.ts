import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export type BlockType = 'HEADING' | 'PARAGRAPH' | 'CODE' | 'ENDPOINT' | 'FAQ' | 'TABLE' | 'IMAGE' | 'NOTE_WARNING' | 'PARAMETER_TABLE' | 'TEST_CREDENTIAL' | 'FEATURE_GRID';

export interface BlockDto {
  id?: string;
  type: BlockType;
  order: number;
  data: any;
}

export interface PageMetaResponse {
  id: string;
  version: number;
  productId: string;
  parentId: string | null;
  pageOrder: number;
  title: string;
  slug: string;
  status: 'DRAFT' | 'IN_REVIEW' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastPublishedAt?: string;
  reviewNotes?: string;
  draftBlocks?: BlockDto[];
  publishedBlocks?: BlockDto[];
}

export interface PageTreeNodeResponse {
  id: string;
  parentId: string | null;
  title: string;
  slug: string;
  status: string;
  pageOrder: number;
  children: PageTreeNodeResponse[];
}

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/cms';

  getPageTree(productId: string): Observable<{ data: PageTreeNodeResponse[] }> {
    return this.http.get<{ data: PageTreeNodeResponse[] }>(`${this.baseUrl}/products/${productId}/pages/tree`);
  }

  createPage(productId: string, data: any): Observable<{ data: PageMetaResponse }> {
    return this.http.post<{ data: PageMetaResponse }>(`${this.baseUrl}/products/${productId}/pages`, data);
  }

  getPage(pageId: string): Observable<{ data: PageMetaResponse }> {
    return this.http.get<{ data: PageMetaResponse }>(`${this.baseUrl}/pages/${pageId}`);
  }

  savePage(pageId: string, data: any): Observable<{ data: PageMetaResponse }> {
    return this.http.put<{ data: PageMetaResponse }>(`${this.baseUrl}/pages/${pageId}`, data);
  }

  getPageRevisions(pageId: string): Observable<{ data: any[] }> {
    return this.http.get<{ data: any[] }>(`${this.baseUrl}/pages/${pageId}/revisions`);
  }

  restoreRevision(pageId: string, versionNumber: number): Observable<{ data: any }> {
    return this.http.post<{ data: any }>(`${this.baseUrl}/pages/${pageId}/revisions/${versionNumber}/restore`, {});
  }

  submitForReview(pageId: string): Observable<{ data: any }> {
    return this.http.post<{ data: any }>(`${this.baseUrl}/pages/${pageId}/submit-review`, {});
  }

  withdrawReview(pageId: string): Observable<{ data: any }> {
    return this.http.post<{ data: any }>(`${this.baseUrl}/pages/${pageId}/withdraw-review`, {});
  }

  publishPage(pageId: string): Observable<{ data: any }> {
    return this.http.post<{ data: any }>(`${this.baseUrl}/pages/${pageId}/publish`, {});
  }

  unpublishPage(pageId: string): Observable<{ data: any }> {
    return this.http.post<{ data: any }>(`${this.baseUrl}/pages/${pageId}/unpublish`, {});
  }

  deletePage(pageId: string): Observable<{ data: any }> {
    return this.http.delete<{ data: any }>(`${this.baseUrl}/pages/${pageId}`);
  }
}
