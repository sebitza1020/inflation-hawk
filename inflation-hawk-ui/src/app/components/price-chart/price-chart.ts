import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Color, ScaleType, NgxChartsModule } from '@swimlane/ngx-charts';
import { PriceEntry } from '../../models/price.model';

@Component({
  selector: 'app-price-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './price-chart.html',
  styleUrl: './price-chart.scss',
})
export class PriceChart implements OnChanges {
  @Input() allPrices: PriceEntry[] = [];
  @Input() selectedProduct: string | null = null;

  chartData: any[] = [];
  productName: string = '';

  view: [number, number] = [700, 300];

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedProduct && this.allPrices) {
      this.processData();
    }
  }

  processData() {
    this.productName = this.selectedProduct || '';

    const filtered = this.allPrices
      .filter(p => p.productName === this.selectedProduct)
      .filter(p => p.createdAt)
      .sort((a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime());

    const seriesData = filtered.map(p => {
      return {
        name: new Date(p.createdAt!).toLocaleDateString('ro-RO'),
        value: p.price
      };
    });

    this.chartData = [
      {
        name: this.selectedProduct,
        series: seriesData
      }
    ];
  }
}
