import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SimulateContent, UserToken } from './api.types';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  signUp(email: string, password: string, confirmPassword: string) {
    return this.httpClient.post('http://localhost:3333/user', {
      email,
      password,
      confirmPassword,
    });
  }

  login(email: string, password: string): Observable<UserToken> {
    return this.httpClient.post<UserToken>('http://localhost:3333/login', {
      email,
      password,
    });
  }

  content(): Observable<SimulateContent> {
    return this.httpClient.get<SimulateContent>(
      'http://localhost:3333/content',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }
}
