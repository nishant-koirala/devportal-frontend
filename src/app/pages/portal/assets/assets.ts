import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Asset {
  id: string;
  name: string;
  platform: string;
  kind: string;
}

@Component({
  selector: 'app-assets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assets.html',
  styleUrl: './assets.css'
})
export class Assets implements OnInit {
  assets: Asset[] = [
    { id: '1', name: 'Fonebiz', platform: 'Web', kind: 'App' },
    { id: '2', name: 'Fonebiz by Fonepay (Android)', platform: 'Android', kind: 'App' },
    { id: '3', name: 'Fonebiz by Fonepay (iOS)', platform: 'iOS', kind: 'App' },
    { id: '4', name: 'Fonepay App (Android)', platform: 'Android', kind: 'App' },
    { id: '5', name: 'Fonepay App (iOS)', platform: 'iOS', kind: 'App' }
  ];

  isAssetModalOpen = false;
  isDeleteModalOpen = false;
  
  modalMode: 'new' | 'edit' = 'new';
  
  newAssetName = '';
  newAssetPlatform = 'iOS';
  newAssetKind = 'App';
  newAssetDescription = '';

  activeMenuId: string | null = null;
  assetToDelete: Asset | null = null;

  ngOnInit() {
  }

  get hasAssets() {
    return this.assets.length > 0;
  }

  openNewAssetModal() {
    this.modalMode = 'new';
    this.newAssetName = '';
    this.newAssetPlatform = 'iOS';
    this.newAssetKind = 'App';
    this.newAssetDescription = '';
    this.isAssetModalOpen = true;
  }

  openEditAssetModal(asset: Asset) {
    this.modalMode = 'edit';
    this.newAssetName = asset.name;
    this.newAssetPlatform = asset.platform;
    this.newAssetKind = asset.kind;
    this.newAssetDescription = '';
    this.isAssetModalOpen = true;
    this.closeMenu();
  }

  closeAssetModal() {
    this.isAssetModalOpen = false;
  }

  saveAsset() {
    if (this.newAssetName) {
      if (this.modalMode === 'new') {
        this.assets.push({
          id: Date.now().toString(),
          name: this.newAssetName,
          platform: this.newAssetPlatform,
          kind: this.newAssetKind
        });
      } else {
        const index = this.assets.findIndex(a => a.name === this.newAssetName || a.platform === this.newAssetPlatform);
        if (index > -1) {
            this.assets[index].name = this.newAssetName;
            this.assets[index].platform = this.newAssetPlatform;
            this.assets[index].kind = this.newAssetKind;
        }
      }
      this.closeAssetModal();
    }
  }

  openDeleteModal(asset: Asset) {
    this.assetToDelete = asset;
    this.isDeleteModalOpen = true;
    this.closeMenu();
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.assetToDelete = null;
  }

  confirmDelete() {
    if (this.assetToDelete) {
      this.assets = this.assets.filter(a => a.id !== this.assetToDelete!.id);
      this.closeDeleteModal();
    }
  }

  toggleMenu(id: string, event: Event) {
    event.stopPropagation();
    if (this.activeMenuId === id) {
      this.activeMenuId = null;
    } else {
      this.activeMenuId = id;
    }
  }

  closeMenu() {
    this.activeMenuId = null;
  }
}
