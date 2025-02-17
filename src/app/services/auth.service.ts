import { Injectable } from '@angular/core';
import { environment } from '../environment/environement';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ✅ Définition correcte du type AuthResponse
type AuthResponse = {
  token: string;
  username?: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated() {
    throw new Error('Method not implemented.');
  }
  urlserveur = environment.apiUrl;

  constructor(private http: HttpClient) {}

  urlLogin = this.urlserveur + 'login';

  // login(email: string, password: string) {
  //   return this.http.post<any>(this.urlLogin, { email, password });
  // }

  login(username: string, password: string) {
    return this.http.post<any>(this.urlLogin, { username, password });
  }
}
