import { User } from 'src/app/models/user.model';
import { All, AuthActionTypes } from '../actions/user.actions';

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}
export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
};

export function reducer(state: State = initialState, action: All) {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      const newState = {
        ...state,
        isAuthenticated: true,
        user: new User(
          action.payload.login,
          '',
          action.payload.id,
          action.payload.token,
          action.payload.expiresAt
        ),
        errorMessage: null,
      };
      localStorage.setItem('state', JSON.stringify(newState));
      return newState;
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Incorrect email and/or password.',
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false,
        user: new User(action.payload.login, '', action.payload.id, '', null),
        errorMessage: null,
      };
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload.error,
      };
    }
    case AuthActionTypes.LOGOUT: {
      localStorage.removeItem('token');
      localStorage.removeItem('state');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        errorMessage: null,
      };
    }
    case AuthActionTypes.SYNC_STATE: {
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        errorMessage: null,
      };
    }
    default: {
      return state;
    }
  }
}
