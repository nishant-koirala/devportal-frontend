import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/public/search';

  search(query: string) {
    return this.http.get<any>(this.baseUrl, { params: { query } });
  }
}
