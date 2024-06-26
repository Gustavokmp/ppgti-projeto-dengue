import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private apiUrl = environment.serverUrl;

  constructor(private http: HttpClient) { }

  getAlerts(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/alerts`, { params: { email } });
  }

  createAlert(alertData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/alerts`, alertData);
  }

  getAlertById(alertId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/alerts/${alertId}`);
  }

  updateAlert(alertId: string, alertData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/alerts/${alertId}`, alertData);
  }

  deleteAlert(alertId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/alerts/${alertId}`);
  }
}
