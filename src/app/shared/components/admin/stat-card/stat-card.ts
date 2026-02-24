import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  imports: [CommonModule],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css'
})
export class StatCard {
  @Input() title: string = '';
  @Input() value: number | null = 0;
  @Input() icon: 'users' | 'activity' | 'calendar' | 'document' = 'activity';
  @Input() colorClass: string = 'text-blue-400';
}
