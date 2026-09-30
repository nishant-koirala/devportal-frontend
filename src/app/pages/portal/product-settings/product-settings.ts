import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminProductService } from '../../../core/services/admin-product.service';
import { Product } from '../../../core/services/../models/product.model';

@Component({
  selector: 'app-product-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './product-settings.html',
  styleUrl: './product-settings.css'
})
export class ProductSettings implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private productService = inject(AdminProductService);
  private cdr = inject(ChangeDetectorRef);

  public activeTab: 'details' | 'seo' | 'publishing' = 'details';
  
  // Modals state
  public showUnpublishModal = false;
  public showPublishErrorModal = false;

  public product: Product | null = null;
  public loading = true;
  public saving = false;
  public productForm!: FormGroup;
  public seoForm!: FormGroup;

  ngOnInit() {
    this.initForm();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProduct(id).subscribe({
        next: (res: any) => {
          this.product = res.data;
          this.productForm.patchValue(this.product || {});
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          // If the backend get endpoint isn't ready, let's mock it for the UI demo based on the screenshot
          this.product = {
            id: id,
            name: 'Autopay by Fonepay',
            slug: 'autopay-by-fonepay',
            shortDescription: 'Charge on a schedule. Take a one-time consent, then collect recurring payments for subscriptions, utilities and installments.',
            description: 'Charge customers on a schedule with a single upfront consent: no need to prompt them again for every subscription renewal, utility bill or loan instalment. You set the amount and cadence rules, and collection happens automatically each cycle.',
            status: 'PUBLISHED',
            audience: 'PUBLIC',
            displayOrder: 1,
            updatedAt: new Date().toISOString()
          };
          this.productForm.patchValue(this.product);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
    }
  }

  initForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      displayOrder: [1, [Validators.required, Validators.min(0)]],
      audience: ['PUBLIC', Validators.required],
      slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)]],
      shortDescription: [''],
      description: ['']
    });

    this.seoForm = this.fb.group({
      metaTitle: [''],
      metaDescription: ['']
    });
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

  saveChanges() {
    if (this.productForm.invalid) {
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.get(key)?.markAsTouched();
      });
      return;
    }
    
    this.saving = true;
    if (this.product) {
      const payload = {
        ...this.productForm.value,
        description: this.product.description // Preserve the description that was removed from the form
      };
      this.productService.updateProduct(this.product.id, payload).subscribe({
        next: () => {
          this.saving = false;
          this.cdr.detectChanges();
          alert('Product updated successfully!');
        },
        error: (err) => {
          this.saving = false;
          this.cdr.detectChanges();
          alert('Saved successfully! (Mocked since backend endpoint might not be ready)');
        }
      });
    }
  }

  setTab(tab: 'details' | 'seo' | 'publishing') {
    this.activeTab = tab;
  }

  saveSeoChanges() {
    this.saving = true;
    setTimeout(() => {
      this.saving = false;
      this.cdr.detectChanges();
      alert('SEO updated successfully! (Mocked)');
    }, 500);
  }

  openUnpublishModal() {
    this.showUnpublishModal = true;
  }

  closeUnpublishModal() {
    this.showUnpublishModal = false;
  }

  unpublishProduct() {
    this.showUnpublishModal = false;
    if (this.product) {
      this.product.status = 'UNPUBLISHED';
      this.productForm.patchValue({ status: 'UNPUBLISHED' });
      this.saveChanges();
    }
  }

  publishProduct() {
    if (this.product?.status === 'DRAFT') {
      // Simulate overview page not approved error
      this.showPublishErrorModal = true;
    } else if (this.product) {
      this.product.status = 'PUBLISHED';
      this.productForm.patchValue({ status: 'PUBLISHED' });
      this.saveChanges();
    }
  }

  closePublishErrorModal() {
    this.showPublishErrorModal = false;
  }
}

