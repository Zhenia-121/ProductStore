import { AuthService } from './../../auth/services/auth-service.service';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService) {}
  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean {
      const isAdmin: boolean = this.authService.isAdmin();
      console.log(isAdmin);
      if (isAdmin) {
        return true;
      } else {
        this.router.navigate(['/no-access']);
        return false;
      }
    }
}
