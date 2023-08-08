import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var roleId = +localStorage.getItem('roleId')
    if (this.authService.isLoggedIn()) {
      if (state.url.startsWith('/admin') && roleId === 1) {
        return true;
      }
      else if ((state.url.includes('/home')) && roleId !== 1) {
        return true;
      } else {
        this.router.navigate([roleId === 1 ? '/admin' : '/home']);
        return false;
      }
    } else {
      this.router.navigate(['/authentication/signin']);
      return false;
    }
  }
}