import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminUserService, AdminUserDisplay } from '../../../core/services/admin-user.service';
import { DataTable, TableColumn } from '../../../shared/components/admin/data-table/data-table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule, DataTable],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit, OnDestroy {
  private adminUserService = inject(AdminUserService);

  users: AdminUserDisplay[] = [];
  filteredUsers: AdminUserDisplay[] = [];
  searchQuery: string = '';
  roleFilter: string = 'all';
  statusFilter: string = 'all';
  isLoading: boolean = true;
  private usersSub!: Subscription;

  columns: TableColumn[] = [
    { key: 'fullName', label: 'Name', type: 'text' },
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'role', label: 'Role', type: 'badge' },
    { key: 'status', label: 'Status', type: 'badge' },
    { key: 'lastUpdated', label: 'Last Active', type: 'date' },
    { key: 'actions', label: 'Actions', type: 'actions' }
  ];

  ngOnInit() {
    this.usersSub = this.adminUserService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Users table error:', err);
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
    }
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.applyFilters();
  }

  onRoleFilter(role: string) {
    this.roleFilter = role;
    this.applyFilters();
  }

  onStatusFilter(status: string) {
    this.statusFilter = status;
    this.applyFilters();
  }

  applyFilters() {
    const lowerQuery = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(u => {
      const matchesSearch = !this.searchQuery ||
        u.fullName.toLowerCase().includes(lowerQuery) ||
        u.email.toLowerCase().includes(lowerQuery);
      const matchesRole = this.roleFilter === 'all' || u.role === this.roleFilter;
      const matchesStatus = this.statusFilter === 'all' || u.status === this.statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }

  handleAction(event: { action: string, row: AdminUserDisplay }) {
    if (event.action === 'toggleBlock') {
      const newStatus = event.row.status === 'active' ? 'blocked' : 'active';
      this.adminUserService.updateUserStatus(event.row.id, newStatus).then(() => {
        event.row.status = newStatus;
        this.applyFilters();
      });
    } else if (event.action === 'toggleAdmin') {
      const newRole = event.row.role === 'admin' ? 'user' : 'admin';
      this.adminUserService.updateUserRole(event.row.id, newRole).then(() => {
        event.row.role = newRole;
        this.applyFilters();
      });
    }
  }

  exportCSV() {
    const headers = ['Name', 'Email', 'Role', 'Status', 'Last Active'];
    const rows = this.filteredUsers.map(u => [
      u.fullName,
      u.email,
      u.role,
      u.status,
      new Date(u.lastUpdated).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `resumeai-users-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
