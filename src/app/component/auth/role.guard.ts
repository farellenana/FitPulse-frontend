import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getRole();
    const allowedRoles = ['ADMIN', 'SUPER_ADMIN'];
    if (allowedRoles.includes((role || '').toUpperCase())) {
      return true;
    }
    this.router.navigate(['/homePage']);
    return false;
  }
}
