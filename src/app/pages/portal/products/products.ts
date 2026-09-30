import { Component, OnInit, inject, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AdminProductService } from '../../../core/services/admin-product.service';
import { Product } from '../../../core/services/../models/product.model';
import { BlockDto, BlockType } from '../../../core/services/../models/cms.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, DragDropModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private productService = inject(AdminProductService);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  public products: Product[] = [];
  public loading = true;
  public error = '';

  // Dropdown State
  public activeMenuId: string | null = null;

  @HostListener('document:click')
  onDocumentClick() {
    if (this.activeMenuId) {
      this.activeMenuId = null;
    }
  }

  toggleMenu(productId: string, event: Event) {
    event.stopPropagation();
    if (this.activeMenuId === productId) {
      this.activeMenuId = null;
    } else {
      this.activeMenuId = productId;
    }
  }

  // Modal State
  public isModalOpen = false;
  public submitting = false;
  public productForm!: FormGroup;

  ngOnInit() {
    this.initForm();
    this.loadProducts();
  }

  initForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      displayOrder: [1, [Validators.required, Validators.min(0)]],
      audience: ['PUBLIC', Validators.required],
      slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)]],
      shortDescription: [''],
      status: ['DRAFT'] // always draft
    });
  }

  openModal() {
    this.initForm();
    this.isModalOpen = true;
    this.cdr.detectChanges();
  }

  closeModal() {
    this.isModalOpen = false;
    this.cdr.detectChanges();
  }

  // Auto-generate slug from name if user hasn't typed in slug manually
  onNameChange() {
    const nameControl = this.productForm.get('name');
    const slugControl = this.productForm.get('slug');
    if (nameControl && slugControl && !slugControl.dirty) {
      const slug = nameControl.value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      slugControl.setValue(slug);
    }
  }

  createProduct() {
    if (this.productForm.invalid) {
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.submitting = true;
    this.productService.createProduct(this.productForm.value).subscribe({
      next: (res) => {
        this.submitting = false;
        this.closeModal();
        this.loadProducts();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to create product. ' + (err.error?.message || err.message));
        this.submitting = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts(0, 50).subscribe({
      next: (res: any) => {
        const payload = res?.data;
        if (payload && Array.isArray(payload.content)) {
          this.products = payload.content;
        } else if (Array.isArray(payload)) {
          this.products = payload;
        } else {
          this.products = [];
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Failed to load products. ' + err.message;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}


