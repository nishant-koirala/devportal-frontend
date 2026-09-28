import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description?: string;
  status: string;
  audience: string;
  displayOrder?: number;
  updatedAt: string;
  reviewNotes?: string;
  submittedBy?: string;
  reviewedBy?: string;
  submittedAt?: string;
  reviewedAt?: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/admin/products';

  getProducts(page: number = 0, size: number = 10) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
      
    return this.http.get<{ data: PageResponse<Product> }>(this.baseUrl, { params });
  }

  createProduct(product: Partial<Product>) {
    return this.http.post<{ data: Product }>(this.baseUrl, product);
  }

  getProduct(id: string) {
    return this.http.get<{ data: Product }>(`${this.baseUrl}/${id}`);
  }

  updateProduct(id: string, product: Partial<Product>) {
    return this.http.put<{ data: Product }>(`${this.baseUrl}/${id}`, product);
  }

  submitProductForReview(id: string) {
    return this.http.post<{ data: Product }>(`${this.baseUrl}/${id}/submit-review`, {});
  }

  withdrawReview(id: string) {
    return this.http.post<{ data: Product }>(`${this.baseUrl}/${id}/withdraw-review`, {});
  }
}
