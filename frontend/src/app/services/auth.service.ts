import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authUrl = 'http://localhost:8000/api/auth';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authUrl}/login`, { email, password }).pipe(
      tap((res) => this.setToken(res.token))
    );
  }

  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authUrl}/register`, { name, email, password }).pipe(
      tap((res) => this.setToken(res.token))
    );
  }

  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.authUrl}/logout`, {}).pipe(
      tap(() => this.clearToken())
    );
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }

  private setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
}
