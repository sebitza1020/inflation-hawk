import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { PriceService } from './services/price.service';
import { PriceEntry } from './models/price.model';
import { AddPriceDialog } from './components/add-price-dialog/add-price-dialog';
import { PriceChart } from './components/price-chart/price-chart';
import { PriceMap } from "./components/price-map/price-map";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    DatePipe,
    MatDialogModule,
    AddPriceDialog,
    PriceChart,
    PriceMap
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  authService = inject(AuthService);
  priceService = inject(PriceService);
  dialog = inject(MatDialog);

  prices: PriceEntry[] = [];

  selectedProductForChart: string | null = null;

  ngOnInit(): void {
    this.loadPrices();
  }

  loadPrices() {
    this.priceService.getPrices().subscribe({
      next: (data) => this.prices = data,
      error: (err) => console.error("Eroare la incarcare: ", err)
    });
  }

  login() {
    this.authService.loginWithGoogle();
  }

  logout() {
    this.authService.logout();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddPriceDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.savePriceToBackend(result);
      }
    });
  }

  savePriceToBackend(data: any) {
    const newPrice: PriceEntry = {
      productName: data.productName,
      price: data.price,
      storeName: data.storeName,
      city: data.city
    };

    this.priceService.addPrice(newPrice).subscribe({
      next: () => {
        this.loadPrices();
      },
      error: (err) => alert("Eroare la salvare: " + err.message)
    });
  }

  selectProduct(productName: string) {
    this.selectedProductForChart = productName;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
