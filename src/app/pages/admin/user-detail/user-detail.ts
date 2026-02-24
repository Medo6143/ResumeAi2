import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminUserService, AdminUserDisplay } from '../../../core/services/admin-user.service';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Component({
    selector: 'app-user-detail',
    imports: [CommonModule],
    templateUrl: './user-detail.html',
    styleUrl: './user-detail.css'
})
export class UserDetail implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private adminUserService = inject(AdminUserService);
    private firestore = inject(Firestore);

    userId: string = '';
    user: AdminUserDisplay | null = null;
    userResumes: any[] = [];
    isLoading = true;

    ngOnInit() {
        this.userId = this.route.snapshot.paramMap.get('id') || '';
        if (!this.userId) {
            this.router.navigate(['/admin/users']);
            return;
        }
        this.loadUserData();
    }

    async loadUserData() {
        try {
            // Get all users and find the one with matching ID
            this.adminUserService.getAllUsers().subscribe(users => {
                this.user = users.find(u => u.id === this.userId) || null;
            });

            // Get user's resumes
            const resumesSnap = await getDocs(collection(this.firestore, `users/${this.userId}/resumes`));
            this.userResumes = resumesSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data() as any
            }));

            this.isLoading = false;
        } catch (err) {
            console.error('[UserDetail] Error loading user:', err);
            this.isLoading = false;
        }
    }

    async toggleRole() {
        if (!this.user) return;
        const newRole = this.user.role === 'admin' ? 'user' : 'admin';
        await this.adminUserService.updateUserRole(this.userId, newRole);
        this.user.role = newRole;
    }

    async toggleStatus() {
        if (!this.user) return;
        const newStatus = this.user.status === 'active' ? 'blocked' : 'active';
        await this.adminUserService.updateUserStatus(this.userId, newStatus);
        this.user.status = newStatus;
    }

    goBack() {
        this.router.navigate(['/admin/users']);
    }
}
