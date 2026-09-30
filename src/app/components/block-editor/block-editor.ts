import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BlockDto, BlockType } from '../../core/services/../models/cms.model';

@Component({
  selector: 'app-block-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './block-editor.html',
  styleUrl: './block-editor.css'
})
export class BlockEditor {
  @Input() blocks: BlockDto[] = [];
  @Input() isLocked: boolean = false;
  @Output() blocksChange = new EventEmitter<BlockDto[]>();

  selectedBlockIndex: number | null = null;
  isBlockPickerOpen: boolean = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.isBlockPickerOpen = false;
  }

  toggleBlockPicker(event: Event) {
    event.stopPropagation();
    if (this.isLocked) return;
    this.isBlockPickerOpen = !this.isBlockPickerOpen;
  }

  addBlock(type: BlockType) {
    if (this.isLocked) return;
    
    let defaultData: any = {};
    switch (type) {
      case 'PARAGRAPH': defaultData = { text: '' }; break;
      case 'HEADING': defaultData = { text: '' }; break;
      case 'NOTE_WARNING': defaultData = { title: '', message: '' }; break;
      case 'CODE': defaultData = { language: 'json', code: '' }; break;
      case 'TABLE': defaultData = { 
        headers: ['Column 1', 'Column 2'],
        rows: [['', ''], ['', '']]
      }; break;
      case 'PARAMETER_TABLE': defaultData = { parameters: [] }; break;
      case 'ENDPOINT': defaultData = { method: 'GET', path: '', isPlainJson: false, noBearerRequired: false }; break;
      case 'FEATURE_GRID': defaultData = { 
        title: '', subtitle: '', 
        cards: [
          { title: 'Feature 1', description: '' },
          { title: 'Feature 2', description: '' },
          { title: 'Feature 3', description: '' }
        ]
      }; break;
    }

    const newBlock: BlockDto = {
      id: 'temp-' + Math.random().toString(36).substr(2, 9),
      type: type,
      data: defaultData,
      order: this.blocks.length
    };
    
    this.blocks.push(newBlock);
    this.selectedBlockIndex = this.blocks.length - 1;
    this.isBlockPickerOpen = false;
    this.emitChange();
  }

  selectBlock(index: number) {
    if (this.isLocked) return;
    this.selectedBlockIndex = index;
  }

  removeBlock(index: number) {
    if (this.isLocked) return;
    this.blocks.splice(index, 1);
    this.reorderBlocks();
    if (this.selectedBlockIndex === index) {
      this.selectedBlockIndex = null;
    } else if (this.selectedBlockIndex !== null && this.selectedBlockIndex > index) {
      this.selectedBlockIndex--;
    }
    this.emitChange();
  }

  dropBlock(event: CdkDragDrop<string[]>) {
    if (this.isLocked) return;
    moveItemInArray(this.blocks, event.previousIndex, event.currentIndex);
    if (this.selectedBlockIndex === event.previousIndex) {
      this.selectedBlockIndex = event.currentIndex;
    } else if (this.selectedBlockIndex !== null) {
      if (this.selectedBlockIndex > event.previousIndex && this.selectedBlockIndex <= event.currentIndex) {
        this.selectedBlockIndex--;
      } else if (this.selectedBlockIndex < event.previousIndex && this.selectedBlockIndex >= event.currentIndex) {
        this.selectedBlockIndex++;
      }
    }
    this.reorderBlocks();
    this.emitChange();
  }

  private reorderBlocks() {
    this.blocks.forEach((block, index) => {
      block.order = index;
    });
  }

  private emitChange() {
    this.blocksChange.emit(this.blocks);
  }

  // Parameter table helpers
  addParameterToBlock(block: BlockDto) {
    if (!block.data.parameters) block.data.parameters = [];
    block.data.parameters.push({
      name: '', type: 'String', required: true, description: ''
    });
    this.emitChange();
  }
  removeParameterFromBlock(block: BlockDto, pIdx: number) {
    block.data.parameters.splice(pIdx, 1);
    this.emitChange();
  }

  // Generic table helpers
  addColumnToBlock(block: BlockDto) {
    block.data.headers.push('New Column');
    block.data.rows.forEach((row: any[]) => row.push(''));
    this.emitChange();
  }
  removeColumnFromBlock(block: BlockDto, colIdx: number) {
    block.data.headers.splice(colIdx, 1);
    block.data.rows.forEach((row: any[]) => row.splice(colIdx, 1));
    this.emitChange();
  }
  addRowToBlock(block: BlockDto) {
    const newRow = new Array(block.data.headers.length).fill('');
    block.data.rows.push(newRow);
    this.emitChange();
  }
  removeRowFromBlock(block: BlockDto, rowIdx: number) {
    block.data.rows.splice(rowIdx, 1);
    this.emitChange();
  }
  
  // Feature grid helpers
  addCardToBlock(block: BlockDto) {
    if (!block.data.cards) block.data.cards = [];
    block.data.cards.push({ title: 'New Feature', description: '' });
    this.emitChange();
  }
  removeCardFromBlock(block: BlockDto, idx: number) {
    block.data.cards.splice(idx, 1);
    this.emitChange();
  }

  trackByIndex(index: number): number {
    return index;
  }
}

