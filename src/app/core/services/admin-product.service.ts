import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product.model';
import { PageResponse, ApiResponse } from '../models/pagination.model';

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
      
    return this.http.get<ApiResponse<PageResponse<Product>>>(this.baseUrl, { params });
  }

  createProduct(product: Partial<Product>) {
    return this.http.post<ApiResponse<Product>>(this.baseUrl, product);
  }

  getProduct(id: string) {
    return this.http.get<ApiResponse<Product>>(`${this.baseUrl}/${id}`);
  }

  updateProduct(id: string, product: Partial<Product>) {
    return this.http.put<ApiResponse<Product>>(`${this.baseUrl}/${id}`, product);
  }

  submitProductForReview(id: string) {
    return this.http.post<ApiResponse<Product>>(`${this.baseUrl}/${id}/submit-review`, {});
  }

  withdrawReview(id: string) {
    return this.http.post<ApiResponse<Product>>(`${this.baseUrl}/${id}/withdraw-review`, {});
  }
}
