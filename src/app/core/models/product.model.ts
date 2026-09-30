export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description?: string;
  status: string;
  audience: string;
  displayOrder?: number;
  updatedAt: string;
  reviewNotes?: string;
  submittedBy?: string;
  reviewedBy?: string;
  submittedAt?: string;
  reviewedAt?: string;
}
