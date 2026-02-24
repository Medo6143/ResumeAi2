import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService, DashboardStats, TemplateUsage } from '../../../core/services/analytics.service';
import { StatCard } from '../../../shared/components/admin/stat-card/stat-card';
import { Observable } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-overview',
  imports: [CommonModule, StatCard, BaseChartDirective],
  templateUrl: './overview.html',
  styleUrl: './overview.css'
})
export class Overview implements OnInit {
  private analyticsService = inject(AnalyticsService);

  stats$!: Observable<DashboardStats>;
  topTemplates$!: Observable<TemplateUsage[]>;
  isLoading = signal(true);

  // Line Chart Configuration (User Activity Trends)
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Active Users',
        fill: true,
        tension: 0.4,
        borderColor: '#818cf8',
        backgroundColor: 'rgba(129, 140, 248, 0.15)',
        pointBackgroundColor: '#818cf8',
        pointBorderColor: '#818cf8',
        pointRadius: 4,
        borderWidth: 2
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8' }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8' },
        beginAtZero: true
      }
    }
  };

  // Doughnut Chart Configuration (Template Popularity)
  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#818cf8', '#34d399', '#f472b6', '#fbbf24', '#60a5fa',
          '#a78bfa', '#fb923c', '#4ade80', '#f87171', '#38bdf8',
          '#c084fc', '#facc15', '#2dd4bf', '#e879f9', '#22d3ee'
        ],
        borderColor: '#0f172a',
        borderWidth: 2
      }
    ]
  };

  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#94a3b8',
          font: { size: 11 },
          padding: 8,
          boxWidth: 12
        }
      }
    },
    cutout: '65%'
  };

  ngOnInit() {
    this.stats$ = this.analyticsService.getDashboardStats();
    this.topTemplates$ = this.analyticsService.getMostUsedTemplates();

    // Load line chart data
    this.analyticsService.getUsageTrends().subscribe(trends => {
      this.lineChartData.labels = trends.map(t => t.date);
      this.lineChartData.datasets[0].data = trends.map(t => t.uses);
      this.lineChartData = { ...this.lineChartData };
    });

    // Load donut chart data from template usage
    this.topTemplates$.subscribe(templates => {
      // Only show templates with > 0 uses for the donut, or top 10 if all have data
      const forChart = templates.filter(t => t.uses > 0).slice(0, 15);
      if (forChart.length > 0) {
        this.doughnutChartData.labels = forChart.map(t => t.templateId.toUpperCase());
        this.doughnutChartData.datasets[0].data = forChart.map(t => t.uses);
      } else {
        // Show top 5 templates even if 0 for visual
        const top5 = templates.slice(0, 5);
        this.doughnutChartData.labels = top5.map(t => t.templateId.toUpperCase());
        this.doughnutChartData.datasets[0].data = top5.map(t => t.uses || 1);
      }
      this.doughnutChartData = { ...this.doughnutChartData };
      this.isLoading.set(false);
    });
  }
}
