import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  pageUrl = environment.ResourceServer.Endpoint + 'Auth/';

  constructor(private http: HttpClient, private apiService: ApiService) {}

  login(credentials) {
    return this.http.post<any>(`${this.pageUrl}login`, credentials);
  }
  setToken(token) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  isLoggedIn() {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }
  logout() {
    localStorage.removeItem('token');
  }
  RegisterUser(obj): Observable<any> {
    return this.apiService.post(`${this.pageUrl}RegisterUser`, obj);
  }
  removeAuthToken(): void {
    localStorage.removeItem('token');
  }
  isTokenExpired(token) {
    console.log(this.jwtHelper.getTokenExpirationDate(token));
    return this.jwtHelper.isTokenExpired(token);
  }
}
