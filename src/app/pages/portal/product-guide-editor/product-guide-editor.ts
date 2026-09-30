import { Component, inject, OnInit, ChangeDetectorRef, HostListener, ViewChild, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CmsService } from '../../../core/services/cms.service';
import { PageTreeNodeResponse, PageMetaResponse, BlockDto, BlockType, PageRevision } from '../../../core/models/cms.model';
import { AdminProductService } from '../../../core/services/admin-product.service';
import { Product } from '../../../core/services/../models/product.model';
import { CmsSidebar } from '../../../components/cms-sidebar/cms-sidebar';
import { EditorHeader } from '../../../components/editor-header/editor-header';

@Component({
  selector: 'app-product-guide-editor',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DragDropModule, CmsSidebar, EditorHeader],
  templateUrl: './product-guide-editor.html',
  styleUrls: ['./product-guide-editor.css']
})
export class ProductGuideEditor implements OnInit {
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private cmsService = inject(CmsService);
  private productService = inject(AdminProductService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  @ViewChild(CmsSidebar) sidebar!: CmsSidebar;

  productId: string = '';
  product: Product | null = null;
  
  activePageId: string | null = null;

  // Create Modal state
  isCreateModalOpen: boolean = false;
  modalContext: 'section' | 'page' = 'section';
  targetSectionId: string | null = null;
  newTitle: string = '';
  newSlug: string = '';
  isCreating: boolean = false;

  // Menu and Page State
  productMenuOpen: boolean = false;
  sectionMenuOpenId: string | null = null;
  pageMenuOpen: boolean = false;
  pageState: 'draft' | 'in_review' | 'needs_changes' | 'published' | 'unpublished' = 'draft';

  // Editor State
  activePageMeta: PageMetaResponse | null = null;
  pageBlocks: BlockDto[] = [];
  selectedBlockIndex: number | null = null;
  isSaving: boolean = false;
  isBlockPickerOpen: boolean = false;

  // Drawers
  isSettingsDrawerOpen: boolean = false;
  isRevisionDrawerOpen: boolean = false;
  revisions: PageRevision[] = [];
  isLoadingRevisions: boolean = false;



  isDeleteModalOpen: boolean = false;
  isUnpublishModalOpen: boolean = false;

  openDeleteModal() {
    this.isDeleteModalOpen = true;
    this.pageMenuOpen = false;
  }
  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  openUnpublishModal() {
    this.isUnpublishModalOpen = true;
    this.pageMenuOpen = false;
  }
  closeUnpublishModal() {
    this.isUnpublishModalOpen = false;
  }

  previewPage() {
    this.router.navigate(['/portal/products', this.productId, 'overview']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.productMenuOpen = false;
    this.sectionMenuOpenId = null;
    this.pageMenuOpen = false;
    this.isBlockPickerOpen = false;
  }

  toggleBlockPicker(event: Event) {
    event.stopPropagation();
    this.isBlockPickerOpen = !this.isBlockPickerOpen;
  }

  toggleProductMenu(event: Event) {
    event.stopPropagation();
    this.productMenuOpen = !this.productMenuOpen;
    this.sectionMenuOpenId = null;
    this.pageMenuOpen = false;
  }

  toggleSectionMenu(sectionId: string, event: Event) {
    event.stopPropagation();
    this.sectionMenuOpenId = this.sectionMenuOpenId === sectionId ? null : sectionId;
    this.productMenuOpen = false;
    this.pageMenuOpen = false;
  }

  togglePageMenu(event: Event) {
    event.stopPropagation();
    this.pageMenuOpen = !this.pageMenuOpen;
    this.productMenuOpen = false;
    this.sectionMenuOpenId = null;
  }

  ngOnInit() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
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
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading product', err);
        this.cdr.detectChanges();
      }
    });
  }



  selectPage(pageId: string) {
    this.activePageId = pageId;
    this.selectedBlockIndex = null;
    this.loadActivePage();
  }

  loadActivePage() {
    if (!this.activePageId) return;
    this.cmsService.getPage(this.activePageId).subscribe({
      next: (res) => {
        this.activePageMeta = res.data;
        // Map backend status to UI state
        if (this.activePageMeta.status === 'PUBLISHED') {
          this.pageState = 'published';
        } else if (this.activePageMeta.status === 'IN_REVIEW') {
          this.pageState = 'in_review';
        } else {
          this.pageState = 'draft';
        }
        
        this.pageBlocks = res.data.draftBlocks || res.data.publishedBlocks || [];
        this.pageBlocks.sort((a, b) => (a.order || 0) - (b.order || 0));
        
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load page', err);
      }
    });
  }

  dropBlock(event: CdkDragDrop<BlockDto[]>) {
    moveItemInArray(this.pageBlocks, event.previousIndex, event.currentIndex);
    this.pageBlocks.forEach((block, index) => {
      block.order = index;
    });
    if (this.selectedBlockIndex === event.previousIndex) {
      this.selectedBlockIndex = event.currentIndex;
    }
  }

  selectBlock(index: number) {
    this.selectedBlockIndex = index;
  }

  addBlock(type: BlockType) {
    const newBlock: BlockDto = {
      type: type,
      order: this.pageBlocks.length,
      data: this.getDefaultDataForType(type)
    };
    this.pageBlocks.push(newBlock);
  }

  removeBlock(index: number) {
    this.pageBlocks.splice(index, 1);
    this.pageBlocks.forEach((block, idx) => {
      block.order = idx;
    });
  }

  addParameterToBlock(block: BlockDto) {
    if (!block.data['parameters']) block.data['parameters'] = [];
    (block.data['parameters'] as unknown[]).push({ name: '', type: '', description: '', required: true });
  }

  removeParameterFromBlock(block: BlockDto, index: number) {
    if (block.data['parameters']) {
      (block.data['parameters'] as unknown[]).splice(index, 1);
    }
  }

  getDefaultDataForType(type: BlockType): Record<string, unknown> {
    switch(type) {
      case 'PARAGRAPH': return { text: '' };
      case 'HEADING': return { text: '', level: 2 };
      case 'CODE': return { code: '', language: 'json' };
      case 'ENDPOINT': return { method: 'GET', path: '', isPlainJson: true, noBearerRequired: true };
      case 'PARAMETER_TABLE': return { parameters: [] };
      case 'NOTE_WARNING': return { title: '', message: '', type: 'INFO' };
      case 'TABLE': return { headers: ['Column 1', 'Column 2'], rows: [['', ''], ['', '']] };
      case 'IMAGE': return { url: '', caption: '' };
      case 'FAQ': return { question: '', answer: '' };
      case 'TEST_CREDENTIAL': return { title: '', details: '' };
      default: return {};
    }
  }

  addTableRow(block: BlockDto) {
    if (!block.data['rows']) block.data['rows'] = [];
    const colCount = (block.data['headers'] as string[])?.length || 1;
    const newRow = Array(colCount).fill('');
    (block.data['rows'] as string[][]).push(newRow);
  }

  removeTableRow(block: BlockDto, rowIndex: number) {
    if (block.data['rows']) {
      (block.data['rows'] as string[][]).splice(rowIndex, 1);
    }
  }

  addTableColumn(block: BlockDto) {
    if (!block.data['headers']) block.data['headers'] = [];
    (block.data['headers'] as string[]).push('New Column');
    if (block.data['rows']) {
      (block.data['rows'] as string[][]).forEach((row: string[]) => row.push(''));
    }
  }

  removeTableColumn(block: BlockDto, colIndex: number) {
    if (block.data['headers']) {
      (block.data['headers'] as string[]).splice(colIndex, 1);
    }
    if (block.data['rows']) {
      (block.data['rows'] as string[][]).forEach((row: string[]) => row.splice(colIndex, 1));
    }
  }

  trackByIndex(index: number, obj: unknown): number {
    return index;
  }

  saveDraft() {
    if (!this.activePageMeta) return;
    this.isSaving = true;

    const payload = {
      title: this.activePageMeta.title,
      slug: this.activePageMeta.slug,
      version: this.activePageMeta.version,
      draftBlocks: this.pageBlocks,
      commitMessage: 'Saved draft via UI'
    };

    this.cmsService.savePage(this.activePageMeta.id, payload).pipe(
      finalize(() => {
        this.isSaving = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (res) => {
        this.activePageMeta = res.data;
        this.pageBlocks = res.data.draftBlocks || [];
        this.pageBlocks.sort((a, b) => (a.order || 0) - (b.order || 0));
      },
      error: (err) => {
        console.error('Failed to save draft', err);
        alert('Failed to save draft: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }
  submitForReview() {
    if (!this.activePageMeta) return;
    this.isSaving = true;
    this.cmsService.submitForReview(this.activePageMeta.id).pipe(
      finalize(() => {
        this.isSaving = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (res) => {
        this.activePageMeta = res.data;
        this.pageState = (res.data.status?.toLowerCase() as 'draft' | 'in_review' | 'needs_changes' | 'published' | 'unpublished') || 'in_review';
        alert('Submitted for review successfully.');
      },
      error: (err) => {
        console.error('Failed to submit for review', err);
        alert('Failed to submit: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }

  publishPage() {
    if (!this.activePageMeta) return;
    this.isSaving = true;
    this.cmsService.publishPage(this.activePageMeta.id).pipe(
      finalize(() => {
        this.isSaving = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (res) => {
        this.activePageMeta = res.data;
        this.pageState = (res.data.status?.toLowerCase() as 'draft' | 'in_review' | 'needs_changes' | 'published' | 'unpublished') || 'published';
        alert('Published successfully.');
      },
      error: (err) => {
        console.error('Failed to publish', err);
        alert('Failed to publish: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }

  openCreateSectionModal() {
    this.modalContext = 'section';
    this.targetSectionId = null;
    this.newTitle = '';
    this.newSlug = '';
    this.isCreateModalOpen = true;
  }

  openCreatePageModal(sectionId: string) {
    this.modalContext = 'page';
    this.targetSectionId = sectionId;
    this.newTitle = '';
    this.newSlug = '';
    this.isCreateModalOpen = true;
  }

  closeCreateModal() {
    this.isCreateModalOpen = false;
  }

  onTitleChange() {
    // Basic auto-slug generator
    if (!this.newSlug || this.newSlug.trim() === '' || this.newTitle.length > 0) {
      this.newSlug = this.newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
  }

  submitCreate() {
    if (!this.newTitle || !this.newSlug) return;
    
    this.isCreating = true;
    const request = {
      title: this.newTitle,
      slug: this.newSlug,
      type: 'OVERVIEW',
      parentId: this.modalContext === 'page' ? this.targetSectionId : null
    };

    this.cmsService.createPage(this.productId, request)
      .pipe(
        finalize(() => {
          this.isCreating = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (res) => {
          this.closeCreateModal();
          this.sidebar.loadTree(); // Reload the tree to show the new section/page
          if (this.modalContext === 'page' && res.data) {
             this.activePageId = res.data.id;
             this.sidebar.expandedSections.add(this.targetSectionId!);
          }
        },
        error: (err) => {
          console.error('Failed to create', err);
          let errorMsg = 'Failed to create. Ensure the slug is unique and valid.';
          if (err.error && err.error.message) {
            errorMsg = err.error.message;
          }
          alert(errorMsg);
        }
      });
  }
  openSettingsDrawer() {
    this.isSettingsDrawerOpen = true;
    this.pageMenuOpen = false;
  }

  closeSettingsDrawer() {
    this.isSettingsDrawerOpen = false;
  }

  openRevisionDrawer() {
    this.isRevisionDrawerOpen = true;
    this.pageMenuOpen = false;
    this.loadRevisions();
  }

  closeRevisionDrawer() {
    this.isRevisionDrawerOpen = false;
  }

  loadRevisions() {
    if (!this.activePageId) return;
    this.isLoadingRevisions = true;
    this.cmsService.getPageRevisions(this.activePageId).pipe(
      finalize(() => {
        this.isLoadingRevisions = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: (res) => {
        this.revisions = res.data;
      },
      error: (err) => console.error('Failed to load revisions', err)
    });
  }

  restoreRevision(versionNumber: number) {
    if (!this.activePageId) return;
    if (confirm('Are you sure you want to restore this revision? Your current draft will be overwritten.')) {
      this.cmsService.restoreRevision(this.activePageId, versionNumber).subscribe({
        next: () => {
          this.loadActivePage();
          this.closeRevisionDrawer();
        },
        error: (err) => alert('Failed to restore revision')
      });
    }
  }

  confirmDeletePage() {
    if (!this.activePageId) return;
    this.isSaving = true;
    this.cmsService.deletePage(this.activePageId).pipe(
      finalize(() => {
        this.isSaving = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: () => {
        this.closeDeleteModal();
        this.activePageId = null;
        this.activePageMeta = null;
        this.sidebar.loadTree();
      },
      error: (err) => {
        console.error('Failed to delete page', err);
        alert('Failed to delete page: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }

  confirmUnpublishPage() {
    if (!this.activePageId) return;
    this.isSaving = true;
    this.cmsService.unpublishPage(this.activePageId).pipe(
      finalize(() => {
        this.isSaving = false;
        this.cdr.detectChanges();
      })
    ).subscribe({
      next: () => {
        this.closeUnpublishModal();
        this.loadActivePage();
        this.sidebar.loadTree();
      },
      error: (err) => {
        console.error('Failed to unpublish page', err);
        alert('Failed to unpublish page: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }
}




