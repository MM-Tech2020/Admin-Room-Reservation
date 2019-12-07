import { AnyAction } from 'redux';

import { AuthorizationState, AuthorizationInitialState } from './state';
import { LOGIN_SUCCEESS, LOGIN_FAILED, TRY_LOGIN, LOGOUT } from './actions';

export function authorizationReducer(
  state: AuthorizationState = AuthorizationInitialState,
  action: AnyAction
): AuthorizationState {
  switch (action.type) {
    case TRY_LOGIN: {
      return {
        ...state,
        loading: true,
        userEmail: action.payload.username
      };
    }
    case LOGIN_SUCCEESS: {
      return {
        ...state,
        token: action.payload,
        userEmail: action.payload.name,
        isLoggedIn: true,
        errorMessage: '',
        loading: false,
        name: action.payload.fullName,
        companyAddress: action.payload.companyAddress,
        companyName: action.payload.companyName
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        isLoggedIn: false,
        errorMessage: action.payload,
        loading: false
      };
    }
    case LOGOUT: {
      return AuthorizationInitialState;
    }
    default:
      return state;
  }
}
