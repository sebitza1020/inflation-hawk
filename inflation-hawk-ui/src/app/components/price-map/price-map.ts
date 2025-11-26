import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { PriceEntry } from '../../models/price.model';

@Component({
  selector: 'app-price-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './price-map.html',
  styleUrl: './price-map.scss',
})
export class PriceMap implements OnChanges {
  @Input() prices: PriceEntry[] = [];

  private map: L.Map | undefined;
  private markers: L.LayerGroup | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.prices && this.prices.length > 0) {
      this.initMap();
      this.addMarkers();
    }
  }

  private initMap(): void {
    if (this.map) return;

    const startLat = 46.0;
    const startLng = 25.0;

    this.map = L.map('map').setView([startLat, startLng], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.markers = L.layerGroup().addTo(this.map);
  }

  private addMarkers(): void {
    if (!this.map || !this.markers) return;

    this.markers.clearLayers();

    this.prices.forEach(p => {
      if (p.latitude && p.longitude) {
        const marker = L.marker([p.latitude, p.longitude]);

        marker.bindPopup(`
          <b>${p.productName}</b><br>
          Preț: ${p.price} RON<br>
          Magazin: ${p.storeName}
        `);

        this.markers?.addLayer(marker);
      }
    });
  }
}
