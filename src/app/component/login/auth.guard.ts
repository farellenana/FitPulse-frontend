import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  // canActivate(): boolean {
  //   if (this.authService.isAuthenticated()) {
  //     return true;
  //   }
  //   this.router.navigate(['/login']);
  //   return false;
  // }
}

// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class RoleGuard implements CanActivate {

//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     const expectedRoles: string[] = route.data['expectedRoles'];
//     const userRole = this.authService.getUserRole();

//     if (this.authService.isAuthenticated() && userRole && expectedRoles.includes(userRole)) {
//       return true;
//     }

//     this.router.navigate(['/not-authorized']);
//     return false;
//   }
// }
