import {Action} from '@ngrx/store';

import {User} from '../user.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

export function authReducer(state = initialState, action: AuthActions.AuthActions): AuthState {
  switch (action.type) {
    case AuthActions.LOGIN:
      const { email, userId, token, expirationDate } = (action as AuthActions.Login).payload;
      const user = new User(email, userId, token, expirationDate);
      return {
        ...state,
        user,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
