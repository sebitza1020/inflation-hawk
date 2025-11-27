import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PriceEntry } from '../models/price.model';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/prices`;

  getPrices(): Observable<PriceEntry[]> {
    return this.http.get<PriceEntry[]>(this.apiUrl);
  }

  addPrice(entry: PriceEntry): Observable<any> {
    return this.http.post(this.apiUrl, entry);
  }

  createAlert(alertData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/prices/alerts`, alertData);
  }
}
