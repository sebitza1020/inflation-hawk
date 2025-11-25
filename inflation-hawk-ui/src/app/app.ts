import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { PriceService } from './services/price.service';
import { PriceEntry } from './models/price.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  authService = inject(AuthService);
  priceService = inject(PriceService);

  prices: PriceEntry[] = [];

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

  addTestPrice() {
    const newPrice: PriceEntry = {
      productName: "Paine Neagra",
      price: 4.50 + Math.random(), // Random price to see the difference
      storeName: "Lidl",
      city: "Sibiu"
    };

    this.priceService.addPrice(newPrice).subscribe({
      next: () => {
        this.loadPrices(); // Reload the list after adding
      },
      error: (err) => alert("Eroare la salvare!")
    });
  }
}
