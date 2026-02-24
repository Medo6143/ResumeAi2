import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivityLogService, ActivityEvent } from '../../../core/services/activity-log.service';

@Component({
    selector: 'app-activity-log',
    imports: [CommonModule, FormsModule],
    templateUrl: './activity-log.html',
    styleUrl: './activity-log.css'
})
export class ActivityLog implements OnInit {
    private activityService = inject(ActivityLogService);

    logs: ActivityEvent[] = [];
    filteredLogs: ActivityEvent[] = [];
    typeFilter: string = 'all';
    isLoading = true;

    ngOnInit() {
        this.activityService.getRecentLogs(100).subscribe(logs => {
            this.logs = logs;
            this.filteredLogs = [...logs];
            this.isLoading = false;
        });
    }

    onTypeFilter(type: string) {
        this.typeFilter = type;
        if (type === 'all') {
            this.filteredLogs = [...this.logs];
        } else {
            this.filteredLogs = this.logs.filter(l => l.type === type);
        }
    }

    getEventMeta(type: string) {
        return ActivityLogService.getEventMeta(type);
    }

    getRelativeTime(timestamp: number): string {
        const diff = Date.now() - timestamp;
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return 'Just now';
        if (mins < 60) return `${mins}m ago`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    }
}
