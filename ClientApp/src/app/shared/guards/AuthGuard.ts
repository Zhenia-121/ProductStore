import { AuthService } from './../../auth/services/auth-service.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
      private router: Router,
      private authService: AuthService) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
      ): boolean {
          if (this.authService.isLoggedIn()) {
              return true;
          } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
          }
        }
}
