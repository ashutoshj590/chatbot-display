import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private apiUrl = `${environment.apiUrl}/query`; // Replace this with your backend API endpoint

  constructor(private http: HttpClient) {}

  // Send a user query to the backend and get the bot response
  getBotResponse(query: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { query });
  }
}
