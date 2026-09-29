import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../../../environments/environment';

interface BlockData {
  text?: string;
  url?: string;
  caption?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  content?: string[][];
  withHeadings?: boolean;
  code?: string;
  language?: string;
  title?: string;
  description?: string;
}

interface Block {
  id: string;
  type: 'paragraph' | 'heading' | 'image' | 'table' | 'code' | 'note' | 'endpoint' | 'card_list';
  data: BlockData;
}

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-page.html'
})
export class ProductPage implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  
  productSlug = '';
  pageSlug = '';
  pageData: any;
  blocks: Block[] = [];
  loading = true;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productSlug = params.get('id') || '';
      this.pageSlug = params.get('pageId') || '';
      if (this.productSlug && this.pageSlug) {
        this.loadPage();
      }
    });
  }

  loadPage() {
    this.loading = true;
    this.http.get<{data: any}>(`${environment.apiUrl}/public/products/${this.productSlug}/pages/${this.pageSlug}`)
      .pipe(
        catchError(() => of({ data: null })),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.pageData = res?.data;
        if (this.pageData?.content) {
          try {
            this.blocks = JSON.parse(this.pageData.content);
          } catch (e) {
            console.error('Failed to parse blocks', e);
          }
        }
      });
  }
}
