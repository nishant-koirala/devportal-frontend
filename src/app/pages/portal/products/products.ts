import { Component, OnInit, inject, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AdminProductService } from '../../../core/services/admin-product.service';
import { Product } from '../../../core/services/../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule, DragDropModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private productService = inject(AdminProductService);
  private fb = inject(FormBuilder);

  products = signal<Product[]>([]);
  loading = signal(true);
  error = signal('');

  // Dropdown State
  activeMenuId = signal<string | null>(null);

  @HostListener('document:click')
  onDocumentClick() {
    if (this.activeMenuId()) {
      this.activeMenuId.set(null);
    }
  }

  toggleMenu(productId: string, event: Event) {
    event.stopPropagation();
    if (this.activeMenuId() === productId) {
      this.activeMenuId.set(null);
    } else {
      this.activeMenuId.set(productId);
    }
  }

  // Modal State
  isModalOpen = signal(false);
  submitting = signal(false);
  productForm!: FormGroup;

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
      status: ['DRAFT']
    });
  }

  openModal() {
    this.initForm();
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

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

    this.submitting.set(true);
    this.productService.createProduct(this.productForm.value).subscribe({
      next: (res) => {
        this.submitting.set(false);
        this.closeModal();
        this.loadProducts();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to create product. ' + (err.error?.message || err.message));
        this.submitting.set(false);
      }
    });
  }

  loadProducts() {
    this.loading.set(true);
    this.productService.getProducts(0, 50).subscribe({
      next: (res: any) => {
        const payload = res?.data;
        if (payload && Array.isArray(payload.content)) {
          this.products.set(payload.content);
        } else if (Array.isArray(payload)) {
          this.products.set(payload);
        } else {
          this.products.set([]);
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load products. ' + err.message);
        this.loading.set(false);
      }
    });
  }
}
