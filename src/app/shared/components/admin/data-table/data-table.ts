import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string;
  label: string;
  type: 'text' | 'date' | 'badge' | 'actions';
}

@Component({
  selector: 'app-data-table',
  imports: [CommonModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css'
})
export class DataTable {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() loading: boolean = false;

  @Output() actionClick = new EventEmitter<{ action: string, row: any }>();

  _getProperty(obj: any, path: string): any {
    return path.split('.').reduce((o, p) => (o ? o[p] : ''), obj);
  }

  emitAction(action: string, row: any) {
    this.actionClick.emit({ action, row });
  }
}
