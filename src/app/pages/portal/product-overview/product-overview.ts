import { Component, inject, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AdminProductService } from '../../../core/services/admin-product.service';
import { Product } from '../../../core/services/../models/product.model';
import { CmsService } from '../../../core/services/cms.service';
import { PageTreeNodeResponse, PageMetaResponse, BlockDto } from '../../../core/services/../models/cms.model';
import { BlockEditor } from '../../../components/block-editor/block-editor';
import { CmsSidebar } from '../../../components/cms-sidebar/cms-sidebar';
import { EditorHeader } from '../../../components/editor-header/editor-header';

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, BlockEditor, EditorHeader],
  templateUrl: './product-overview.html',
  styleUrls: ['./product-overview.css']
})
export class ProductOverview implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(AdminProductService);
  private cdr = inject(ChangeDetectorRef);
  private cmsService = inject(CmsService);

  productId: string = '';
  product: Product | null = null;
  blocks: BlockDto[] = [];
  
  isSaving: boolean = false;
  productMenuOpen: boolean = false;
  isPreviewMode: boolean = false;

  get isLocked(): boolean {
    return this.product?.status === 'IN_REVIEW' || this.isPreviewMode;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id') || '';
      if (this.productId) {
        this.loadProduct();
      }
    });
  }



  loadProduct() {
    this.productService.getProduct(this.productId).subscribe({
      next: (res) => {
        this.product = res.data;
        if (this.product?.description) {
          try {
            this.blocks = JSON.parse(this.product.description);
          } catch (e) {
            this.blocks = [];
          }
        } else {
          this.blocks = [];
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading product', err);
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.productMenuOpen = false;
  }

  toggleProductMenu(event: Event) {
    event.stopPropagation();
    this.productMenuOpen = !this.productMenuOpen;
  }

  onBlocksChange(newBlocks: BlockDto[]) {
    this.blocks = newBlocks;
  }

  saveDraft() {
    if (!this.product) return;
    this.isSaving = true;
    
    // Save blocks stringified in description
    const payload = {
      name: this.product.name,
      slug: this.product.slug,
      shortDescription: this.product.shortDescription,
      description: JSON.stringify(this.blocks),
      displayOrder: this.product.displayOrder,
      audience: this.product.audience
    };

    this.productService.updateProduct(this.productId, payload).pipe(
      finalize(() => {
        this.isSaving = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (res) => {
        this.product = res.data;
      },
      error: (err) => alert('Failed to save draft: ' + (err.error?.message || 'Unknown error'))
    });
  }

  submitForReview() {
    if (!this.product) return;
    this.isSaving = true;
    this.productService.submitProductForReview(this.productId).pipe(
      finalize(() => {
        this.isSaving = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (res) => {
        this.product = res.data;
      },
      error: (err) => alert('Failed to submit for review: ' + (err.error?.message || 'Unknown error'))
    });
  }

  withdrawReview() {
    if (!this.product) return;
    this.isSaving = true;
    this.productService.withdrawReview(this.productId).pipe(
      finalize(() => {
        this.isSaving = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (res) => {
        this.product = res.data;
      },
      error: (err) => alert('Failed to withdraw review')
    });
  }

  preview() {
    this.isPreviewMode = !this.isPreviewMode;
  }
}


