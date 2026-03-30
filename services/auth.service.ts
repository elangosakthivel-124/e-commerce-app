import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  // 📝 Register
  register(user: any): Observable<any> {
    return this.http.post(`${this.API}/register`, user);
  }

  // 🔐 Login
  login(user: { email: string; password: string }): Observable<{ access_token: string }> {
    return this.http
      .post<{ access_token: string }>(`${this.API}/login`, user)
      .pipe(
        tap(res => {
          this.saveToken(res.access_token);
        })
      );
  }

  // 💾 Token Management
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ✅ Auth Check
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // 🚪 Logout
  logout(): void {
    localStorage.removeItem('token');
  }
}
