import { Action } from '@ngrx/store';

export const LOGIN = '[A] LOGIN';
export const LOGOUT = '[A] LOGOUT';
export const LOGIN_START = '[A] LOGIN_START';

export type AuthActions = Login | Logout;

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: { email: string; userId: string; token: string; expDate: Date; }) { }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}


