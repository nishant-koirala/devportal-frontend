import { Component, HostListener, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuditLogService, AuditLogEntry } from '../../../core/services/audit-log.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export interface BackendAuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  targetId: string;
  targetType: string;
  sourceIp: string;
  details: string;
  timestamp: string;
}

@Component({
  selector: 'app-audit-log',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './audit-log.html',
  styleUrl: './audit-log.css',
})
export class AuditLog implements OnInit {
  private auditLogService = inject(AuditLogService);
  private cdr = inject(ChangeDetectorRef);

  searchQuery: string = '';
  private searchSubject = new Subject<string>();

  actorFilter: string = 'All actors';
  actionFilter: string = 'All actions';
  
  isActorDropdownOpen: boolean = false;
  isActionDropdownOpen: boolean = false;

  actors: string[] = ['All actors', 'Sujata Maharjan', 'Bibek Rana', 'Rojina Shakya', 'Kiran Adhikari', 'Anjali Gurung', 'Rajesh KC'];
  actions: string[] = ['All actions', 'Logged in', 'Requested access', 'Created', 'Deleted', 'Sent announcement', 'Edited role profile', 'Changed configuration', 'Rejected', 'Granted access'];

  logs: AuditLogEntry[] = [];
  isLoading: boolean = true;
  
  currentPage: number = 0;
  totalPages: number = 1;
  totalElements: number = 0;
  pageSize: number = 10;

  ngOnInit() {
    this.loadLogs();

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.currentPage = 0;
      this.loadLogs();
    });
  }

  loadLogs() {
    this.isLoading = true;
    this.auditLogService.getAuditLogs(
      this.currentPage,
      this.pageSize,
      this.searchQuery,
      this.actorFilter,
      this.actionFilter
    ).subscribe({
      next: (res: any) => {
        try {
          if (res.success && res.data) {
            const backendLogs: BackendAuditLog[] = res.data.content || [];
            
            this.logs = backendLogs.map(log => {
              // Format action (e.g., CREATE_PRODUCT -> Create product)
              let formattedAction = log.action ? log.action.replace(/_/g, ' ').toLowerCase() : '';
              if (formattedAction.length > 0) {
                formattedAction = formattedAction.charAt(0).toUpperCase() + formattedAction.slice(1);
              }

              // Format date relative to now
              const logDate = log.timestamp ? new Date(log.timestamp) : new Date();
              const now = new Date();
              const diffInHours = Math.floor((now.getTime() - logDate.getTime()) / (1000 * 60 * 60));
              const diffInDays = Math.floor(diffInHours / 24);
              
              let dateStr = '';
              if (diffInDays > 0) {
                dateStr = `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
              } else if (diffInHours > 0) {
                dateStr = `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
              } else {
                dateStr = 'Just now';
              }
              
              // Format time HH:MM
              const timeStr = logDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              dateStr += `, ${timeStr}`;

              return {
                actor: log.adminName || log.adminId || 'System',
                action: formattedAction,
                resource: log.targetType ? `${log.targetType}: ${log.targetId}` : log.targetId,
                date: dateStr,
                details: log.details || '—'
              };
            });

            this.totalElements = res.data.totalElements || 0;
            this.totalPages = res.data.totalPages || 0;
          }
        } catch (err) {
          console.error('Error processing audit logs:', err);
        } finally {
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.error('Failed to load audit logs', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSearchChange(value: string) {
    this.searchQuery = value;
    this.searchSubject.next(value);
  }

  get filteredLogs(): AuditLogEntry[] {
    return this.logs;
  }

  toggleActorDropdown(event: Event) {
    event.stopPropagation();
    this.isActorDropdownOpen = !this.isActorDropdownOpen;
    this.isActionDropdownOpen = false;
  }

  toggleActionDropdown(event: Event) {
    event.stopPropagation();
    this.isActionDropdownOpen = !this.isActionDropdownOpen;
    this.isActorDropdownOpen = false;
  }

  selectActor(actor: string) {
    this.actorFilter = actor;
    this.isActorDropdownOpen = false;
    this.currentPage = 0;
    this.loadLogs();
  }

  selectAction(action: string) {
    this.actionFilter = action;
    this.isActionDropdownOpen = false;
    this.currentPage = 0;
    this.loadLogs();
  }

  clearSearch() {
    this.searchQuery = '';
    this.actorFilter = 'All actors';
    this.actionFilter = 'All actions';
    this.currentPage = 0;
    this.loadLogs();
  }

  exportCsv() {
    this.auditLogService.exportAuditLogs(this.searchQuery, this.actorFilter, this.actionFilter);
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadLogs();
    }
  }

  getPageNumbers(): number[] {
    const pages = [];
    for (let i = 0; i < this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.isActorDropdownOpen = false;
    this.isActionDropdownOpen = false;
  }
}
