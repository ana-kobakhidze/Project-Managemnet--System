import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { State } from '../reducers/auth.reducers';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure',
  LOGOUT_STARTED = '[Auth] Logout Started',
  LOGOUT = '[Auth] Logout',
  SYNC_STATE = 'Sync state',
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: { login: string; password: string }) {}
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: User) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(public payload: any) {}
}

export class SignUpSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: any) {}
}

export class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SIGNUP_FAILURE;
  constructor(public payload: any) {}
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class LogOutStarted implements Action {
  readonly type = AuthActionTypes.LOGOUT_STARTED;
}

export class SyncState implements Action {
  readonly type = AuthActionTypes.SYNC_STATE;
  constructor(public payload: State) {}
}

export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | LogOutStarted
  | LogOut
  | SyncState;
