import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/public/products';

  getProducts() {
    return this.http.get<any[]>(this.baseUrl);
  }

  getProductVersions(slug: string) {
    return this.http.get<any[]>(`${this.baseUrl}/${slug}/versions`);
  }
}
