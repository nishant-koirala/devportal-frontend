export type BlockType = 'HEADING' | 'PARAGRAPH' | 'CODE' | 'ENDPOINT' | 'FAQ' | 'TABLE' | 'IMAGE' | 'NOTE_WARNING' | 'PARAMETER_TABLE' | 'TEST_CREDENTIAL' | 'FEATURE_GRID';

export interface BlockDto {
  id?: string;
  type: BlockType;
  order: number;
  data: any;
}

export interface PageMetaResponse {
  id: string;
  version: number;
  productId: string;
  parentId: string | null;
  pageOrder: number;
  title: string;
  slug: string;
  status: 'DRAFT' | 'IN_REVIEW' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastPublishedAt?: string;
  reviewNotes?: string;
  draftBlocks?: BlockDto[];
  publishedBlocks?: BlockDto[];
}

export interface PageTreeNodeResponse {
  id: string;
  parentId: string | null;
  title: string;
  slug: string;
  status: string;
  pageOrder: number;
  children: PageTreeNodeResponse[];
}

export interface CreatePageRequest {
  title: string;
  slug: string;
  parentId?: string | null;
}

export interface SavePageRequest {
  title: string;
  slug: string;
  version: number;
  draftBlocks: BlockDto[];
  commitMessage?: string;
  relatedPageIds?: string[];
}

export interface PageRevision {
  id: string;
  published?: boolean;
  commitMessage?: string;
  version: number;
  createdAt: string;
  createdBy: string;
}


