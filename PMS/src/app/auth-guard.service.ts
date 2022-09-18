import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './auth-service.service';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router
  ) {}
  canActivate(): boolean {
    if (!this.auth.getAuthToken()) {
      this.router.navigateByUrl('/sign-in');
      return false;
    }
    return true;
  }
}