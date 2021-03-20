import { Action } from '@ngrx/store';

export const LOGIN = '[AUTH] LOGIN';
export const LOGOUT = '[AUTH] LOGOUT';

export class Login implements Action {
  type = LOGIN;

  constructor(public payload: {
    email: string,
    userId: string,
    token: string,
    expirationDate: Date,
  }) {}
}

export class Logout implements Action {
  type = LOGOUT;
}

export type AuthActions = Login | Logout;
