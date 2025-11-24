import { Component, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  authService = inject(AuthService);
  http = inject(HttpClient);

  login() {
    this.authService.loginWithGoogle();
  }

  logout() {
    this.authService.logout();
  }

  testAddPrice() {
    const priceData = {
      productName: "Cafea Test Angular",
      price: 15.50,
      storeName: "Test Shop",
      city: "Browser"
    };

    this.http.post('http://localhost:8080/prices', priceData).subscribe({
      next: (response) => alert('Success! Pret salvat in DB.'),
      error: (err) => alert('Eroare: ' + err.statusText)
    });
  }
}
