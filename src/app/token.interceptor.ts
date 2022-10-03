import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,
  HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { State, Store } from '@ngrx/store';
import { AppState } from './store/app.states';
import { LogOutStarted } from './store/actions/user.actions';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authService: AuthService;
  private router: Router;
  private store: Store<AppState>;
  constructor(private injector: Injector) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthService);
    this.router = this.injector.get(Router);
    this.store = this.injector.get(Store)
    const token: string = this.authService.getAuthToken();
    const expDate = Number.parseInt(localStorage.getItem('expDate'));
    if (Date.now() > expDate) {
      this.store.dispatch(new LogOutStarted());
      this.router.navigateByUrl('/sign-in');
    }
    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
    return next.handle(request);
  }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        throw err;
      }));
  }
}