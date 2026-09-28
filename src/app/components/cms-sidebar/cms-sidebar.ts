import { Component, Input, Output, EventEmitter, inject, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CmsService, PageTreeNodeResponse } from '../../core/services/cms.service';

@Component({
  selector: 'app-cms-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cms-sidebar.html',
  styleUrls: ['./cms-sidebar.css']
})
export class CmsSidebar implements OnInit, OnChanges {
  @Input() productId!: string;
  @Input() activePageId: string | null = null;
  
  @Output() pageSelected = new EventEmitter<string>();
  @Output() addSection = new EventEmitter<void>();
  @Output() addPage = new EventEmitter<string>();

  private cmsService = inject(CmsService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  tree: PageTreeNodeResponse[] = [];
  expandedSections: Set<string> = new Set();
  isLoadingTree: boolean = true;
  treeError: string | null = null;
  sectionMenuOpenId: string | null = null;

  ngOnInit() {
    if (this.productId) {
      this.loadTree();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productId'] && !changes['productId'].isFirstChange()) {
      this.loadTree();
    }
  }

  loadTree() {
    this.isLoadingTree = true;
    this.cdr.detectChanges();
    this.cmsService.getPageTree(this.productId).subscribe({
      next: (res) => {
        this.tree = res.data || [];
        this.isLoadingTree = false;
        // Auto-expand all root sections
        this.tree.forEach(node => {
          if (!node.parentId) {
            this.expandedSections.add(node.id);
          }
        });

        // Auto-select first leaf page if none selected
        if (!this.activePageId && this.tree.length > 0) {
          const firstSection = this.tree[0];
          if (firstSection.children && firstSection.children.length > 0) {
            this.activePageId = firstSection.children[0].id;
            this.pageSelected.emit(this.activePageId);
          }
        }

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading tree', err);
        this.treeError = 'Failed to load tree';
        this.isLoadingTree = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggleSection(sectionId: string) {
    if (this.expandedSections.has(sectionId)) {
      this.expandedSections.delete(sectionId);
    } else {
      this.expandedSections.add(sectionId);
    }
  }


  onPageClick(pageId: string) {
    this.pageSelected.emit(pageId);
    // Let the parent component handle navigation or state update
  }

  onAddSection() {
    this.addSection.emit();
  }

  onAddPage(sectionId: string, event: Event) {
    event.stopPropagation();
    this.addPage.emit(sectionId);
  }

  toggleSectionMenu(sectionId: string, event: Event) {
    event.stopPropagation();
    this.sectionMenuOpenId = this.sectionMenuOpenId === sectionId ? null : sectionId;
  }
}
