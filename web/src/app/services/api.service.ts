import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SimulateContent, UserToken } from './api.types';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  signUp(email: string, password: string, confirmPassword: string) {
    return this.httpClient.post(`${environment.apiUrl}/user`, {
      email,
      password,
      confirmPassword,
    });
  }

  login(email: string, password: string): Observable<UserToken> {
    return this.httpClient.post<UserToken>(`${environment.apiUrl}/login`, {
      email,
      password,
    });
  }

  content(): Observable<SimulateContent> {
    return this.httpClient.get<SimulateContent>(
      `${environment.apiUrl}/content`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }
}
