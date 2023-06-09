import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
