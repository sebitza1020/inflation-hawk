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

    const DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    L.Marker.prototype.options.icon = DefaultIcon;

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
