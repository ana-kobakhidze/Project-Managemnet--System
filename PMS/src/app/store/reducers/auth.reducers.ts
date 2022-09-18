import { User } from "src/app/models/user.model";
import { All, AuthActionTypes } from "../user.actions";

export interface State {
    // is a user authenticated?
    isAuthenticated: boolean;
    // if authenticated, there should be a user object
    user: User | null;
    // error message
    errorMessage: string | null;
  }
  export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
  };

  export function reducer(state = initialState, action: All): State {
    switch (action.type) {
      case AuthActionTypes.LOGIN_SUCCESS: {
        const newState =  {
          ...state,
          isAuthenticated: true,
          user: {
            id: "",
            name: "",
            token: action.payload.token,
            login: "",
            password: ""
          },
          errorMessage: null
        };
        localStorage.setItem('state', JSON.stringify(newState));
        return newState;
      }
      case AuthActionTypes.LOGIN_FAILURE: {
        return {
          ...state,
          errorMessage: 'Incorrect email and/or password.'
        };
      }
      case AuthActionTypes.SIGNUP_SUCCESS: {
        return {
          ...state,
          isAuthenticated: false,
          user: {
            id: action.payload.id,
            name: action.payload.name,
            login: action.payload.login,
            password: "",
            token: ""
          },
          errorMessage: null
        };
      }
      case AuthActionTypes.SIGNUP_FAILURE: {
        return {
          ...state,
          errorMessage: action.payload.error
        };
      }
      case AuthActionTypes.LOGOUT: {
        localStorage.removeItem("state");
        return initialState;
      }
      case AuthActionTypes.SYNC_STATE: {
        return {
          ...state,
          isAuthenticated: true,
          user: {
            id: "",
            name: "",
            token: action.payload.token,
            login: "",
            password: ""
          },
          errorMessage: null

        }
      }
      default: {
        return state;
      }
    }
}
  