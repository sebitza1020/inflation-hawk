import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductLookupService {
  private http = inject(HttpClient);
  
  // OpenFoodFacts API (Free)
  private readonly API_URL = 'https://world.openfoodfacts.org/api/v0/product/';

  getProductByBarcode(barcode: string): Observable<any> {
    return this.http.get(`${this.API_URL}${barcode}.json`).pipe(
      map((response: any) => {
        if (response.status === 1) {
          // Found the product!
          const p = response.product;
          return {
            found: true,
            name: p.product_name_ro || p.product_name || 'Produs necunoscut',
            brand: p.brands || '',
            image: p.image_front_small_url || null
          };
        } else {
          return { found: false };
        }
      }),
      catchError(err => {
        console.error('Eroare OpenFoodFacts:', err);
        return of({ found: false });
      })
    );
  }
}
