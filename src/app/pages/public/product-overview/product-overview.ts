import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { of, EMPTY } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PageHero } from '../../../shared/components/page-hero/page-hero';
import { SectionHeader } from '../../../shared/components/section-header/section-header';
import { AccountCtaBanner } from '../../../shared/components/account-cta-banner/account-cta-banner';

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
  selector: 'app-product-overview',
  imports: [CommonModule, RouterModule, PageHero, AccountCtaBanner],
  templateUrl: './product-overview.html',
  styleUrl: './product-overview.css'
})
export class ProductOverview implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  
  product: any;
  blocks: Block[] = [];
  loading = true;

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('id');
    if (!slug) {
      this.loading = false;
      return;
    }

    this.http.get<{data: any}>(`${environment.apiUrl}/public/products/${slug}`)
      .pipe(
        // If public API fails (e.g. DRAFT), fall back to admin API
        catchError(() =>
          this.http.get<{data: {content: any[]}}>(`${environment.apiUrl}/admin/products?size=100`).pipe(
            switchMap(res => {
              const found = res?.data?.content?.find((p: any) => p.slug === slug);
              return of({ data: found ?? null });
            }),
            catchError(() => of({ data: null }))
          )
        ),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        this.product = res?.data;
        if (this.product?.description) {
          try {
            this.blocks = JSON.parse(this.product.description);
          } catch (e) {
            console.error('Failed to parse blocks', e);
          }
        }
      });
  }
}
