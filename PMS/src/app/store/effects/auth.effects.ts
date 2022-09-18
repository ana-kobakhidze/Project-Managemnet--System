import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, switchMap, of, tap } from 'rxjs';
import { AuthService } from 'src/app/auth-service.service';
import {
    AuthActionTypes,
    LogIn, LogInSuccess, LogInFailure,
    SignUp, SignUpSuccess, SignUpFailure,LogOut
  } from '../user.actions';
import { User } from 'src/app/models/user.model';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) {
    console.log(JSON.stringify(actions))
  }
  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
  ofType(AuthActionTypes.LOGIN),
  map((action: LogIn) => action.payload),
  switchMap((payload: User) => {
    return this.authService.logInUser(payload).pipe(
      map((user) => {
        return new LogInSuccess({ token: user.token });
      }));
  }));

  @Effect()
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    map((action: LogInSuccess) => action.payload),
    switchMap(payload => {
      localStorage.setItem('token', payload.token);
      this.router.navigate(['boards']);
      return of();
    })
  );

  @Effect()
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
  ofType(AuthActionTypes.SIGNUP),
  map((action: SignUp) => action.payload),
  switchMap((payload: User) => {
    return of(new SignUpSuccess(payload));
  }));

  @Effect()
  SignUpFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE)
  );
  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
  ofType(AuthActionTypes.LOGOUT),
  tap((user) => {
    localStorage.removeItem('token');
    localStorage.removeItem('state');
  })
);
}