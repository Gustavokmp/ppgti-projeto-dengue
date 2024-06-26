import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.serverUrl;

  constructor(private http: HttpClient) { }

  getTotalCases(startDate: string, endDate: string): Observable<any> {
    let params = new HttpParams()
      .set('start_date', startDate)
      .set('end_date', endDate);

    return this.http.get(`${this.apiUrl}/api/total-cases`, { params });
  }

  getCasesByCity(startDate: string, endDate: string): Observable<any> {
    let params = new HttpParams()
      .set('start_date', startDate)
      .set('end_date', endDate);

    return this.http.get(`${this.apiUrl}/api/cases-by-city`, { params });
  }

  getCasesByMonth(startDate: string, endDate: string): Observable<any> {
    let params = new HttpParams()
      .set('start_date', startDate)
      .set('end_date', endDate);

    return this.http.get(`${this.apiUrl}/api/cases-by-month`, { params });
  }

  getScatterTempHumidityCases(startDate: string, endDate: string): Observable<any> {
    let params = new HttpParams()
      .set('start_date', startDate)
      .set('end_date', endDate);

    return this.http.get(`${this.apiUrl}/api/scatter-temp-humidity-cases`, { params });
  }
}
