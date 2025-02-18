import { Injectable } from '@angular/core';
import { environment } from '../environment/environement';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

// ✅ Définition correcte du type AuthResponse
type AuthResponse = {
  token: string;
  username?: string;
  role: 'USER' | 'ADMIN';
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  urlserveur = environment.apiUrl;
  urlLogin = this.urlserveur + 'login';
  urlRegister = this.urlserveur + 'register';

  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('username');
      const role = localStorage.getItem('role');
      if (user && role) {
        this.currentUserSubject.next({ username: user, role });
      }
    }
  }

  register(userData: any): Observable<any> {
    return this.http.post(this.urlRegister, userData);
  }

  login(username: string, password: string) {
    return this.http
      .post<AuthResponse>(this.urlLogin, { username, password })
      .pipe(
        tap((response: AuthResponse) => {
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);
            localStorage.setItem('username', username); // Utilisation du username

            // Si l'API renvoie un firstName et lastName, les enregistrer aussi
            localStorage.setItem('firstName', response.username || ''); // Remplace `username` si besoin
            localStorage.setItem('lastName', ''); // Remplacer par la valeur réelle si nécessaire

            this.currentUserSubject.next({
              firstName: response.username || '', // Utilisation du firstName
              lastName: '', // Remplacer par lastName si disponible
              role: response.role,
            });
          }
        })
      );
  }

  // ✅ Vérifie si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return (
      !!localStorage.getItem('token') && !!localStorage.getItem('username')
    );
  }

  // 🛑 Déconnexion
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('username');
    }
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }

  getRole(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('role') : null;
  }
}
