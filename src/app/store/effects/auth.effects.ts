import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, of, tap } from 'rxjs';

import { AuthService } from 'src/app/auth.service';
import * as AuthActions from '../actions/user.actions';
import { User } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.states';
import { Remove } from '../actions/loader.actions';
import { NotifierService } from 'angular-notifier';

export interface LogInResponse {
  token: string;
}

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>,
    private notifierService: NotifierService
  ) {}

  LogIn = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.AuthActionTypes.LOGIN),
      switchMap((authData: AuthActions.LogIn) => {
        return this.authService
          .logInUser(
            new User(authData.payload.login, authData.payload.password)
          )
          .pipe(
            map((response) => {
              const decodedUser = this.authService.getUserFromAuthToken(
                response.token
              );
              const expAt = new Date(Date.now()).getTime() + 10 * 60000;
              localStorage.setItem('token', response.token);
              localStorage.setItem('expDate', expAt.toString());
              this.router.navigate(['boards']);
              this.store.dispatch(new Remove(false));
              return new AuthActions.LogInSuccess(decodedUser);
            }),
            catchError((response) => {
              this.store.dispatch(new Remove(false));
              this.notifierService.notify('error', response.error.message);
              return of(new AuthActions.LogInFailure(response));
            })
          );
      })
    )
  );

  SignUp = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.AuthActionTypes.SIGNUP),
      map((action: AuthActions.SignUp) => action.payload),
      switchMap((payload: User) => {
        return this.authService.signUpUser(payload).pipe(
          map((response) => {
            this.store.dispatch(new Remove(false));
            return new AuthActions.SignUpSuccess(response);
          }),
          catchError((err) => {
            this.store.dispatch(new Remove(false));
            this.notifierService.notify('error', err.error.message);
            return of(new AuthActions.SignUpFailure(err));
          })
        );
      })
    )
  );

  LogOut = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.AuthActionTypes.LOGOUT_STARTED),
      map(() => {
        this.store.dispatch(new Remove(false));
        localStorage.removeItem('token');
        localStorage.removeItem('state');
        localStorage.removeItem('expDate');
        return new AuthActions.LogOut();
      })
    )
  );
}
