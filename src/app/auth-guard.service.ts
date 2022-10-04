import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    const authToken = this.auth.getAuthToken();
    const expDate = Number.parseInt(localStorage.getItem('expDate'));
    if (!authToken || Date.now() > expDate) {
      this.router.navigateByUrl('/sign-in');
      return false;
    }
    return true;
  }
}
